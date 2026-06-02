"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  message?: string;
}

export default function ErrorDisplay({
  message = "Failed to load courses",
}: ErrorBoundaryProps) {
  return (
    <div
      className="rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
      style={{
        background: "rgba(244,63,94,0.04)",
        border: "1px solid rgba(244,63,94,0.15)",
      }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "rgba(244,63,94,0.08)" }}
      >
        <AlertTriangle size={24} style={{ color: "#f43f5e" }} />
      </div>
      <div>
        <h3
          className="text-sm font-semibold text-[#e8f4fd]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Database Connection Error
        </h3>
        <p className="text-xs mt-1" style={{ color: "#6b8ba4" }}>
          {message}
        </p>
        <p className="text-xs mt-1" style={{ color: "#3d5a70" }}>
          Check your Supabase environment variables and try again.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105"
        style={{
          background: "rgba(244,63,94,0.08)",
          border: "1px solid rgba(244,63,94,0.2)",
          color: "#f43f5e",
        }}
      >
        <RefreshCw size={12} />
        Retry
      </button>
    </div>
  );
}
