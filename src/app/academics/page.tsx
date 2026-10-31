"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle2 } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortalLoginModal } from "@/components/modals/PortalLoginModal";

export default function AcademicsPage() {
  const [portalModal, setPortalModal] = useState<{
    isOpen: boolean;
    role: "student" | "parent" | "teacher";
  }>({ isOpen: false, role: "student" });

  const wings = [
    {
      id: "primary",
      title: "Primary Wing (Class 1-5)",
      badge: "Foundational Level",
      desc: "Nurturing fundamental literacy, cognitive development, mental mathematics, phonetics, and experiential learning.",
      features: ["Activity-based Learning", "Phonics & Language Arts", "STEAM Play Projects", "Character & Value Education"],
    },
    {
      id: "middle",
      title: "Middle Wing (Class 6-8)",
      badge: "Preparatory Level",
      desc: "Deepening analytical inquiry, formal laboratory experiments, interdisciplinary social sciences, and computational logic.",
      features: ["Dedicated Science Labs", "Introductory Coding & ICT", "Debate & Public Speaking", "Sports & Athletics"],
    },
    {
      id: "senior",
      title: "Senior Wing (Class 9-10)",
      badge: "Mastery Level",
      desc: "Rigorous preparation for secondary school board certifications, advanced STEM electives, and career guidance.",
      features: ["Board Examination Drills", "Specialized Physics/Chem Labs", "Olympiad & Quiz Mentorship", "Career Counselling"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFF]">
      <TopBar onOpenPortalModal={(role) => setPortalModal({ isOpen: true, role })} />
      <Navbar onOpenPortalModal={(role) => setPortalModal({ isOpen: true, role })} />

      <div className="bg-[#082D68] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#F5AE25] hover:underline mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Academic Excellence & Curriculum
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
            A balanced, future-focused pedagogical framework combining rigorous academics with creative exploration.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-10">
        {/* Wings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wings.map((wing) => (
            <div
              key={wing.title}
              id={wing.id}
              className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex flex-col justify-between scroll-mt-24"
            >
              <div>
                <span className="px-2.5 py-1 rounded-full bg-[#EAF3FF] text-[#082D68] text-[11px] font-bold uppercase tracking-wider">
                  {wing.badge}
                </span>
                <h3 className="font-heading font-bold text-xl text-[#082D68] mt-3 mb-2">
                  {wing.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {wing.desc}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4">
                  {wing.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1554B8] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/admission"
                  className="w-full inline-flex items-center justify-center py-2 rounded-xl bg-[#082D68] hover:bg-[#062352] text-white text-xs font-semibold transition"
                >
                  Apply for this Level
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Routine & Timetable Banner */}
        <div id="routine" className="scroll-mt-24 bg-[#EAF3FF] rounded-2xl p-6 sm:p-8 border border-[#D0E2FF] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#082D68] text-white flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-[#F5AE25]" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-[#082D68]">
                Academic Routine & Examination Timetable 2026
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                Download the official class timetables, teacher office hours, and semester schedules.
              </p>
            </div>
          </div>
          <Link
            href="/notices"
            className="px-5 py-2.5 rounded-full bg-[#082D68] text-white text-xs font-bold whitespace-nowrap hover:bg-[#062352] transition shadow"
          >
            Download Exam Routine
          </Link>
        </div>

        {/* Academic Calendar Section */}
        <div id="calendar" className="scroll-mt-24 bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#1554B8]" />
            <h3 className="font-heading font-bold text-xl text-[#082D68]">
              Academic Calendar & Term Schedules (2026-27)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Key milestone dates, term commencement dates, parent-teacher meetings, and examination schedules.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#F7FAFF] border border-slate-100">
              <span className="text-[11px] font-bold uppercase text-[#1554B8]">First Term</span>
              <h4 className="font-bold text-[#082D68] text-sm mt-1 mb-2">Jan 10 – Apr 25, 2026</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Term Induction & Book Day</li>
                <li>• Mid-Term Assessments (Feb 20-28)</li>
                <li>• Spring Cultural Week & Sports Day</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#F7FAFF] border border-slate-100">
              <span className="text-[11px] font-bold uppercase text-[#1554B8]">Mid Term</span>
              <h4 className="font-bold text-[#082D68] text-sm mt-1 mb-2">May 15 – Aug 20, 2026</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Science & Robotics Olympiad</li>
                <li>• Half-Yearly Examinations</li>
                <li>• Parent-Teacher Conference (PTM)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#F7FAFF] border border-slate-100">
              <span className="text-[11px] font-bold uppercase text-[#1554B8]">Final Term</span>
              <h4 className="font-bold text-[#082D68] text-sm mt-1 mb-2">Sep 01 – Dec 15, 2026</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Annual Art & Literature Fest</li>
                <li>• Annual Board Preparatory Mocks</li>
                <li>• Annual Final Examination (Nov 15)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <PortalLoginModal
        isOpen={portalModal.isOpen}
        initialRole={portalModal.role}
        onClose={() => setPortalModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
