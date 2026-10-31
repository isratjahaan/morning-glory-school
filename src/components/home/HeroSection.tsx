"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenTourModal: () => void;
}

export function HeroSection({ onOpenTourModal }: HeroSectionProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#EAF3FF] via-[#F5F9FF] to-white pt-6 pb-20 md:pt-10 md:pb-28 overflow-hidden">
      {/* Decorative foliage accent in top-left (matches reference design) */}
      <div className="absolute top-0 left-0 pointer-events-none select-none z-10 opacity-90 hidden sm:block">
        <Image
          src="/images/leaf-branch.png"
          alt=""
          width={65}
          height={120}
          className="w-12 md:w-16 h-auto"
        />
      </div>

      {/* Decorative background glow circles */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#1554B8]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#F5AE25]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Heading, intro & CTAs */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left pt-2">
            {/* Small introductory text */}
            <div className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-medium text-[#082D68] italic tracking-wide mb-3">
              <span>Welcome to Morning Glory School</span>
            </div>

            {/* Main Headline with royal blue "Together" */}
            <h1 className="font-heading font-extrabold text-[#082D68] text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] leading-[1.16] tracking-tight mb-4">
              Building a Brighter Future{" "}
              <span className="text-[#1554B8] inline-block font-extrabold">Together</span>
            </h1>

            {/* Sub-description */}
            <p className="text-[#172B4D]/85 text-base sm:text-[17px] leading-relaxed mb-7 max-w-lg font-normal">
              Quality education, modern facilities and caring environment to help every student reach their full potential.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              {/* Primary CTA */}
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#082D68] hover:bg-[#062352] text-white font-semibold text-[14.5px] shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
              >
                <span>Explore Our School</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA: Campus Tour */}
              <button
                type="button"
                onClick={onOpenTourModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-[#082D68] font-semibold text-[14.5px] border border-[#082D68]/30 shadow-sm hover:shadow transition-all active:scale-[0.98] group"
              >
                <span className="w-5 h-5 rounded-full bg-[#082D68] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5 text-white" />
                </span>
                <span>Watch Campus Tour</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Photograph with Students & School Building */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[620px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-card border border-white/80 bg-white/50 backdrop-blur-sm group">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="/images/students/hero-students-2x.jpg"
                  alt="Morning Glory School Students in uniform standing outside campus"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </div>

              {/* Subtle glass badge overlay */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-white/50 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#082D68]">
                <Sparkles className="w-3.5 h-3.5 text-[#F5AE25]" />
                <span>Admissions Open 2026-27</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
