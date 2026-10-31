"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Lock,
  User,
  CheckCircle2,
  Calendar,
  Award,
  CreditCard,
  Bell,
  Clock,
  LogOut,
  Sparkles,
  Download,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type PortalTab = "overview" | "academics" | "fees" | "attendance";

export default function PortalPage() {
  const params = useParams();
  const role = (params?.role as string) || "student";
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<PortalTab>("overview");

  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleQuickDemo = () => {
    setIdentifier(`${role}@morningglory.edu.bd`);
    setPassword("mgs2026");
    setIsLoggedIn(true);
  };

  const displayName = identifier ? identifier.split("@")[0].replace(/[._]/g, " ").toUpperCase() : "ISRAT JAHAN";

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFF]">
      <TopBar />
      <Navbar />

      {/* Header Banner */}
      <div className="bg-[#082D68] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#F5AE25] hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-[#F5AE25]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5AE25]">
                Morning Glory Portal
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {roleName} Dashboard
            </h1>
          </div>

          {isLoggedIn && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white">{displayName}</div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Active Session
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLoggedIn(false)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {!isLoggedIn ? (
          /* Login Form */
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-5">
              <div className="text-center pb-2 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-[#EAF3FF] text-[#082D68] flex items-center justify-center mx-auto mb-2 border border-[#D0E2FF]">
                  <User className="w-7 h-7 text-[#1554B8]" />
                </div>
                <h2 className="font-heading font-bold text-xl text-[#082D68]">
                  Sign In to {roleName} Portal
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Access your grades, attendance, class schedules, and notices
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    {roleName} ID or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      role === "student"
                        ? "e.g. isratjahaan2003@gmail.com"
                        : role === "parent"
                        ? "e.g. parent@example.com"
                        : "e.g. teacher@morningglory.edu.bd"
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Password
                    </label>
                    <span className="text-xs text-[#1554B8] cursor-pointer hover:underline">
                      Forgot Password?
                    </span>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your security password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#082D68] hover:bg-[#062352] text-white font-semibold text-sm shadow transition flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Lock className="w-4 h-4 text-[#F5AE25]" />
                  <span>Sign In as {roleName}</span>
                </button>
              </form>

              {/* Quick One-Click Demo Login */}
              <div className="pt-4 border-t border-slate-100 text-center space-y-2">
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="w-full py-2.5 rounded-xl bg-[#EAF3FF] hover:bg-[#D8EAFF] text-[#082D68] text-xs font-bold transition flex items-center justify-center gap-1.5 border border-[#D0E2FF]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5AE25]" />
                  <span>1-Click Instant Demo Login</span>
                </button>
                <p className="text-[11px] text-slate-400">
                  Instant preview without typing any credentials
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="space-y-6 animate-fade-in">
            {/* Top User Summary Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#082D68] text-white font-heading font-extrabold text-2xl flex items-center justify-center border-2 border-white shadow">
                  {displayName.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading font-extrabold text-xl text-[#082D68]">
                      {displayName}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                      Verified {roleName}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>ID: <strong className="text-slate-700">MGS-2026-0842</strong></span>
                    <span>Class: <strong className="text-slate-700">Class 8 (Section A)</strong></span>
                    <span>Session: <strong className="text-slate-700">2026-2027</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2.5 rounded-2xl bg-[#EAF3FF] border border-[#D0E2FF] text-center">
                  <div className="text-[11px] text-slate-500 font-medium">Attendance</div>
                  <div className="font-heading font-extrabold text-lg text-[#082D68]">96.4%</div>
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <div className="text-[11px] text-slate-500 font-medium">Term GPA</div>
                  <div className="font-heading font-extrabold text-lg text-[#D97706]">5.00 (A+)</div>
                </div>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
              {[
                { id: "overview", label: "Overview & Routine", icon: Clock },
                { id: "academics", label: "Term Grades & Report", icon: Award },
                { id: "fees", label: "Tuition Fees & Payments", icon: CreditCard },
                { id: "attendance", label: "Attendance Record", icon: Calendar },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as PortalTab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                      isActive
                        ? "bg-[#082D68] text-white shadow-xs font-bold"
                        : "bg-white text-slate-600 hover:bg-[#EAF3FF] hover:text-[#082D68] border border-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Today's Schedule */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-4">
                  <h3 className="font-heading font-bold text-base text-[#082D68] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1554B8]" />
                    <span>Today&apos;s Class Schedule (Sunday)</span>
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    {[
                      { period: "08:30 - 09:20", subject: "English Language & Composition", teacher: "Mrs. Fahmida Yasmin", room: "Room 302" },
                      { period: "09:25 - 10:15", subject: "General Mathematics", teacher: "Mrs. Nusrat Jahan", room: "Room 302" },
                      { period: "10:20 - 11:10", subject: "Physics (Optics & Mechanics)", teacher: "Mr. Tanvir Ahmed", room: "Physics Lab" },
                      { period: "11:15 - 11:45", subject: "Recess / Tiffin Break", teacher: "Campus Cafeteria", room: "Playground" },
                      { period: "11:50 - 12:40", subject: "ICT & Python Coding Lab", teacher: "Engr. Arifur Rahman", room: "Robotics Hub" },
                    ].map((c) => (
                      <div key={c.period} className="flex items-center justify-between p-3 rounded-2xl bg-[#F7FAFF] border border-slate-100 hover:bg-[#EAF3FF] transition">
                        <div>
                          <div className="font-bold text-[#082D68] text-sm">{c.subject}</div>
                          <div className="text-slate-500 mt-0.5">{c.teacher} • {c.room}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-white font-bold text-[#082D68] border border-slate-200">
                          {c.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Portal Announcements */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-4">
                  <h3 className="font-heading font-bold text-base text-[#082D68] flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#F5AE25]" />
                    <span>Student Notifications</span>
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
                      <div className="font-bold text-sm">Admit Card Distribution</div>
                      <p className="mt-1 leading-relaxed">Collect Annual Examination admit card from the school registry counter by Nov 8.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#EAF3FF] border border-[#D0E2FF] text-[#082D68]">
                      <div className="font-bold text-sm">Robotics Workshop</div>
                      <p className="mt-1 leading-relaxed">Inter-House robotics practice sessions scheduled every Tuesday at 3:30 PM.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "academics" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#082D68]">
                      Term Academic Performance Record
                    </h3>
                    <p className="text-xs text-slate-500">Official statement of semester grades and teacher evaluations</p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#082D68] text-white text-xs font-semibold hover:bg-[#062352] transition shadow"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F5AE25]" />
                    <span>Download Term Grade Card</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 text-[11px] uppercase tracking-wider">
                        <th className="py-2.5">Subject</th>
                        <th className="py-2.5 text-center">Marks (100)</th>
                        <th className="py-2.5 text-center">Grade Point</th>
                        <th className="py-2.5 text-right">Letter Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: "English Language Arts", marks: 92, gp: "5.00", grade: "A+" },
                        { name: "General Mathematics", marks: 98, gp: "5.00", grade: "A+" },
                        { name: "General Science (Physics, Chem, Bio)", marks: 94, gp: "5.00", grade: "A+" },
                        { name: "Information & Communication Technology", marks: 96, gp: "5.00", grade: "A+" },
                        { name: "Bangladesh & Global Studies", marks: 88, gp: "4.00", grade: "A" },
                      ].map((sub) => (
                        <tr key={sub.name} className="hover:bg-slate-50">
                          <td className="py-3 font-medium text-[#172B4D]">{sub.name}</td>
                          <td className="py-3 text-center font-bold text-slate-700">{sub.marks}</td>
                          <td className="py-3 text-center font-bold text-slate-700">{sub.gp}</td>
                          <td className="py-3 text-right font-bold text-emerald-600">{sub.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "fees" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#082D68]">
                      Tuition & Session Fee Billing
                    </h3>
                    <p className="text-xs text-slate-500">Pay school fees securely via bKash, Nagad, or Credit/Debit Card</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[11px] font-bold uppercase text-emerald-700">Paid Invoice</span>
                    <h4 className="font-bold text-[#082D68] text-base mt-1">October 2026 Tuition Fee</h4>
                    <div className="text-xs text-slate-600 mt-1">Amount: BDT 3,500 • Paid via bKash</div>
                    <div className="mt-3 text-xs font-semibold text-emerald-700">Status: Completed (Receipt #REC-8421)</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#EAF3FF] border border-[#D0E2FF] flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-[#1554B8]">Upcoming Due</span>
                      <h4 className="font-bold text-[#082D68] text-base mt-1">November 2026 Tuition & Exam Fee</h4>
                      <div className="text-xs text-slate-600 mt-1">Amount: BDT 4,200 • Due Date: Nov 10, 2026</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert("Redirecting to Morning Glory SSLCommerz / bKash Secure Payment Gateway...")}
                      className="mt-4 px-4 py-2 rounded-xl bg-[#082D68] text-white text-xs font-semibold hover:bg-[#062352] transition w-full sm:w-auto"
                    >
                      Pay Now Online (bKash / Card)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-4">
                <h3 className="font-heading font-bold text-lg text-[#082D68]">
                  Monthly Attendance Summary (2026)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-4 rounded-2xl bg-[#F7FAFF] border border-slate-100">
                    <div className="text-xs text-slate-400">Total Working Days</div>
                    <div className="font-extrabold text-xl text-[#082D68] mt-1">180 Days</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div className="text-xs text-emerald-600 font-semibold">Days Present</div>
                    <div className="font-extrabold text-xl text-emerald-800 mt-1">173 Days</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                    <div className="text-xs text-rose-600 font-semibold">Days Absent</div>
                    <div className="font-extrabold text-xl text-rose-800 mt-1">7 Days</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <div className="text-xs text-amber-700 font-semibold">Leave on Record</div>
                    <div className="font-extrabold text-xl text-amber-800 mt-1">5 Days</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
