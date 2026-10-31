"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Shield, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { isFirebaseConfigured } from "@/lib/firebase/config";

export default function PortalPage() {
  const params = useParams();
  const role = (params?.role as string) || "student";
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{ type: "info" | "success"; text: string } | null>(null);

  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isConfigured = isFirebaseConfigured();
    if (!isConfigured) {
      setStatus({
        type: "info",
        text: `The ${roleName} portal is initialized in standby mode. Firebase architecture is ready for live authentication credentials.`,
      });
    } else {
      setStatus({
        type: "success",
        text: `Authenticating ${roleName} profile securely...`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFF]">
      <TopBar />
      <Navbar />

      <div className="bg-[#082D68] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#F5AE25] hover:underline mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-[#F5AE25]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5AE25]">
              Secure Portal
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            {roleName} Portal Sign In
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
            Access internal grades, attendance, class schedules, and departmental notices.
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-12 flex-1 w-full">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-5">
          <div className="text-center pb-2 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-[#EAF3FF] text-[#082D68] flex items-center justify-center mx-auto mb-2">
              <User className="w-6 h-6 text-[#1554B8]" />
            </div>
            <h2 className="font-heading font-bold text-lg text-[#082D68]">
              {roleName} Authentication
            </h2>
            <p className="text-xs text-slate-500">Enter your credentials to enter the secure session</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                {roleName} ID / Username
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={`Enter your ${role} identifier`}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
              />
            </div>

            {status && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-blue-50 text-blue-800 border border-blue-200"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                )}
                <div>{status.text}</div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#082D68] hover:bg-[#062352] text-white font-semibold text-sm shadow transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#F5AE25]" />
              <span>Sign In to {roleName} Gateway</span>
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-400">
            Having trouble accessing? Contact IT support at <span className="text-[#082D68] font-medium">info@morningglory.edu.bd</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
