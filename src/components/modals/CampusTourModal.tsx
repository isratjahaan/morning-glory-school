"use client";

import React from "react";
import { X, Play, ShieldCheck, MapPin } from "lucide-react";
import Image from "next/image";

interface CampusTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampusTourModal({ isOpen, onClose }: CampusTourModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#06275B] text-white">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#1554B8] text-white">
              <Play className="w-4 h-4 fill-current" />
            </span>
            <div>
              <h3 className="font-heading font-semibold text-lg text-white">
                Morning Glory School Campus Tour
              </h3>
              <p className="text-xs text-white/70">
                A 360° virtual walkthrough of our modern academic facilities
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Virtual Tour Container */}
        <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
          {/* Background campus visual */}
          <Image
            src="/images/campus/about-campus-2x.jpg"
            alt="Campus Walkthrough"
            fill
            className="object-cover opacity-60 filter brightness-90"
          />

          {/* Interactive Player Overlay */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-lg">
            <div className="w-20 h-20 rounded-full bg-[#1554B8]/90 hover:bg-[#1554B8] text-white flex items-center justify-center shadow-2xl cursor-pointer transform hover:scale-110 transition-all border-4 border-white/30 mb-4 group">
              <Play className="w-8 h-8 fill-current translate-x-0.5 text-white group-hover:text-[#F5AE25] transition-colors" />
            </div>
            <h4 className="text-xl font-bold text-white drop-shadow-md">
              Experience Life at Morning Glory
            </h4>
            <p className="text-sm text-white/90 drop-shadow mt-1">
              Explore our smart classrooms, specialized STEM laboratories, Olympic-standard sports grounds, and vibrant learning spaces.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#F5AE25]" /> Chattogram Campus
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Safe & Secure Environment
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F7FAFF] border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            Need an on-campus guided tour? Contact admissions at{" "}
            <a href="tel:+8801851121257" className="font-semibold text-[#082D68] hover:underline">
              +880 1851 121257
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#082D68] text-white font-medium hover:bg-[#062352] transition-colors"
          >
            Close Tour
          </button>
        </div>
      </div>
    </div>
  );
}
