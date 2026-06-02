import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateActivityData() {
  const weeks = 15;
  const days: { date: string; count: number }[] = [];
  const today = new Date();

  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - w * 7 - d);
      const count = Math.random() < 0.65 ? Math.floor(Math.random() * 5) + 1 : 0;
      days.push({ date: date.toISOString().split("T")[0], count });
    }
  }

  return days;
}

export function getStreakCount(): number {
  return Math.floor(Math.random() * 40) + 10;
}
