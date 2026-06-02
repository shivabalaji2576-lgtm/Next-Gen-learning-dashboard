"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedProgressBarProps {
  value: number; // 0–100
  color?: string;
  height?: number;
  delay?: number;
}

export default function AnimatedProgressBar({
  value,
  color = "#00d4ff",
  height = 4,
  delay = 0,
}: AnimatedProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setStarted(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  // Derive glow color with transparency
  const glowColor = color + "60";

  return (
    <div
      ref={ref}
      className="w-full rounded-full overflow-hidden"
      style={{
        height,
        background: "rgba(30,45,61,0.5)",
      }}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: started ? `${value}%` : "0%" }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.1,
        }}
        className="h-full rounded-full relative"
        style={{
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 8px ${glowColor}`,
        }}
      >
        {/* Shimmer on the bar */}
        <motion.div
          animate={{ x: ["−100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
