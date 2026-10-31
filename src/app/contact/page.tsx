"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortalLoginModal } from "@/components/modals/PortalLoginModal";
import { SCHOOL_INFO } from "@/config/school";

export default function ContactPage() {
  const [portalModal, setPortalModal] = useState<{
    isOpen: boolean;
    role: "student" | "parent" | "teacher";
  }>({ isOpen: false, role: "student" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill in your name, email, and message.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Sending your message..." });

    setTimeout(() => {
      setStatus({
        type: "success",
        message:
          "Thank you for contacting Morning Glory School! Our administrative office will review your inquiry and respond within 24 business hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 600);
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
            <Mail className="w-5 h-5 text-[#F5AE25]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5AE25]">
              Get in Touch
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Contact Morning Glory School
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
            We are here to assist with admissions, academic queries, campus tours, and administrative services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-slate-100 space-y-5">
              <h3 className="font-heading font-bold text-xl text-[#082D68]">
                Administrative Office
              </h3>

              <div className="flex items-start gap-3 text-sm text-slate-700">
                <MapPin className="w-5 h-5 text-[#1554B8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#082D68]">Campus Address</div>
                  <div>{SCHOOL_INFO.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-700">
                <Phone className="w-5 h-5 text-[#1554B8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#082D68]">Admissions Hotline</div>
                  <div>{SCHOOL_INFO.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-700">
                <Mail className="w-5 h-5 text-[#1554B8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#082D68]">Official Email</div>
                  <div>{SCHOOL_INFO.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-700">
                <Clock className="w-5 h-5 text-[#1554B8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#082D68]">Visiting Hours</div>
                  <div>Saturday – Thursday: 8:00 AM – 3:30 PM</div>
                  <div className="text-xs text-slate-400">Friday: Closed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
            <h3 className="font-heading font-bold text-xl text-[#082D68] mb-4">
              Send an Official Enquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mohammad Karim"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="karim@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Subject Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68] bg-white"
                  >
                    <option>General Inquiry</option>
                    <option>Admission 2026-27</option>
                    <option>Fee Structure & Payment</option>
                    <option>Campus Visit Request</option>
                    <option>Career Opportunities</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                />
              </div>

              {status.message && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-start gap-2 ${
                    status.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>{status.message}</div>
                </div>
              )}

              <button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#082D68] hover:bg-[#062352] text-white font-semibold text-sm shadow transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#F5AE25]" />
                <span>Submit Inquiry</span>
              </button>
            </form>
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
