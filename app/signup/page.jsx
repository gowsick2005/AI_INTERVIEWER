"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, Zap } from "lucide-react";

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) return alert("Please fill all fields");
    if (password !== confirm) return alert("Passwords do not match");

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.push("/login");
    } catch (e) {
      setLoading(false);
      alert(e.message || "Signup error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-10 sm:px-6">
      <div className="absolute -top-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#FACC15]/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#EF4444]/5 blur-3xl" />

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="glass p-6 sm:p-10 rounded-3xl w-full max-w-md shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#FACC15] flex items-center justify-center text-black font-bold"><Zap size={20} /></div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Create your account</h2>
            <div className="text-xs soft-muted">Start improving your resume with AI</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <UserPlus size={14} className="absolute left-4 top-3 text-zinc-400" />
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full pl-12 pr-4 py-3 rounded-2xl bg-black/20" />
          </div>

          <div className="relative">
            <Mail size={14} className="absolute left-4 top-3 text-zinc-400" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full pl-12 pr-4 py-3 rounded-2xl bg-black/20" />
          </div>

          <div className="relative">
            <Lock size={14} className="absolute left-4 top-3 text-zinc-400" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3 rounded-2xl bg-black/20" />
          </div>

          <div className="relative">
            <Lock size={14} className="absolute left-4 top-3 text-zinc-400" />
            <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="Confirm password" className="w-full pl-12 pr-4 py-3 rounded-2xl bg-black/20" />
          </div>

          <button onClick={handleSignup} disabled={loading} className="w-full bg-[#FACC15] text-black hover:bg-[#FACC15]/90 py-3 rounded-2xl font-semibold shadow-lg shadow-[#FACC15]/10 hover:shadow-[#FACC15]/20 transition-all duration-300">
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <div className="flex items-center gap-3">
            <hr className="flex-1 border-white/6" />
            <div className="text-xs soft-muted">or sign up with</div>
            <hr className="flex-1 border-white/6" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => alert('Google OAuth not configured')} className="flex-1 py-2 rounded-2xl bg-white/5 hover:bg-white/6 transition">Google</button>
            <button onClick={() => alert('GitHub OAuth not configured')} className="flex-1 py-2 rounded-2xl bg-white/5 hover:bg-white/6 transition">GitHub</button>
          </div>

          <div className="text-center text-sm soft-muted">Already have an account? <a className="text-[#FACC15] hover:underline" href="/login">Login</a></div>
        </div>
      </motion.div>
    </div>
  );
}