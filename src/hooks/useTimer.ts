import { useState, useEffect } from "react";

export const useTimer = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval: undefined | number = undefined;

    if (timerOn) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerOn]);

  const startTimer = () => setTimerOn(true);
  const stopTimer = () => setTimerOn(false);
  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  const formatTime = (ms: number) => {
    return `
      ${String(Math.floor((ms / 60000) % 60)).padStart(2, "0")}:${String(
      Math.floor((ms / 1000) % 60)
    ).padStart(2, "0")}:${String((ms / 10) % 60).padStart(2, "0")}
      `;
  };

  return { time, timerOn, startTimer, stopTimer, resetTimer, formatTime };
};
