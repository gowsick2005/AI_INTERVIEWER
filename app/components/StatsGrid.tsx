"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { id: 1, label: "ATS Score", value: 92, suffix: "", trend: "+3%" },
  { id: 2, label: "Resume Strength", value: 87, suffix: "%", trend: "+5%" },
  { id: 3, label: "Missing Skills", value: 3, suffix: "", trend: "-1" },
  { id: 4, label: "Interview Ready", value: 94, suffix: "%", trend: "+8%" },
];

function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let current = 0;
          const increment = target / 40;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 30);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl font-bold font-jakarta text-white">
      {count}{suffix}
    </div>
  );
}

export default function StatsGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as any },
    },
  };

  return (
    <div className="w-full">
      <h2 className="font-heading-lg text-white mb-12">Performance Metrics</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            className="stats-card p-6 flex flex-col gap-6"
          >
            {/* Top row: label and trend */}
            <div className="flex items-start justify-between">
              <span className="font-label text-white/60">
                {stat.label}
              </span>
              <span className="badge-pill badge-positive text-xs">
                {stat.trend}
              </span>
            </div>

            {/* Value with animation */}
            <div className="flex-grow flex items-center justify-start">
              <CountUpNumber target={stat.value} suffix={stat.suffix} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
