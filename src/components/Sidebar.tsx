"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "#" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "#" },
  { id: "achievements", label: "Achievements", icon: Award, href: "#" },
  { id: "settings", label: "Settings", icon: Settings, href: "#" },
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative hidden lg:flex flex-col h-screen shrink-0 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0d1117 0%, #080c10 100%)",
        borderRight: "1px solid rgba(30,45,61,0.8)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-[#1e2d3d]">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
            boxShadow: "0 0 16px rgba(0,212,255,0.3)",
          }}
        >
          <Zap size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="text-sm font-bold tracking-widest uppercase text-[#e8f4fd] whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LearnOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-1" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group"
              style={{
                color: isActive ? "#00d4ff" : "#6b8ba4",
              }}
            >
              {/* Active background indicator with layoutId for smooth transition */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(139,92,246,0.06))",
                    border: "1px solid rgba(0,212,255,0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Hover background for non-active */}
              {!isActive && (
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-[#1e2d3d1a]" />
              )}

              <Icon
                size={18}
                className="relative z-10 shrink-0"
                style={{ color: isActive ? "#00d4ff" : "#6b8ba4" }}
              />

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="relative z-10 text-sm font-medium whitespace-nowrap"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Active dot for collapsed state */}
              {isActive && collapsed && (
                <span
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                  style={{ background: "#00d4ff" }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="px-2 py-4 border-t border-[#1e2d3d]">
        <div className="flex items-center gap-3 px-2">
          <div
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, #00d4ff22, #8b5cf622)",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00d4ff",
              fontFamily: "var(--font-display)",
            }}
          >
            SH
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="overflow-hidden"
              >
                <p className="text-xs font-semibold text-[#e8f4fd] truncate">
                  Shiva
                </p>
                <p className="text-xs text-[#6b8ba4] truncate">
                  CSE-AIML · 2nd Year
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center z-50 transition-all hover:scale-110"
        style={{
          background: "#111820",
          border: "1px solid #1e2d3d",
          color: "#6b8ba4",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight size={12} />
        ) : (
          <ChevronLeft size={12} />
        )}
      </button>
    </motion.aside>
  );
}
