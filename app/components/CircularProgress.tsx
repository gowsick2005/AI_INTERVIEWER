"use client";

import { motion } from "framer-motion";

export default function CircularProgress({ value = 75, size = 160 }) {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100);
  const dash = (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center flex-col">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id="g" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke="url(#g)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference - dash}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.2 }}
        />
      </svg>
      <div className="-mt-24 text-center">
        <div className="text-3xl font-bold">{progress}%</div>
        <div className="text-xs soft-muted">ATS Match Score</div>
      </div>
    </div>
  );
}
