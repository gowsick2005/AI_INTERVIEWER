"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const send = () => {
    if (!msg) return;
    setHistory((s) => [...s, msg]);
    setMsg("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div whileTap={{ scale: 0.95 }} className="glass rounded-2xl p-3 w-96 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#FACC15] flex items-center justify-center text-black font-bold">AI</div>
            <div>
              <div className="font-semibold">AI Assistant</div>
              <div className="text-xs soft-muted">Get quick resume tips</div>
            </div>
          </div>
          <button onClick={() => setOpen(!open)} className="px-2 py-1 rounded-md hover:bg-white/5">{open ? 'Close' : 'Open'}</button>
        </div>

        {open && (
          <div>
            <div className="h-40 overflow-auto mb-3 space-y-2">
              {history.map((h, i) => (
                <div key={i} className="text-sm p-2 bg-white/3 rounded-md">{h}</div>
              ))}
            </div>

            <div className="flex gap-2">
              <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ask about keywords or improvements" className="flex-1 p-2 rounded-md bg-black/20" />
              <button onClick={send} className="btn-glow px-3 py-2 rounded-md flex items-center gap-2"><Send size={14} /> Send</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
