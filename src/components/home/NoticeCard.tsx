"use client";

import React from "react";
import Link from "next/link";
import { Volume2, ArrowRight } from "lucide-react";
import { NOTICES } from "@/config/notices";
import { NoticeItem } from "@/types";

interface NoticeCardProps {
  onSelectNotice: (notice: NoticeItem) => void;
}

export function NoticeCard({ onSelectNotice }: NoticeCardProps) {
  // Take first 3 notices as shown in reference design
  const displayNotices = NOTICES.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-slate-100 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#EAF3FF] text-[#082D68]">
            <Volume2 className="w-4 h-4" />
          </span>
          <h3 className="font-heading font-extrabold text-[#082D68] text-base sm:text-lg">
            Latest Notice
          </h3>
        </div>

        <Link
          href="/notices"
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#1554B8] hover:text-[#082D68] transition-colors group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Notice List */}
      <div className="space-y-2.5">
        {displayNotices.map((notice) => (
          <button
            key={notice.id}
            type="button"
            onClick={() => onSelectNotice(notice)}
            className="w-full flex items-center justify-between gap-3 text-left p-2 rounded-xl hover:bg-[#F7FAFF] transition-all group cursor-pointer"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#1554B8] mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
              <p className="text-[13px] sm:text-[13.5px] font-medium text-[#172B4D] group-hover:text-[#082D68] transition-colors line-clamp-1">
                {notice.title}
              </p>
            </div>
            <div className="text-[11px] sm:text-[12px] font-medium text-slate-400 shrink-0 group-hover:text-slate-600 transition-colors">
              {notice.formattedDate}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
