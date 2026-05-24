"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(3,6,15,0.92)] backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3" data-hover>
          <BrandLogo size={36} />
          <span className="text-xl font-bold tracking-tight">
            Base<span className="text-brand-blue font-extrabold">VR</span>
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-white/90">
          <a href="#problem" className="hover:text-brand-blue transition-colors relative group">
            הבעיה
            <span className="absolute bottom-[-6px] right-0 w-0 h-px bg-brand-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#solution" className="hover:text-brand-blue transition-colors relative group">
            הפתרון
            <span className="absolute bottom-[-6px] right-0 w-0 h-px bg-brand-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#stats" className="hover:text-brand-blue transition-colors relative group">
            מספרים
            <span className="absolute bottom-[-6px] right-0 w-0 h-px bg-brand-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#demo" className="hover:text-brand-blue transition-colors relative group">
            דמו חי
            <span className="absolute bottom-[-6px] right-0 w-0 h-px bg-brand-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#features" className="hover:text-brand-blue transition-colors relative group">
            למה אנחנו
            <span className="absolute bottom-[-6px] right-0 w-0 h-px bg-brand-blue transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-light text-white text-sm font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/30 hover:-translate-y-0.5"
          data-hover
        >
          לתיאום הדגמה
        </a>
      </div>
    </motion.nav>
  );
}
