import { useState, useEffect } from "react";
import APP_CONFIG from "../config/app.js";

/**
 * useTimer — compteur depuis la date de rencontre
 * Retourne { days, hours, minutes, seconds, totalMs }
 */
export function useTimer(meetingDateOverride) {
  const meetingDate = new Date(meetingDateOverride ?? APP_CONFIG.MEETING_DATE);

  const calc = () => {
    const diff = Date.now() - meetingDate.getTime();
    const totalSeconds = Math.floor(diff / 1000);
    return {
      totalMs: diff,
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default useTimer;