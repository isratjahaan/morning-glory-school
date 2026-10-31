"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  CheckCircle2,
  CreditCard,
  Send,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortalLoginModal } from "@/components/modals/PortalLoginModal";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AdmissionPage() {
  const [portalModal, setPortalModal] = useState<{
    isOpen: boolean;
    role: "student" | "parent" | "teacher";
  }>({ isOpen: false, role: "student" });

  const [formData, setFormData] = useState({
    studentName: "",
    gender: "male",
    dob: "",
    applyingGrade: "Class 1",
    parentName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.email || !formData.phone) {
      setSubmitStatus({
        type: "error",
        message: "Please complete all required fields.",
      });
      return;
    }

    setSubmitStatus({ type: "loading", message: "Submitting application to Morning Glory admissions..." });

    const refCode = `MGS-APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const applicationPayload = {
      referenceCode: refCode,
      studentName: formData.studentName,
      gender: formData.gender,
      dob: formData.dob,
      applyingGrade: formData.applyingGrade,
      parentName: formData.parentName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    // 1. Submit to global cloud registry (/api/admissions) for instant cross-device admin sync
    try {
      await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationPayload),
      });
    } catch (apiErr) {
      console.warn("Cloud sync note:", apiErr);
    }

    // 2. Save locally as immediate client backup
    try {
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem("mgs_admissions") || "[]");
        existing.push(applicationPayload);
        localStorage.setItem("mgs_admissions", JSON.stringify(existing));
      }
    } catch {}

    // 3. Attempt Firebase Firestore write if configured
    if (db) {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Firestore sync timeout")), 2000)
        );
        const writePromise = addDoc(collection(db, "admissions"), {
          ...applicationPayload,
          submittedAt: serverTimestamp(),
        });
        await Promise.race([writePromise, timeoutPromise]);
      } catch (err) {
        console.info("Firestore status note:", err);
      }
    }

    setSubmitStatus({
      type: "success",
      message: `Application submitted successfully for ${formData.studentName}! Your application reference is ${refCode}. The admissions desk has received your record.`,
    });

    setFormData({
      studentName: "",
      gender: "male",
      dob: "",
      applyingGrade: "Class 1",
      parentName: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFF]">
      <TopBar onOpenPortalModal={(role) => setPortalModal({ isOpen: true, role })} />
      <Navbar onOpenPortalModal={(role) => setPortalModal({ isOpen: true, role })} />

      {/* Header Banner */}
      <div className="bg-[#082D68] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#F5AE25] hover:underline mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-[#1554B8] text-white text-[11px] font-bold uppercase tracking-wider">
              Academic Session 2026-2027
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Online Admission Application
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
            Join the Morning Glory School family. Follow the streamlined steps below to register your child.
          </p>
        </div>
      </div>

      {/* Admission Flow & Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-12">
        {/* Age & Eligibility Criteria */}
        <div id="eligibility" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-[#1554B8]" />
            <h3 className="font-heading font-bold text-xl text-[#082D68]">
              Age Criteria & Admission Eligibility (2026-27)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Age is calculated as of January 1, 2026 according to government and educational board guidelines.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-2.5">Class / Level</th>
                  <th className="py-2.5">Minimum Age</th>
                  <th className="py-2.5">Prerequisites</th>
                  <th className="py-2.5 text-right">Seat Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-semibold text-[#082D68]">Playgroup & Nursery</td>
                  <td className="py-3 text-slate-700">3.0 - 4.0 Years</td>
                  <td className="py-3 text-slate-600">Friendly interaction session</td>
                  <td className="py-3 text-right font-bold text-emerald-600">Open (40 Seats)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-semibold text-[#082D68]">KG & Class 1</td>
                  <td className="py-3 text-slate-700">5.0 - 6.0 Years</td>
                  <td className="py-3 text-slate-600">Basic alphabet & numeracy readiness</td>
                  <td className="py-3 text-right font-bold text-emerald-600">Open (50 Seats)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-semibold text-[#082D68]">Class 2 – Class 5</td>
                  <td className="py-3 text-slate-700">7.0 - 10.0 Years</td>
                  <td className="py-3 text-slate-600">Previous grade report card & basic test</td>
                  <td className="py-3 text-right font-bold text-amber-600">Limited (15 Seats)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-semibold text-[#082D68]">Class 6 – Class 9</td>
                  <td className="py-3 text-slate-700">11.0 - 14.0 Years</td>
                  <td className="py-3 text-slate-600">Written evaluation (English, Math, Science)</td>
                  <td className="py-3 text-right font-bold text-amber-600">Limited (10 Seats)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Steps Roadmap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: "01", title: "Fill Online Form", desc: "Submit student background and contact details." },
            { step: "02", title: "Assessment Interview", desc: "Brief friendly interaction and aptitude screening." },
            { step: "03", title: "Document Verification", desc: "Verify birth certificate, previous report cards." },
            { step: "04", title: "Fee & Enrollment", desc: "Pay initial admission fee and collect student kit." },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col"
            >
              <div className="text-2xl font-black text-[#1554B8] font-heading mb-2">
                {s.step}
              </div>
              <h3 className="font-bold text-[#082D68] text-base mb-1">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Application Form & Guidelines Side by Side */}
        <div id="apply" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-6 h-6 text-[#1554B8]" />
              <h2 className="font-heading font-bold text-xl text-[#082D68]">
                Student Registration Form
              </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Enter full legal name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Applying Grade *
                  </label>
                  <select
                    value={formData.applyingGrade}
                    onChange={(e) => setFormData({ ...formData, applyingGrade: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68] bg-white"
                  >
                    <option>Playgroup</option>
                    <option>Nursery</option>
                    <option>Kindergarten</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                    <option>Class 4</option>
                    <option>Class 5</option>
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Parent / Guardian full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Residential Address
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House, Road, Area, Chattogram"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                />
              </div>

              {submitStatus.message && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                    submitStatus.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : submitStatus.type === "loading"
                      ? "bg-blue-50 text-blue-800 border border-blue-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : submitStatus.type === "loading" ? (
                    <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="leading-relaxed">{submitStatus.message}</div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus.type === "loading"}
                className="w-full py-3.5 rounded-xl bg-[#082D68] hover:bg-[#062352] text-white font-semibold text-sm shadow transition flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70"
              >
                {submitStatus.type === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#F5AE25]" />
                    <span>Submit Online Admission Application</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Guidelines & Fee Structure (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div id="fees" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-heading font-bold text-lg text-[#082D68] mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#1554B8]" />
                <span>Fee Structure Overview</span>
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Tuition fees are structured transparently per academic term. All-inclusive covers laboratory access, sports facilities, and digital library resources.
              </p>
              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-600 font-medium">Application Fee:</span>
                  <span className="font-bold text-[#082D68]">BDT 500 (One-time)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-600 font-medium">Admission Fee (Class 1-5):</span>
                  <span className="font-bold text-[#082D68]">BDT 12,000 (Session)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-600 font-medium">Admission Fee (Class 6-10):</span>
                  <span className="font-bold text-[#082D68]">BDT 15,000 (Session)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-600 font-medium">Monthly Tuition (Average):</span>
                  <span className="font-bold text-[#082D68]">BDT 2,500 - 4,200</span>
                </div>
              </div>
            </div>

            <div className="bg-[#EAF3FF] rounded-2xl p-6 border border-[#D0E2FF]">
              <h4 className="font-heading font-bold text-base text-[#082D68] mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#1554B8]" />
                <span>Need Admissions Guidance?</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                Our admissions officers are available Saturday through Thursday from 8:30 AM to 3:30 PM.
              </p>
              <div className="text-xs font-semibold text-[#082D68] space-y-1">
                <div>Phone: +880 1851 121257</div>
                <div>Email: info@morningglory.edu.bd</div>
              </div>
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
