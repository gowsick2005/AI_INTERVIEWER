"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Home, FileText, Clock, MessageSquare, LogOut } from "lucide-react";

export default function Sidebar({ className = "" }) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={"w-full max-w-[340px] lg:w-72 mx-auto lg:mx-0 p-6 rounded-2xl glass shadow-lg " + className}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#FACC15] flex items-center justify-center text-black font-bold">AI</div>
        <div>
          <div className="font-semibold">ResumeAI</div>
          <div className="text-xs soft-muted">AI Resume Intelligence</div>
        </div>
      </div>

      <nav className="space-y-1">
        <NavItem icon={<Home size={16} />} label="Overview" active />
        <NavItem icon={<FileText size={16} />} label="Analyze Resume" />
        <NavItem icon={<Clock size={16} />} label="History" />
        <NavItem icon={<MessageSquare size={16} />} label="Assistant" />
      </nav>

      <div className="mt-6 pt-6 border-t border-white/6">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/3 transition">
          <LogOut size={16} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition ${active ? 'bg-white/6' : 'hover:bg-white/3'}`}>
      <div className="text-[#FACC15]">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
}
