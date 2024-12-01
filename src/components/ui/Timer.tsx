// src/components/ui/Timer.tsx
"use client";

import React, { useEffect } from 'react';

interface TimerProps {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, setTimeLeft, onTimeUp }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, setTimeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-xs font-medium text-abyssal-blue-300 font-secondary">
      Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} min
    </div>
  );
};

export default Timer;