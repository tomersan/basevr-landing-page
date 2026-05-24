"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const clients = [
  { name: "רמי לוי נדל\"ן", src: "/logos/rami-levy.jpg", imgClass: "max-h-full w-auto object-contain" },
  { name: "אלקטרה מגורים", src: "/logos/electra.png", imgClass: "max-h-full w-auto object-contain" },
  { name: "Blue Gallery", src: "/logos/blue-gallery.png", imgClass: "max-h-full w-auto object-contain" },
  { name: "דן נדל\"ן", src: "/logos/dan-nadlan.jpg", imgClass: "h-full w-full object-contain scale-150" },
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
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-xl px-6 py-6 flex items-center justify-center h-28 md:h-32 shadow-sm border border-white/10 hover:border-brand-blue/40 hover:shadow-[0_0_24px_rgba(0,162,255,0.25)] transition-all duration-300 overflow-hidden"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={320}
                height={120}
                className={client.imgClass}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
