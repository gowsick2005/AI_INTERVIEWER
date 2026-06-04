"use client";

import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const sampleData = [
  { id: 1, name: "resume_jordan_williams.pdf", score: 92, date: "May 28, 2026" },
  { id: 2, name: "resume_alex_johnson.pdf", score: 86, date: "May 27, 2026" },
  { id: 3, name: "resume_sam_taylor.pdf", score: 78, date: "May 25, 2026" },
  { id: 4, name: "resume_morgan_davis.pdf", score: 88, date: "May 24, 2026" },
  { id: 5, name: "resume_casey_anderson.pdf", score: 72, date: "May 23, 2026" },
];

function ScoreBadge({ score }: { score: number }) {
  if (score >= 85) {
    return <span className="score-badge green">{score}</span>;
  } else if (score >= 70) {
    return <span className="score-badge amber">{score}</span>;
  } else {
    return <span className="score-badge red">{score}</span>;
  }
}

export default function RecentTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");

  const filteredRows = sampleData.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-heading-lg text-white mb-6">Analysis History</h2>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search analyses..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FACC15]/50 transition"
            />
          </div>

          {/* Filter */}
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FACC15]/50 transition"
          >
            <option value="all">All Time</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-card overflow-x-auto scrollbar-none">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th>File Name</th>
              <th>ATS Score</th>
              <th>Date Analyzed</th>
              <th></th>
            </tr>
          </thead>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredRows.length > 0 ? (
              filteredRows.map((row, idx) => (
                <motion.tr
                  key={row.id}
                  variants={itemVariants}
                  className="border-t border-white/5 hover:bg-white/8 transition-colors"
                >
                  <td className="px-6 py-4 text-white text-sm truncate max-w-xs">
                    {row.name}
                  </td>
                  <td className="px-6 py-4">
                    <ScoreBadge score={row.score} />
                  </td>
                  <td className="px-6 py-4 text-white/70 text-sm">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="view-button inline-flex items-center gap-1">
                      View
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-white/50">
                  No analyses found
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 text-sm text-white/60 text-center"
      >
        Showing {filteredRows.length} of {sampleData.length} analyses
      </motion.div>
    </div>
  );
}
