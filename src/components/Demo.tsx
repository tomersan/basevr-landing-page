"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Demo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demo" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(44,106,251,0.1)_0%,transparent_50%)]" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs tracking-widest uppercase font-bold mb-4">
            דמו חי — 360°
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-snug">
            להפוך תוכנית אדריכלית <span className="text-gradient-blue">למציאות</span>
          </h2>
          <p className="text-white text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            הרוכש לא רק רואה את הדירה — הוא חווה את התחושה של לחיות בה.
            <br className="hidden md:block" />
            זה לא רק הדמיה. <span className="font-medium text-white">זה החוויה עצמה.</span>
          </p>
        </motion.div>

        {/* Demo iframe container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden glow-blue-strong"
        >
          {/* Decorative frame */}
          <div className="absolute inset-0 rounded-2xl border border-brand-blue/30 pointer-events-none z-10" />
          <div className="absolute -top-px -left-px -right-px h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent z-10" />

          {/* VR goggles overlay hint */}
          <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-brand-blue/30 text-brand-blue text-xs font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            סובבו את המצלמה — סיור 360°
          </div>

          <div className="aspect-video bg-brand-dark-card w-full max-w-full overflow-hidden">
            <iframe
              src="https://editor.rollinom.com/360/?id=378539746h"
              className="w-full h-full border-0"
              allow="accelerometer; gyroscope; fullscreen"
              loading="lazy"
              title="BaseVR 360 Virtual Tour Demo"
              style={{ touchAction: "pan-y" }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-6 text-white text-xs md:text-sm font-light tracking-wide"
        >
          * וכשחווים את זה — אי אפשר להתעלם
        </motion.p>
      </div>
    </section>
  );
}
