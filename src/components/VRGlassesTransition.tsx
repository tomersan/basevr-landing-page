"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VRGlassesTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gogglesRef = useRef<HTMLDivElement>(null);
  const lensContentRef = useRef<HTMLDivElement>(null);
  const lensContentRightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const goggles = gogglesRef.current;
    const lensContent = lensContentRef.current;
    const lensContentRight = lensContentRightRef.current;
    const text = textRef.current;
    const rings = ringsRef.current;
    const rays = raysRef.current;
    const particles = particlesRef.current;
    const introText = introTextRef.current;
    if (!section || !goggles || !lensContent || !lensContentRight || !text || !rings || !rays || !particles || !introText) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Phase 0: Intro text fades out and scales up as scroll begins
    tl.fromTo(
      introText,
      { opacity: 1, scale: 1, y: 0 },
      { opacity: 0, scale: 1.3, y: -30, duration: 0.4, ease: "power2.in" }
    );

    // Phase 1: Goggles rotate from side view to front view + rings expand
    tl.fromTo(
      goggles,
      { rotateY: -70, scale: 0.6, opacity: 0.3 },
      { rotateY: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Rings pulse outward as goggles arrive
    tl.fromTo(
      rings,
      { scale: 0.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.7"
    );

    // Particles scatter outward
    tl.fromTo(
      particles,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );

    // Phase 2: Lenses light up and content appears inside + rays shoot out
    tl.to(
      [lensContent, lensContentRight],
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

    tl.fromTo(
      rays,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    );

    // Phase 3: Text appears
    tl.fromTo(
      text,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,162,255,0.08)_0%,transparent_60%)]" />

      {/* Ambient floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[3px] h-[3px] rounded-full bg-[#4FBFFF]"
            style={{
              left: `${10 + (i * 37) % 80}%`,
              top: `${10 + (i * 53) % 80}%`,
              opacity: 0.3 + (i % 5) * 0.1,
              animation: `vrFloat ${4 + (i % 4) * 2}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3) % 4}s`,
              boxShadow: "0 0 6px rgba(0,162,255,0.6)",
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Intro text - visible before scroll starts */}
        <div
          ref={introTextRef}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <div className="text-center">
            <p className="text-4xl md:text-6xl font-extrabold mb-4">
              מוכנים <span className="text-gradient-blue">לראות את העתיד?</span>
            </p>
            <p className="text-white/90 text-lg md:text-xl animate-pulse">
              ↓ גללו למטה
            </p>
          </div>
        </div>

        {/* VR Goggles container */}
        <div className="relative">
          {/* Orbiting rings around goggles */}
          <div
            ref={ringsRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0 }}
          >
            {/* Ring 1 - large orbit */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[280px] md:w-[620px] md:h-[380px] rounded-[50%] border border-[rgba(0,162,255,0.25)]"
              style={{
                animation: "vrOrbit 8s linear infinite",
                boxShadow: "0 0 15px rgba(0,162,255,0.1), inset 0 0 15px rgba(0,162,255,0.05)",
              }}
            />
            {/* Ring 2 - medium orbit, opposite direction */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[250px] md:w-[560px] md:h-[340px] rounded-[50%] border border-[rgba(79,191,255,0.15)]"
              style={{
                animation: "vrOrbitReverse 12s linear infinite",
                transform: "translate(-50%, -50%) rotateX(60deg)",
              }}
            />
            {/* Ring 3 - small tight orbit */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[220px] md:w-[530px] md:h-[300px] rounded-[50%] border border-dashed border-[rgba(0,162,255,0.2)]"
              style={{
                animation: "vrOrbit 15s linear infinite reverse",
              }}
            />
            {/* Orbiting dots on rings */}
            <div
              className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-[#00A2FF]"
              style={{
                animation: "vrDotOrbit1 8s linear infinite",
                boxShadow: "0 0 10px #00A2FF, 0 0 20px rgba(0,162,255,0.5)",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#4FBFFF]"
              style={{
                animation: "vrDotOrbit2 12s linear infinite",
                boxShadow: "0 0 8px #4FBFFF, 0 0 16px rgba(79,191,255,0.5)",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#87CEFF]"
              style={{
                animation: "vrDotOrbit3 6s linear infinite",
                boxShadow: "0 0 8px #87CEFF",
              }}
            />
          </div>

          {/* Light rays from lenses */}
          <div
            ref={raysRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0 }}
          >
            {/* Left lens rays */}
            <div className="absolute top-1/2 right-[20%] -translate-y-1/2 md:right-[18%]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`l-${i}`}
                  className="absolute top-1/2 left-1/2 origin-left h-[1px] md:h-[2px]"
                  style={{
                    width: `${60 + i * 15}px`,
                    transform: `rotate(${i * 60}deg)`,
                    background: `linear-gradient(90deg, rgba(0,162,255,0.6), transparent)`,
                    animation: `vrRayPulse ${2 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
            {/* Right lens rays */}
            <div className="absolute top-1/2 left-[20%] -translate-y-1/2 md:left-[18%]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`r-${i}`}
                  className="absolute top-1/2 left-1/2 origin-left h-[1px] md:h-[2px]"
                  style={{
                    width: `${60 + i * 15}px`,
                    transform: `rotate(${i * 60 + 30}deg)`,
                    background: `linear-gradient(90deg, rgba(79,191,255,0.5), transparent)`,
                    animation: `vrRayPulse ${2.5 + i * 0.2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Scattered particles */}
          <div
            ref={particlesRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0 }}
          >
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 180 + (i % 3) * 40;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * (radius * 0.6);
              return (
                <div
                  key={`p-${i}`}
                  className="absolute top-1/2 left-1/2 w-[4px] h-[4px] rounded-full"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    background: i % 2 === 0 ? "#00A2FF" : "#4FBFFF",
                    boxShadow: `0 0 8px ${i % 2 === 0 ? "#00A2FF" : "#4FBFFF"}`,
                    animation: `vrSparkle ${2 + (i % 4) * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              );
            })}
          </div>

          <div
            ref={gogglesRef}
            className="relative"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Goggles frame */}
            <div className="relative w-[340px] h-[180px] md:w-[500px] md:h-[260px]">
              {/* Main body */}
              <div
                className="absolute inset-0 rounded-[40%] border-2 border-[rgba(0,162,255,0.6)]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,40,80,0.95) 0%, rgba(10,20,50,0.98) 100%)",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 60px rgba(0,162,255,0.35), 0 0 120px rgba(0,162,255,0.15)",
                  animation: "vrBreath 4s ease-in-out infinite",
                }}
              />

              {/* Strap hint */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-6 w-8 h-12 md:-right-8 md:w-10 md:h-16 rounded-r-full bg-gradient-to-r from-white/20 to-transparent border border-white/20 border-l-0" />
              <div className="absolute top-1/2 -translate-y-1/2 -left-6 w-8 h-12 md:-left-8 md:w-10 md:h-16 rounded-l-full bg-gradient-to-l from-white/20 to-transparent border border-white/20 border-r-0" />

              {/* Nose bridge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-6 md:w-10 md:h-8 rounded-b-full bg-gradient-to-b from-transparent to-white/5 border-b border-x border-white/10" />

              {/* Left lens */}
              <div className="absolute top-1/2 -translate-y-1/2 right-[15%] w-[110px] h-[110px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden border-2 border-[rgba(0,162,255,0.4)]"
                style={{
                  boxShadow:
                    "0 0 30px rgba(0,162,255,0.3), inset 0 0 20px rgba(0,162,255,0.1)",
                  animation: "vrLensGlow 3s ease-in-out infinite",
                }}
              >
                {/* Lens glass effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,162,255,0.1)] to-[rgba(0,40,80,0.8)]" />
                {/* Animated content inside lens */}
                <div
                  ref={lensContentRef}
                  className="absolute inset-0 opacity-0 scale-90"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00A2FF] via-[#0066CC] to-[#003366]" style={{ animation: "vrLensContent 4s ease-in-out infinite" }} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,162,255,0.4)_0%,transparent_40%)]" style={{ animation: "vrLensShift 3s ease-in-out infinite reverse" }} />
                </div>
                {/* Lens reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full" />
                {/* Scanning line */}
                <div
                  className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A2FF] to-transparent"
                  style={{ animation: "vrScanLine 3s linear infinite" }}
                />
              </div>

              {/* Right lens */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-[110px] h-[110px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden border-2 border-[rgba(0,162,255,0.4)]"
                style={{
                  boxShadow:
                    "0 0 30px rgba(0,162,255,0.3), inset 0 0 20px rgba(0,162,255,0.1)",
                  animation: "vrLensGlow 3s ease-in-out infinite 0.5s",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-bl from-[rgba(0,162,255,0.1)] to-[rgba(0,40,80,0.8)]" />
                {/* Animated content inside lens */}
                <div ref={lensContentRightRef} className="absolute inset-0 opacity-0 scale-90">
                  <div className="absolute inset-0 bg-gradient-to-bl from-[#00A2FF] via-[#0066CC] to-[#003366]" style={{ animation: "vrLensContent 4s ease-in-out infinite 0.5s" }} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(0,162,255,0.4)_0%,transparent_40%)]" style={{ animation: "vrLensShift 3s ease-in-out infinite 0.5s" }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-bl from-white/10 via-transparent to-transparent rounded-full" />
                {/* Scanning line */}
                <div
                  className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#4FBFFF] to-transparent"
                  style={{ animation: "vrScanLine 3.5s linear infinite 1s" }}
                />
              </div>

              {/* Brand mark on goggles */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] md:text-xs tracking-widest text-white/30 font-bold">
                BASEVR
              </div>

              {/* LED indicator */}
              <div className="absolute top-4 right-[30%] w-2 h-2 rounded-full bg-[#00A2FF] animate-pulse"
                style={{ boxShadow: "0 0 8px #00A2FF, 0 0 16px rgba(0,162,255,0.5)" }}
              />

              {/* Second LED */}
              <div className="absolute top-4 left-[30%] w-1.5 h-1.5 rounded-full bg-[#4FBFFF]"
                style={{
                  boxShadow: "0 0 6px #4FBFFF, 0 0 12px rgba(79,191,255,0.4)",
                  animation: "vrBlink 2s ease-in-out infinite 1s",
                }}
              />
            </div>
          </div>
        </div>

        {/* Text below goggles */}
        <div ref={textRef} className="text-center opacity-0 max-w-2xl px-6">
          <p className="text-3xl md:text-5xl font-extrabold mb-3">
            הציצו <span className="text-gradient-blue">לתוך העתיד</span>
          </p>
          <p className="text-white text-base md:text-lg">
            כשהרוכש שם את המשקפיים — הוא כבר בתוך הדירה. זה הרגע שבו מכירה הופכת לחוויה.
          </p>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes vrFloat {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-3px); }
          75% { transform: translateY(-15px) translateX(2px); }
        }
        @keyframes vrOrbit {
          from { transform: translate(-50%, -50%) rotateX(70deg) rotateZ(0deg); }
          to { transform: translate(-50%, -50%) rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes vrOrbitReverse {
          from { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(360deg); }
          to { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(0deg); }
        }
        @keyframes vrDotOrbit1 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(210px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(210px) rotate(-360deg); }
        }
        @keyframes vrDotOrbit2 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(180px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg) translateX(180px) rotate(360deg); }
        }
        @keyframes vrDotOrbit3 {
          from { transform: translate(-50%, -50%) rotate(120deg) translateX(150px) rotate(-120deg); }
          to { transform: translate(-50%, -50%) rotate(480deg) translateX(150px) rotate(-480deg); }
        }
        @keyframes vrRayPulse {
          0%, 100% { opacity: 0.3; transform: rotate(var(--r, 0deg)) scaleX(1); }
          50% { opacity: 0.8; transform: rotate(var(--r, 0deg)) scaleX(1.2); }
        }
        @keyframes vrSparkle {
          0%, 100% { opacity: 0.4; transform: translate(var(--tx, 0), var(--ty, 0)) scale(1); }
          50% { opacity: 1; transform: translate(var(--tx, 0), var(--ty, 0)) scale(1.5); }
        }
        @keyframes vrBreath {
          0%, 100% { box-shadow: 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 60px rgba(0,162,255,0.35), 0 0 120px rgba(0,162,255,0.15); }
          50% { box-shadow: 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 80px rgba(0,162,255,0.5), 0 0 150px rgba(0,162,255,0.25); }
        }
        @keyframes vrLensGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(0,162,255,0.3), inset 0 0 20px rgba(0,162,255,0.1); }
          50% { box-shadow: 0 0 50px rgba(0,162,255,0.5), inset 0 0 30px rgba(0,162,255,0.2); }
        }
        @keyframes vrScanLine {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes vrBlink {
          0%, 40%, 100% { opacity: 1; }
          50%, 90% { opacity: 0.2; }
        }
        @keyframes vrLensContent {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.3); }
        }
        @keyframes vrLensShift {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(10%) translateY(-10%); }
        }
      `}</style>
    </div>
  );
}
