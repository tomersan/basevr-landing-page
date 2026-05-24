"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PHONE = "972543471254";
const PREFILL = "שלום, ראיתי את BaseVR ואשמח לקבל הדגמה";

export default function WhatsAppFloat() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(PREFILL)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="צור קשר בוואטסאפ"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-[60] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-shadow"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <svg
        viewBox="0 0 32 32"
        className="relative w-7 h-7 md:w-8 md:h-8"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.49-1.306.143-.343.143-.66.114-1.032-.085-.115-.27-.17-.54-.31a1.41 1.41 0 00-.05-.014c-.043-.014-2.078-1.06-2.107-1.075-.07-.04-.143-.07-.215-.07zM16.06 5.355c-5.965 0-10.797 4.832-10.797 10.798 0 1.95.516 3.852 1.504 5.524l.243.387-1.046 3.823 3.91-1.032.388.215c1.62.967 3.466 1.476 5.353 1.476 5.965 0 10.797-4.832 10.797-10.798S22.025 5.355 16.06 5.355zm0 19.69c-1.762 0-3.482-.473-5.008-1.355l-.358-.215-3.696.974 1.003-3.61-.244-.387c-.974-1.547-1.504-3.337-1.504-5.18 0-5.408 4.41-9.818 9.82-9.818 5.407 0 9.818 4.41 9.818 9.82 0 5.408-4.41 9.77-9.82 9.77z" />
      </svg>
    </motion.a>
  );
}
