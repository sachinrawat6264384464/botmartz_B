// components/ScrambleText.tsx
"use client";

import React, { useState, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export const ScrambleText = ({ text, className = "", speed = 40 }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [isHovered, text, speed, chars]);

  return (
    <span 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer ${className}`}
    >
      {displayText}
    </span>
  );
};