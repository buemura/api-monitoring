import { useEffect, useState } from "react";

type TimerProps = {
  startTime: Date;
  rate: number;
};

export default function Timer({ startTime, rate }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const nextCheckTime = new Date(startTime).getTime() + rate;
      const remaining = Math.max(0, nextCheckTime - now);

      setTimeRemaining(remaining);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime, rate]);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = String(seconds % 60).padStart(2, "0");

    return `${minutes}:${formattedSeconds}`;
  };

  return <div>{formatTime(timeRemaining)}</div>;
}
