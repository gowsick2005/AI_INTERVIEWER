"use client";

import { motion } from "framer-motion";
import ProfileDropdown from "./ProfileDropdown";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#hero", label: "Overview" },
  { href: "#stats", label: "Metrics" },
  { href: "#features", label: "Features" },
  { href: "#history", label: "History" },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + 160;
      const currentSection = links.find((link, index) => {
        const nextSection = links[index + 1];
        const sectionElement = document.querySelector(link.href);
        const nextElement = nextSection ? document.querySelector(nextSection.href) : null;
        if (!sectionElement) return false;
        const top = sectionElement.getBoundingClientRect().top + window.scrollY;
        const nextTop = nextElement ? nextElement.getBoundingClientRect().top + window.scrollY : Infinity;
        return scrollTop >= top && scrollTop < nextTop;
      });
      if (currentSection) {
        setActiveSection(currentSection.href);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full glass-nav z-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-[1360px] mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FACC15] flex items-center justify-center text-black font-bold text-sm font-jakarta shadow-[0_4px_20px_rgba(250,204,21,0.25)]">
            AI
          </div>
          <span className="font-jakarta font-bold text-white tracking-tight">ResumeAI</span>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-inter transition ${
                activeSection === link.href ? "text-white font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Desktop Dropdown */}
          <div className="hidden md:block">
            <ProfileDropdown />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2.5 rounded-xl hover:bg-white/5 transition text-white/70 hover:text-white"
            aria-label="Toggle menu"
          >
            {showMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 left-0 right-0 bg-[#0A0A0A]/98 backdrop-blur-3xl border-t border-white/10 md:hidden z-50 shadow-2xl"
          >
            <div className="flex flex-col gap-4 py-6 px-5 max-w-[480px] mx-auto">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setShowMenu(false)}
                  className="block rounded-2xl px-4 py-3 text-white/80 hover:bg-white/5 hover:text-white transition font-medium"
                >
                  {link.label}
                </a>
              ))}
              
              {/* Dynamic Mobile User Account Card */}
              <div className="border-t border-white/10 pt-4 mt-2">
                <div className="flex items-center gap-3 px-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#FACC15] flex items-center justify-center text-black font-bold">U</div>
                  <div>
                    <div className="text-sm font-semibold text-white">User Account</div>
                    <div className="text-xs text-white/50">user@example.com</div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <a href="#" onClick={() => setShowMenu(false)} className="block rounded-2xl px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition">
                    Profile settings
                  </a>
                  <a href="/login" onClick={() => setShowMenu(false)} className="block rounded-2xl px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition">
                    Sign out
                  </a>
                </div>
              </div>

              <a href="#" onClick={() => setShowMenu(false)} className="block text-center rounded-2xl bg-[#FACC15] text-black font-bold px-4 py-3 hover:bg-[#FACC15]/90 transition mt-4">
                Upgrade Pro
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}