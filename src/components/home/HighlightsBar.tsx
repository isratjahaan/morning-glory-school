"use client";

import React from "react";
import {
  GraduationCap,
  Trophy,
  BookOpen,
  Landmark,
  Users,
  Star,
} from "lucide-react";
import { SCHOOL_HIGHLIGHTS } from "@/config/school";

const iconMap = {
  GraduationCap: GraduationCap,
  Trophy: Trophy,
  BookOpen: BookOpen,
  Landmark: Landmark,
  Users: Users,
  Star: Star,
};

export function HighlightsBar() {
  return (
    <div className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-100/80 p-3 sm:p-4 md:p-5 transition-all">
        {/* Grid for desktop / tablet / mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-slate-100 gap-y-3 md:gap-y-0">
          {SCHOOL_HIGHLIGHTS.map((item) => {
            const Icon = iconMap[item.iconName] || Star;
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2 sm:py-3 transition-colors hover:bg-[#F7FAFF] rounded-xl group cursor-default"
                title={item.description}
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] flex items-center justify-center shrink-0 group-hover:bg-[#082D68] transition-colors duration-200">
                  <Icon className="w-5 h-5 text-[#082D68] group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="text-left">
                  <h4 className="text-[13px] sm:text-[13.5px] font-bold text-[#082D68] leading-tight group-hover:text-[#1554B8] transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
