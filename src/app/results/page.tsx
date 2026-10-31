"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Search,
  Download,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortalLoginModal } from "@/components/modals/PortalLoginModal";

export default function ResultsPage() {
  const [portalModal, setPortalModal] = useState<{
    isOpen: boolean;
    role: "student" | "parent" | "teacher";
  }>({ isOpen: false, role: "student" });

  const [studentId, setStudentId] = useState("");
  const [examType, setExamType] = useState("Annual Examination 2026");
  const [resultData, setResultData] = useState<{
    name: string;
    id: string;
    grade: string;
    gpa: string;
    subjects: { name: string; marks: number; grade: string }[];
  } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) return;

    // Simulate result fetch
    setResultData({
      name: "Tahmidur Rahman",
      id: studentId.toUpperCase(),
      grade: "Class 8 - Section A",
      gpa: "5.00 (A+)",
      subjects: [
        { name: "English Language & Literature", marks: 94, grade: "A+" },
        { name: "General Mathematics", marks: 98, grade: "A+" },
        { name: "General Science (Physics, Chem, Bio)", marks: 92, grade: "A+" },
        { name: "Information & Communication Technology", marks: 96, grade: "A+" },
        { name: "Social Science & World Geography", marks: 90, grade: "A+" },
      ],
    });
  };

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
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-[#F5AE25]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5AE25]">
              Examination Controller
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Academic Results & Grade Sheets
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
            Search and view official term examination results, GPA cards, and subject-wise score breakdowns.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-8 w-full">
        {/* Search Panel */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
          <h2 className="font-heading font-bold text-lg text-[#082D68] mb-4">
            Search Student Examination Result
          </h2>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-6">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Student ID / Roll Number
              </label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. MGS-2026-0421"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
              />
            </div>

            <div className="sm:col-span-6">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Examination Term
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68] bg-white"
              >
                <option>Annual Examination 2026</option>
                <option>Mid-Term Examination 2026</option>
                <option>First Term Assessment 2026</option>
              </select>
            </div>

            <div className="sm:col-span-12 pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#082D68] hover:bg-[#062352] text-white font-semibold text-sm shadow transition flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-[#F5AE25]" />
                <span>Search Grade Sheet</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results Display */}
        {resultData && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400">Statement of Grades</span>
                <h3 className="font-heading font-bold text-xl text-[#082D68]">{resultData.name}</h3>
                <div className="text-xs text-slate-600 mt-0.5">
                  ID: <span className="font-semibold text-slate-800">{resultData.id}</span> | Class: {resultData.grade}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Overall GPA</span>
                <span className="text-2xl font-black text-[#1554B8] font-heading">{resultData.gpa}</span>
              </div>
            </div>

            {/* Subject Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5">Subject</th>
                    <th className="py-2.5 text-center">Marks Obtained</th>
                    <th className="py-2.5 text-right">Letter Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {resultData.subjects.map((s) => (
                    <tr key={s.name} className="hover:bg-slate-50">
                      <td className="py-3 font-medium text-[#172B4D]">{s.name}</td>
                      <td className="py-3 text-center font-bold text-slate-700">{s.marks}</td>
                      <td className="py-3 text-right font-bold text-emerald-600">{s.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#082D68] text-white text-xs font-semibold hover:bg-[#062352] transition shadow"
              >
                <Download className="w-3.5 h-3.5 text-[#F5AE25]" />
                <span>Print Official Grade Sheet</span>
              </button>
            </div>
          </div>
        )}
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
