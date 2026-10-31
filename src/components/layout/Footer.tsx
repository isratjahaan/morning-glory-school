"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SCHOOL_INFO } from "@/config/school";
import { FOOTER_QUICK_LINKS } from "@/config/navigation";

// Crisp SVG Brand Icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setSubscribeStatus({ type: "loading", message: "Registering..." });

    setTimeout(() => {
      setSubscribeStatus({
        type: "success",
        message:
          "Thank you for subscribing! You will receive the Morning Glory monthly academic bulletin.",
      });
      setEmail("");
    }, 600);
  };

  return (
    <footer className="w-full bg-[#06275B] text-white pt-14 pb-8 border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/15">
          {/* Column 1: School Branding (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-auto min-w-[130px]">
                <Image
                  src="/images/school-logo-white.png"
                  alt="Morning Glory School"
                  width={180}
                  height={56}
                  className="h-full w-auto object-contain filter drop-shadow"
                />
              </div>
            </div>

            <p className="text-sm text-slate-300/90 leading-relaxed max-w-sm">
              Morning Glory School is committed to academic excellence, moral integrity, and holistic personal growth, cultivating responsible global citizens for a brighter tomorrow.
            </p>

            <div className="pt-1 text-xs text-slate-400">
              <span className="text-[#F5AE25] font-semibold">Affiliation: </span>
              {SCHOOL_INFO.accreditation}
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-base text-white tracking-wide mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
              {FOOTER_QUICK_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#F5AE25] transition-colors py-1 flex items-center gap-1 group"
                >
                  <span className="text-white/30 group-hover:text-[#F5AE25] transition-colors text-xs">•</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Follow Us (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-base text-white tracking-wide mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-2.5">
              <a
                href={SCHOOL_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1554B8] hover:bg-[#114494] flex items-center justify-center text-white transition-all transform hover:scale-105 shadow-sm"
                aria-label="Facebook Page"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href={SCHOOL_INFO.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] flex items-center justify-center text-white transition-all transform hover:scale-105 shadow-sm"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>

              <a
                href={SCHOOL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0A66C2] hover:bg-[#084e96] flex items-center justify-center text-white transition-all transform hover:scale-105 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Stay connected with our campus life, achievements, and upcoming cultural festivals.
            </p>
          </div>

          {/* Column 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-base text-white tracking-wide mb-4">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-xs text-slate-300/90 mb-3 leading-relaxed">
              Receive term notices, examination routine updates, and parent advisories straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#172B4D] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5AE25] shadow-inner"
                />
                <button
                  type="submit"
                  disabled={subscribeStatus.type === "loading"}
                  className="px-5 py-2.5 rounded-xl bg-[#1554B8] hover:bg-[#114494] text-white font-semibold text-sm transition-all whitespace-nowrap shadow active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                </button>
              </div>

              {subscribeStatus.message && (
                <div
                  className={`text-xs p-2.5 rounded-lg flex items-start gap-1.5 mt-2 ${
                    subscribeStatus.type === "success"
                      ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                      : "bg-rose-950/60 text-rose-300 border border-rose-800"
                  }`}
                >
                  {subscribeStatus.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  )}
                  <span>{subscribeStatus.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © 2026 Morning Glory School. All Rights Reserved.
          </div>

          <div className="font-script text-base text-slate-300 tracking-wide italic">
            Together for a Better Tomorrow...
          </div>
        </div>
      </div>
    </footer>
  );
}
