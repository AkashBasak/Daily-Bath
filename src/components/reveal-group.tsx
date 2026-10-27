"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
};

// Marks itself as revealed the first time it scrolls into view. Descendants
// with `data-reveal="left" | "right"` animate in via globals.css.
export function RevealGroup({ children, className = "" }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-revealed={revealed || undefined} className={`reveal-group ${className}`}>
      {children}
    </div>
  );
}
