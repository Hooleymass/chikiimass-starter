'use client'
import React, { useState, useEffect } from 'react';
import './LoadingLine.css';

const LoadingLine: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 1;
        if (nextProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return nextProgress;
      });
    }, 100); // Adjust the interval time to simulate loading speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-line-container">
      <div className="loading-line" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default LoadingLine;
