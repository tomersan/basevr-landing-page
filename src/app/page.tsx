"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import BeforeAfter from "@/components/BeforeAfter";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Demo from "@/components/Demo";
import SocialProof from "@/components/SocialProof";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ScrollEffects = dynamic(() => import("@/components/ScrollEffects"), { ssr: false });
const AnimatedBackground = dynamic(() => import("@/components/AnimatedBackground"), { ssr: false });
const VRGlassesTransition = dynamic(() => import("@/components/VRGlassesTransition"), { ssr: false });

export default function Home() {
  return (
    <main>
      <AnimatedBackground />
      <ScrollEffects />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />

      <div className="section-divider" />
      <Problem />

      <div className="section-divider" />
      <BeforeAfter />

      <VRGlassesTransition />

      <div className="section-divider" />
      <Stats />

      <div className="section-divider" />
      <Demo />

      <div className="section-divider" />
      <Features />

      <div className="section-divider" />
      <SocialProof />

      <div className="section-divider" />
      <LeadForm />

      <Footer />
    </main>
  );
}
