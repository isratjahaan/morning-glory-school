"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  BarChart3,
  CreditCard,
  Library,
  Bus,
  Mail,
} from "lucide-react";
import { QUICK_ACCESS_ITEMS } from "@/config/school";

const iconMap = {
  BookOpen: BookOpen,
  Calendar: Calendar,
  BarChart3: BarChart3,
  CreditCard: CreditCard,
  Library: Library,
  Bus: Bus,
  Mail: Mail,
};

export function QuickAccessSection() {
  return (
    <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 7 Quick Access Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5">
        {QUICK_ACCESS_ITEMS.map((item) => {
          const Icon = iconMap[item.iconName] || BookOpen;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-3 rounded-2xl ${item.bgColor} border ${item.borderColor} shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 group`}
            >
              <div
                className={`w-9 h-9 rounded-xl bg-white/80 shadow-xs flex items-center justify-center shrink-0 ${item.iconColor} group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="min-w-0">
                <span
                  className={`text-[12.5px] sm:text-[13px] font-bold ${item.textColor} leading-tight block truncate`}
                >
                  {item.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
