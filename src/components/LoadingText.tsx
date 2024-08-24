// components/LoadingText.tsx
import { useState, useEffect } from "react";

type LoadingTextProps = {
  text: string;
  speed?: number;
};

export default function LoadingText({ text, speed = 100 }: LoadingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return <div className="font-mono text-lg text-gray-700">{displayedText}</div>;
}
