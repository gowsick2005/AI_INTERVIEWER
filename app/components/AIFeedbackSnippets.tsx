"use client";

import { motion } from "framer-motion";

export default function AIFeedbackSnippets() {
  const snippets = [
    "The AI Feedback snippets professionals and developers technology has structure.",
    "Computation develops sent to ioround infrastructure and thream teams trends.",
    "The promotion of bromantic and effective deworrmammes for designed.",
  ];

  return (
    <div className="glass p-6 rounded-2xl h-full">
      <h3 className="text-sm font-semibold mb-4">AI Feedback Snippets</h3>

      <motion.div className="space-y-3 text-xs text-slate-300 leading-relaxed">
        {snippets.map((snippet, i) => (
          <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="p-2 rounded bg-white/3">
            {snippet}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}
