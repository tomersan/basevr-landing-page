"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  { name: "רמי לוי נדל\"ן", logo: "רמי לוי" },
  { name: "אלקטרה מגורים", logo: "אלקטרה" },
  { name: "Blue Gallery", logo: "Blue Gallery" },
  { name: "דן נדל\"ן", logo: "דן נדל\"ן" },
];

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            החברות שבחרו <span className="text-gradient-blue">למכור אחרת</span>
          </h3>
          <p className="text-white">מצטרפים למהפכה בעולם מכירות הנדל״ן</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="glass-card-light px-6 py-8 flex items-center justify-center group hover:border-brand-blue/30 transition-all duration-300"
            >
              <span className="text-xl font-bold text-white group-hover:text-brand-blue transition-colors duration-300">
                {client.logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
