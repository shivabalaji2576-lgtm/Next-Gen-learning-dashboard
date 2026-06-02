"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Award,
  Settings,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "analytics", label: "Stats", icon: BarChart3 },
  { id: "achievements", label: "Awards", icon: Award },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden flex items-center justify-around px-2 py-2 safe-area-bottom"
      style={{
        background: "rgba(13,17,23,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(30,45,61,0.8)",
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeId === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl min-w-0"
          >
            {isActive && (
              <motion.div
                layoutId="mobile-active"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid rgba(0,212,255,0.12)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              size={20}
              className="relative z-10"
              style={{ color: isActive ? "#00d4ff" : "#3d5a70" }}
            />
            <span
              className="relative z-10 text-[10px] font-medium"
              style={{
                color: isActive ? "#00d4ff" : "#3d5a70",
                fontFamily: "var(--font-body)",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
