"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-slate-100 flex flex-col justify-between h-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Text content */}
        <div className="md:col-span-7 flex flex-col items-start">
          {/* Badge */}
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#082D68] text-white text-[12px] font-semibold tracking-wide mb-3">
            About Our School
          </div>

          {/* Heading */}
          <h2 className="font-heading font-extrabold text-[#082D68] text-2xl sm:text-3xl leading-tight mb-3">
            Empowering Minds, Enriching Lives
          </h2>

          {/* Description */}
          <p className="text-[#172B4D]/80 text-[14px] sm:text-[15px] leading-relaxed mb-6 font-normal">
            Morning Glory School is committed to providing world-class education with a focus on academic excellence, moral values and overall development.
          </p>

          {/* Button */}
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#082D68] hover:bg-[#062352] text-white font-semibold text-[13.5px] shadow-sm hover:shadow transition-all active:scale-[0.98] group"
          >
            <span>Know More About Us</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right Column: Campus Photograph */}
        <div className="md:col-span-5 relative w-full h-[180px] sm:h-[200px] md:h-[220px] rounded-xl overflow-hidden shadow-sm border border-slate-100">
          <Image
            src="/images/campus/about-campus-2x.jpg"
            alt="Morning Glory School Modern Campus Building"
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </div>
    </div>
  );
}
