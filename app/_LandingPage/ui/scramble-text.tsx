"use client";
import { useState, useEffect } from "react";

const CHARS = "-_~=+|!@#$%^&*()[]{}";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout | null = null;
    
    interval = setInterval(() => {
      setDisplayText((prev) => 
        text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
      );
      if (iteration >= text.length && interval) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => {
        if(interval) clearInterval(interval);
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
}