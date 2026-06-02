"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AnimatedProgressBar from "./AnimatedProgressBar";
import type { Course } from "@/types";

// Accent colors cycling for cards
const CARD_ACCENTS = [
  { color: "#00d4ff", bg: "rgba(0,212,255,0.06)", border: "rgba(0,212,255,0.12)" },
  { color: "#8b5cf6", bg: "rgba(139,92,246,0.06)", border: "rgba(139,92,246,0.12)" },
  { color: "#10b981", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.12)" },
  { color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.12)" },
];

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  // Dynamically look up the Lucide icon by name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = ((LucideIcons as unknown as Record<string, LucideIcon>)[course.icon_name] ||
    LucideIcons.BookOpen) as LucideIcon;

  return (
    <motion.article
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative rounded-2xl overflow-hidden p-5 flex flex-col gap-4 glow-border grain cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${accent.bg} 0%, #111820 60%, ${accent.bg}40 100%), #111820`,
        border: `1px solid ${accent.border}`,
      }}
    >
      {/* Ambient glow blob */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent.color}12 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />

      {/* Icon + title row */}
      <header className="relative z-10 flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, ${accent.color}20, ${accent.color}08)`,
            border: `1px solid ${accent.border}`,
          }}
        >
          <IconComponent size={18} style={{ color: accent.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="text-sm font-semibold leading-tight text-[#e8f4fd] line-clamp-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {course.title}
          </h3>
          <p
            className="text-xs mt-0.5"
            style={{ color: "#6b8ba4", fontFamily: "var(--font-mono)" }}
          >
            Active course
          </p>
        </div>
      </header>

      {/* Progress section */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "#6b8ba4" }}>
            Progress
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="text-xs font-bold"
            style={{
              color: accent.color,
              fontFamily: "var(--font-mono)",
            }}
          >
            {course.progress}%
          </motion.span>
        </div>

        <AnimatedProgressBar
          value={course.progress}
          color={accent.color}
          height={5}
          delay={0.3 + index * 0.15}
        />
      </div>

      {/* Hover border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        whileHover={{
          boxShadow: `0 0 20px ${accent.color}18, 0 0 40px ${accent.color}08`,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
}
