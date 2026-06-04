"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, ChevronDown } from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-white/5 transition">
        <div className="w-9 h-9 rounded-full bg-[#FACC15] flex items-center justify-center text-black font-bold">U</div>
        <ChevronDown size={16} />
      </button>

      {open && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 mt-2 w-48 glass rounded-xl p-3 shadow-lg">
          <div className="text-sm font-medium">Signed in as</div>
          <div className="text-xs soft-muted mb-3">user@example.com</div>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/3">Profile</button>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/3">Settings</button>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/3">Logout</button>
        </motion.div>
      )}
    </div>
  );
}
