"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { BrainCircuit, Lock, Mail, GitBranch, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      if (remember) localStorage.setItem("rememberEmail", email);
      router.push("/dashboard");
    } catch (e) {
      alert(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10 sm:px-6">
      <div className="absolute top-0 left-0 w-[420px] h-[420px] sm:w-[700px] sm:h-[700px] bg-[radial-gradient(closest-side,rgba(250,204,21,0.08),transparent)] blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] bg-[radial-gradient(closest-side,rgba(239,68,68,0.05),transparent)] blur-3xl -z-10" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 sm:p-8 rounded-3xl w-full max-w-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FACC15] text-black flex items-center justify-center shadow-md"><BrainCircuit size={26} /></div>
        </div>

        <h1 className="text-4xl font-black text-center mb-1">ResumeAI</h1>
        <p className="text-center soft-muted mb-6">AI-powered resume analysis for ATS and recruiters</p>

        <div className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-3 text-zinc-400" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full pl-12 pr-4 py-3 rounded-2xl bg-black/15" />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-4 top-3 text-zinc-400" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3 rounded-2xl bg-black/15" />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4" /> Remember me
            </label>
            <a className="text-sm text-[#FACC15] hover:underline" href="#">Forgot password?</a>
          </div>

          <button onClick={handleLogin} disabled={loading} className="w-full bg-[#FACC15] text-black hover:bg-[#FACC15]/90 py-3 rounded-2xl font-semibold shadow-lg shadow-[#FACC15]/10 hover:shadow-[#FACC15]/20 transition-all duration-300">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="flex items-center gap-3">
            <hr className="flex-1 border-white/6" />
            <div className="text-xs soft-muted">or continue with</div>
            <hr className="flex-1 border-white/6" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => alert('Google OAuth not configured')} className="flex-1 py-2 rounded-2xl bg-white/5 hover:bg-white/6 transition">Google</button>
            <button onClick={() => alert('GitHub OAuth not configured')} className="flex-1 py-2 rounded-2xl bg-white/5 hover:bg-white/6 transition"><GitBranch /></button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm soft-muted">Smart ATS + AI Analysis</div>
      </motion.div>
    </div>
  );
}