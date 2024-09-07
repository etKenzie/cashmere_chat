// components/LoadingText.tsx
import { useState, useEffect } from "react";

type LoadingTextProps = {
  text: string;
  speed?: number;
};

export default function LoadingText({ text, speed = 100 }: LoadingTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedText((prev) =>
        prev.length === text.length ? "" : prev + text[prev.length]
      );
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <div className="font-mono text-lg text-gray-700">{displayedText}</div>;
}
