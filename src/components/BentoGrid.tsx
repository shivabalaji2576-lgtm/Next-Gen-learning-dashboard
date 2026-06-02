"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import HeroTile from "./HeroTile";
import CourseCard from "./CourseCard";
import ActivityTile from "./ActivityTile";
import StatsTile from "./StatsTile";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  },
};

interface BentoGridProps {
  courses: Course[];
  streakCount: number;
}

export default function BentoGrid({ courses, streakCount }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-auto"
    >
      {/* Hero tile spans 2 cols on xl */}
      <motion.div variants={tileVariants} className="xl:col-span-2">
        <HeroTile streakCount={streakCount} />
      </motion.div>

      {/* Stats tile */}
      <motion.div variants={tileVariants}>
        <StatsTile />
      </motion.div>

      {/* Course cards — dynamic from Supabase */}
      {courses.map((course, index) => (
        <motion.div key={course.id} variants={tileVariants}>
          <CourseCard course={course} index={index} />
        </motion.div>
      ))}

      {/* Activity tile spans 2 cols on xl */}
      <motion.div variants={tileVariants} className="xl:col-span-2">
        <ActivityTile />
      </motion.div>
    </motion.div>
  );
}
