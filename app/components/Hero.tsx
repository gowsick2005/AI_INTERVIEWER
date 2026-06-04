"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="hero-section w-full">
      <div className="container-max mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-heading-xl gradient-text leading-tight"
          >
            AI-Powered Resume Analysis
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-white/70 font-inter max-w-2xl leading-relaxed"
          >
            Get instant ATS scores, recruiter insights, skill gap analysis, and AI-powered suggestions to transform your resume into an interview-winning document.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-cta mt-10 max-w-xs"
          >
            Start Free Analysis
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}