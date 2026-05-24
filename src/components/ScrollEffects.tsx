"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEffects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);

    const sections = document.querySelectorAll("section");

    if (mobile) {
      // Mobile: simple one-time fade-in with slight upward movement
      sections.forEach((section) => {
        gsap.set(section, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          },
        });
      });
    } else {
      // Desktop: smooth scrub opacity
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
    }

    // Section dividers - simpler on mobile
    const dividers = document.querySelectorAll(".section-divider");
    dividers.forEach((div) => {
      if (mobile) {
        gsap.set(div, { scaleX: 0, opacity: 0 });
        ScrollTrigger.create({
          trigger: div,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(div, {
              scaleX: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      } else {
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
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* Simple gradient backgrounds - no blur filter */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 15%, rgba(0,162,255,0.08), transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(79,191,255,0.05), transparent 55%)
          `,
        }}
      />

      {/* Fixed grid pattern - only on desktop */}
      {!isMobile && (
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
      )}

      {/* Floating particles - only on desktop */}
      {!isMobile && (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full"
              style={{
                left: `${(i * 10 + 5) % 100}%`,
                top: `${(i * 13 + 7) % 100}%`,
                background: "#4FBFFF",
                boxShadow: "0 0 6px #00A2FF",
                opacity: 0.5,
                animation: `floatParticle ${10 + i * 2}s linear infinite`,
                animationDelay: `${i}s`,
              }}
            />
          ))}
        </div>
      )}

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
      `}</style>
    </>
  );
}
