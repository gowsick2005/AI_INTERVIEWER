"use client";

import { motion } from "framer-motion";
import { Target, Zap, Eye, LayoutGrid, Briefcase, ShieldCheck } from "lucide-react";

const features = [
  {
    id: 1,
    title: "ATS Optimization",
    description: "Get precise ATS scores and tailored updates to ensure your resume passes automated screening.",
    icon: <Target size={20} className="text-[#FACC15]" />,
  },
  {
    id: 2,
    title: "Skill Gap Detection",
    description: "Discover in-demand skills you are missing and receive data-driven growth suggestions.",
    icon: <Zap size={20} className="text-[#FACC15]" />,
  },
  {
    id: 3,
    title: "Recruiter Insights",
    description: "Understand recruiter priorities with clarity scores and alignment recommendations.",
    icon: <Eye size={20} className="text-[#FACC15]" />,
  },
  {
    id: 4,
    title: "AI Suggestions",
    description: "Instant resume improvements powered by intelligent language and role-specific guidance.",
    icon: <ShieldCheck size={20} className="text-[#FACC15]" />,
  },
  {
    id: 5,
    title: "Smart Formatting",
    description: "Apply premium ATS-friendly layouts, spacing, and typography for modern presentation.",
    icon: <LayoutGrid size={20} className="text-[#FACC15]" />,
  },
  {
    id: 6,
    title: "Job Match Analysis",
    description: "Match your profile to top roles and reveal the best opportunities instantly.",
    icon: <Briefcase size={20} className="text-[#FACC15]" />,
  },
];

export default function FeaturesGrid() {
  return (
    <div id="features" className="w-full">
      <h2 className="font-heading-lg text-white mb-12">Premium Features</h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, idx) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            className="group rounded-[32px] border border-white/10 bg-[#121212]/70 p-7 shadow-[0_35px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FACC15]/10 text-[#FACC15] shadow-[0_20px_60px_rgba(250,204,21,0.12)] transition-all duration-300 group-hover:scale-105">
              {feature.icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white font-jakarta">{feature.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/60 font-inter">{feature.description}</p>
            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#FACC15] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Learn more</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
