"use client";

import React from "react";
import { AboutSection } from "./AboutSection";
import { AchievementCard } from "./AchievementCard";
import { NoticeCard } from "./NoticeCard";
import { NoticeItem } from "@/types";

interface LowerGridSectionProps {
  onSelectNotice: (notice: NoticeItem) => void;
}

export function LowerGridSection({ onSelectNotice }: LowerGridSectionProps) {
  return (
    <section className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: About Our School Section */}
        <div className="lg:col-span-6 flex flex-col">
          <AboutSection />
        </div>

        {/* Right Column: Achievements & Latest Notice Cards */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          <AchievementCard />
          <NoticeCard onSelectNotice={onSelectNotice} />
        </div>
      </div>
    </section>
  );
}
