import { useState, useEffect, useCallback, useRef } from "react";
import APP_CONFIG from "../config/app.js";

// ─────────────────────────────────────────────
//  Helpers bas niveau
// ─────────────────────────────────────────────

function getToken() {
  try {
    return JSON.parse(localStorage.getItem(APP_CONFIG.GITHUB_TOKEN_KEY)) ?? null;
  } catch {
    return null;
  }
}

function getOwner() {
  try {
    return JSON.parse(localStorage.getItem("githubOwner")) ?? APP_CONFIG.GITHUB_OWNER;
  } catch {
    return APP_CONFIG.GITHUB_OWNER;
  }
}

function getRepo() {
  try {
    return JSON.parse(localStorage.getItem("githubRepo")) ?? APP_CONFIG.GITHUB_REPO;
  } catch {
    return APP_CONFIG.GITHUB_REPO;
  }
}

function apiUrl(path) {
  return `https://api.github.com/repos/${getOwner()}/${getRepo()}/contents/${path}`;
}

async function ghFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    Accept:        "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(apiUrl(path), { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `GitHub API ${res.status}`);
  }
  return res.json();
}

/**
 * Lit un fichier JSON depuis GitHub.
 * Retourne { data, sha } ou null si 404.
 */
export async function ghRead(path) {
  try {
    const file = await ghFetch(path);
    const raw = Uint8Array.from(atob(file.content.replace(/\n/g, "")), (c) => c.charCodeAt(0));
    const content = JSON.parse(new TextDecoder("utf-8").decode(raw));
    return { data: content, sha: file.sha };
  } catch (e) {
    if (e.message?.includes("404") || e.message?.includes("Not Found")) return null;
    throw e;
  }
}

/**
 * Écrit (crée ou met à jour) un fichier JSON sur GitHub.
 * sha requis pour une mise à jour.
 */
export async function ghWrite(path, data, sha = null, message = null) {
  const json  = JSON.stringify(data, null, 2);
  const bytes = new TextEncoder().encode(json);
  const content = btoa(String.fromCharCode(...bytes));
  const body = {
    message: message ?? `update ${path}`,
    content,
    ...(sha ? { sha } : {}),
  };
  return ghFetch(path, {
    method:  "PUT",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
}

// ─────────────────────────────────────────────
//  Hook principal
// ─────────────────────────────────────────────

/**
 * useGitHub(path, localKey, defaultValue)
 *
 * - Charge depuis GitHub au montage
 * - Fallback localStorage si pas de token ou erreur réseau
 * - save(newData) écrit sur GitHub + met à jour localStorage en cache
 * - Retourne { data, save, loading, error, synced }
 *
 * synced = true  → données viennent de GitHub (partagées)
 * synced = false → données locales seulement
 */
export function useGitHub(path, localKey, defaultValue) {
  const [data,    setData]    = useState(() => {
    try {
      const cached = localStorage.getItem(localKey);
      return cached ? JSON.parse(cached) : defaultValue;
    } catch {
      return defaultValue;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [synced,  setSynced]  = useState(false);
  const shaRef = useRef(null);

  // ── Chargement initial ──
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const token = getToken();
    if (!token) {
      // Pas de token → localStorage uniquement
      setLoading(false);
      setSynced(false);
      return;
    }

    ghRead(path)
      .then((result) => {
        if (cancelled) return;
        if (result) {
          shaRef.current = result.sha;
          setData(result.data);
          setSynced(true);
          // Mettre en cache local
          try { localStorage.setItem(localKey, JSON.stringify(result.data)); } catch {}
        } else {
          // Fichier absent → on va l'initialiser avec les données locales
          setSynced(false);
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
        setSynced(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [path, localKey]);

  // ── Sauvegarde ──
  const save = useCallback(async (newData) => {
    // Optimistic update
    setData(newData);
    try { localStorage.setItem(localKey, JSON.stringify(newData)); } catch {}

    const token = getToken();
    if (!token) return; // localStorage seulement

    try {
      const res = await ghWrite(path, newData, shaRef.current);
      shaRef.current = res.content.sha;
      setSynced(true);
      setError(null);
    } catch (e) {
      setError(e.message);
      // Les données restent dans l'état optimistic + localStorage
      // Elles seront re-sync au prochain rechargement
    }
  }, [path, localKey]);

  return { data, save, loading, error, synced };
}

export default useGitHub;