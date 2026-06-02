"use client";

import { motion } from "framer-motion";
import { Flame, Trophy, Clock } from "lucide-react";

interface HeroTileProps {
  streakCount: number;
}

export default function HeroTile({ streakCount }: HeroTileProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const stats = [
    { label: "Hours Today", value: "3.2", icon: Clock },
    { label: "Best Streak", value: `${streakCount + 5}d`, icon: Trophy },
  ];

  return (
    <article
      className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden p-6 flex flex-col justify-between grain"
      style={{
        background:
          "linear-gradient(135deg, #0f1923 0%, #111820 50%, #0a1520 100%)",
        border: "1px solid rgba(0,212,255,0.1)",
        minHeight: 200,
      }}
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-20 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top: Greeting + streak */}
      <header className="relative z-10 flex items-start justify-between">
        <div>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-1"
            style={{ color: "#6b8ba4", fontFamily: "var(--font-mono)" }}
          >
            {greeting}
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, #e8f4fd 0%, #00d4ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcome back,{" "}
            <span style={{ color: "#00d4ff", WebkitTextFillColor: "#00d4ff" }}>
              Shiva
            </span>
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "#6b8ba4", fontFamily: "var(--font-body)" }}
          >
            You have 4 active courses in progress. Keep going!
          </p>
        </div>
      </header>

      {/* Bottom: Stats row */}
      <div className="relative z-10 flex items-end justify-between">
        <div className="flex gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(30,45,61,0.4)",
                  border: "1px solid rgba(30,45,61,0.8)",
                }}
              >
                <Icon size={14} style={{ color: "#6b8ba4" }} />
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "#e8f4fd", fontFamily: "var(--font-mono)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#6b8ba4" }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Streak badge */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.08))",
            border: "1px solid rgba(245,158,11,0.25)",
          }}
        >
          <Flame
            size={20}
            style={{ color: "#f59e0b", filter: "drop-shadow(0 0 6px #f59e0b)" }}
          />
          <div>
            <p
              className="text-lg font-bold leading-none"
              style={{
                color: "#f59e0b",
                fontFamily: "var(--font-display)",
                textShadow: "0 0 12px rgba(245,158,11,0.4)",
              }}
            >
              {streakCount}
            </p>
            <p className="text-xs" style={{ color: "#92400e" }}>
              day streak
            </p>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
