"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on mobile/touch devices
    if (typeof window === "undefined" || window.matchMedia("(max-width: 900px)").matches) return;
    if ("ontouchstart" in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate(${rx - 19}px, ${ry - 19}px)`;
      animId = requestAnimationFrame(animateRing);
    };

    const onEnter = () => ring.classList.add("hovering");
    const onLeave = () => ring.classList.remove("hovering");

    window.addEventListener("mousemove", onMouseMove);
    animateRing();

    // Add hover effect to interactive elements
    const interactives = document.querySelectorAll("a, button, [data-hover], input, textarea, select");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Show cursor elements
    dot.style.opacity = "1";
    ring.style.opacity = "1";
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 pointer-events-none z-[9999] w-[6px] h-[6px] rounded-full opacity-0 mix-blend-screen hidden md:block"
        style={{
          background: "#4FBFFF",
          boxShadow: "0 0 12px #00A2FF, 0 0 24px rgba(0,162,255,0.4)",
          transition: "transform 0.1s cubic-bezier(.16,1,.3,1), opacity 0.3s",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 pointer-events-none z-[9998] w-[38px] h-[38px] rounded-full opacity-0 mix-blend-screen hidden md:block"
        style={{
          border: "1.5px solid rgba(0,162,255,0.55)",
          backdropFilter: "blur(2px)",
          transition: "transform 0.15s cubic-bezier(.16,1,.3,1), opacity 0.25s, width 0.25s cubic-bezier(.16,1,.3,1), height 0.25s cubic-bezier(.16,1,.3,1), background 0.25s",
        }}
      />
      <style jsx global>{`
        @media (min-width: 901px) {
          .cursor-ring.hovering {
            width: 64px !important;
            height: 64px !important;
            background: rgba(0,162,255,0.08) !important;
            border-color: rgba(79,191,255,0.9) !important;
          }
        }
        @media (max-width: 900px) {
          .cursor-dot, .cursor-ring { display: none !important; }
        }
      `}</style>
    </>
  );
}
