// src/components/ui/ProgressBar.tsx
"use client";

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  // Adjust calculation to start from 0%
  const percentage = ((current - 1) / total) * 100;
  const displayPercentage = Math.max(0, Math.round(percentage)); // Prevent negative values

  return (
    <div className="flex flex-col">
      <div className="text-xs font-medium text-abyssal-blue-300">Your Progress</div>
      <div className="text-base font-semibold text-abyssal-blue-400">{displayPercentage}% completed</div>
      <div className="relative h-3 bg-lavender-400 rounded-full overflow-hidden mt-2">
        <div
          className="absolute top-0 left-0 h-3 bg-primary-500 transition-all duration-300 ease-in-out"
          style={{ width: `${displayPercentage}%` }}
        ></div>
        <div
          className="absolute top-0 left-0 h-6 w-6 bg-primary-500 rounded-full flex items-center justify-center -mt-1 -ml-3 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${displayPercentage}%)` }}
        >
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;