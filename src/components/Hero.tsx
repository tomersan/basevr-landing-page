"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const VRRoom = dynamic(() => import("./VRRoom"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <VRRoom />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,162,255,0.1)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            IMMERSIVE · REAL · EFFECTIVE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
        >
          <span className="text-gradient">חוויית המכירה</span>
          <br />
          <span className="text-gradient-blue">החדשה בעולם הנדל״ן</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          הפכו את תהליך המכירה מארוך ומסורבל — לחוויה רגשית, מדויקת ובלתי נשכחת.
          <br />
          הרוכש לא רק רואה את הדירה. הוא חי אותה.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-lg rounded-xl transition-all duration-300 animate-pulse-glow hover:scale-105"
          >
            <span className="relative z-10">לתיאום הדגמה חינם</span>
          </a>
          <a
            href="#demo"
            className="px-8 py-4 border border-white/20 hover:border-brand-blue/50 text-white hover:text-white font-medium text-lg rounded-xl transition-all duration-300 hover:bg-brand-blue/5"
          >
            צפו בדמו חי ←
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-white text-sm"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
            סטנדרט חדש במכירות
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
            דיוק מקסימלי בהתאמה
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
            חוויית VR מלאה וסוחפת
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
        </motion.div>
      </motion.div>
    </section>
  );
}
