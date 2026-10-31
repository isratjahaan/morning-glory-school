"use client";

import React from "react";
import { Users, UserCheck, Trophy, Star } from "lucide-react";
import { SCHOOL_STATISTICS } from "@/config/school";

const iconMap = {
  Users: Users,
  UserCheck: UserCheck,
  Trophy: Trophy,
  Star: Star,
};

// Laurel Wreath SVG (Left branch)
function LaurelLeft() {
  return (
    <svg
      viewBox="0 0 36 80"
      fill="currentColor"
      className="w-7 h-16 sm:w-8 sm:h-20 text-[#D5A344] shrink-0 opacity-85 select-none"
      aria-hidden="true"
    >
      <path d="M28,6 C26,10 20,13 16,11 C18,7 23,4 28,6 Z" />
      <path d="M23,16 C20,20 14,22 11,19 C14,16 20,13 23,16 Z" />
      <path d="M19,27 C15,30 9,31 7,27 C11,24 17,23 19,27 Z" />
      <path d="M16,39 C12,41 6,40 5,36 C9,34 15,34 16,39 Z" />
      <path d="M15,51 C11,52 6,49 6,45 C10,44 15,46 15,51 Z" />
      <path d="M17,62 C14,64 9,60 10,56 C14,55 18,58 17,62 Z" />
      <path d="M22,71 C20,73 15,69 16,66 C20,65 23,68 22,71 Z" />
      <path
        d="M26,8 C19,25 14,48 24,72"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Laurel Wreath SVG (Right branch)
function LaurelRight() {
  return (
    <svg
      viewBox="0 0 36 80"
      fill="currentColor"
      className="w-7 h-16 sm:w-8 sm:h-20 text-[#D5A344] shrink-0 opacity-85 select-none transform -scale-x-100"
      aria-hidden="true"
    >
      <path d="M28,6 C26,10 20,13 16,11 C18,7 23,4 28,6 Z" />
      <path d="M23,16 C20,20 14,22 11,19 C14,16 20,13 23,16 Z" />
      <path d="M19,27 C15,30 9,31 7,27 C11,24 17,23 19,27 Z" />
      <path d="M16,39 C12,41 6,40 5,36 C9,34 15,34 16,39 Z" />
      <path d="M15,51 C11,52 6,49 6,45 C10,44 15,46 15,51 Z" />
      <path d="M17,62 C14,64 9,60 10,56 C14,55 18,58 17,62 Z" />
      <path d="M22,71 C20,73 15,69 16,66 C20,65 23,68 22,71 Z" />
      <path
        d="M26,8 C19,25 14,48 24,72"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AchievementCard() {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-slate-100 flex flex-col justify-center">
      {/* Centered Heading */}
      <h3 className="font-heading font-extrabold text-[#082D68] text-center text-lg sm:text-xl mb-4">
        Our Achievements
      </h3>

      {/* Stats with Flanking Laurel Wreaths */}
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {/* Left Laurel */}
        <div className="hidden sm:block">
          <LaurelLeft />
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 w-full">
          {SCHOOL_STATISTICS.map((stat) => {
            const Icon = iconMap[stat.iconName] || Trophy;
            return (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center px-1 sm:px-2 py-2 sm:py-0 hover:bg-[#F7FAFF] rounded-lg transition-colors"
              >
                <div className="mb-1 text-[#082D68]">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#082D68]" />
                </div>
                <div className="font-heading font-extrabold text-[#082D68] text-lg sm:text-xl md:text-[22px] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-[12px] font-medium text-slate-600 mt-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Laurel */}
        <div className="hidden sm:block">
          <LaurelRight />
        </div>
      </div>
    </div>
  );
}
