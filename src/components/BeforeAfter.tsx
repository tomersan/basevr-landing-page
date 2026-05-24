"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const beforeItems = [
  "הדפסות שמומשות, קשה לדמיין את התוצאה",
  "תוכנות 2D מסובכות, לא אינטראקטיביות",
  "חוסר חיבור רגשי",
  "תהליך ארוך ולא יעיל",
  "חוסר ודאות, קשה לסגור עסקה",
];

const afterItems = [
  "חוויה ריאליסטית מלאה של הדירה",
  "הבנה מלאה של החלל, בכל זווית ובכל זמן",
  "חיבור רגשי חזק, ביטחון והתרגשות",
  "תהליך קצר ויעיל, פחות פגישות יותר סגירות",
  "ביטחון מלא בהחלטה, סגירת עסקה",
];

export default function BeforeAfter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solution" className="relative py-32 overflow-hidden">
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
            הפתרון
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            לפני ואחרי <span className="text-gradient-blue">BASEVR</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            מחוויית מכירה סטנדרטית ומיושנת — לחוויית רכישה רגשית ואמיתית
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card p-8 border-red-500/20 hover:border-red-500/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
                <span className="text-red-400 font-bold">לפני</span>
              </div>
              <span className="text-white text-sm">חוויה מסורתית ומיושנת</span>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <svg className="w-5 h-5 mt-0.5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-white">{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-red-400">
                <span className="text-2xl">😟</span>
                <span className="font-bold">בלבול, חוסר ודאות וחוסר דימיון</span>
              </div>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card p-8 border-brand-blue/30 glow-blue hover:glow-blue-strong transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30">
                <span className="text-brand-blue font-bold">אחרי</span>
              </div>
              <span className="text-white text-sm">חוויה עם BaseVR</span>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <svg className="w-5 h-5 mt-0.5 text-brand-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-white">{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-brand-blue/10">
              <div className="flex items-center gap-2 text-brand-blue">
                <span className="text-2xl">🤩</span>
                <span className="font-bold">הבנה, ביטחון וסגירת עסקה</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12 text-2xl md:text-3xl font-bold text-white"
        >
          אותה דירה. <span className="text-gradient-blue">חוויה אחרת.</span> תוצאה אחרת.
        </motion.p>
      </div>
    </section>
  );
}
