"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEffects() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // === Section reveal animations ===
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    });

    // === Dynamic background glow that follows scroll ===
    const bgElement = document.getElementById("scroll-bg");
    if (bgElement) {
      gsap.to(bgElement, {
        "--bg-y": "300px",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });
    }

    // === Parallax on section dividers ===
    const dividers = document.querySelectorAll(".section-divider");
    dividers.forEach((div) => {
      gsap.fromTo(
        div,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: div,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
      {/* Dynamic radial gradient background that shifts on scroll */}
      <div
        id="scroll-bg"
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={
          {
            "--bg-y": "0px",
            background: `
              radial-gradient(circle at calc(20% + 0px) calc(15% + var(--bg-y)), rgba(0,162,255,0.12), transparent 50%),
              radial-gradient(circle at calc(80%) calc(60% + var(--bg-y)), rgba(79,191,255,0.08), transparent 55%),
              radial-gradient(circle at 50% calc(100% - var(--bg-y)), rgba(0,102,204,0.1), transparent 60%)
            `,
            filter: "blur(40px)",
          } as React.CSSProperties
        }
      />

      {/* Fixed grid pattern */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,162,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,162,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "#4FBFFF",
              boxShadow: "0 0 8px #00A2FF",
              opacity: 0.4 + Math.random() * 0.4,
              animation: `floatParticle ${8 + Math.random() * 12}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.4; }
          100% {
            transform: translateY(-100vh) translateX(30px);
            opacity: 0;
          }
        }
        html.lenis, html.lenis body {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
      `}</style>
    </>
  );
}
