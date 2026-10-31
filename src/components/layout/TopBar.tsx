"useux";
"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, User, Shield } from "lucide-react";
import { SCHOOL_INFO } from "@/config/school";
import { PORTAL_LINKS } from "@/config/navigation";

interface TopBarProps {
  onOpenPortalModal?: (role: "student" | "parent" | "teacher") => void;
}

export function TopBar({ onOpenPortalModal }: TopBarProps) {
  return (
    <div className="w-full bg-[#06275B] text-white/90 text-[12px] sm:text-[13px] border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Contact Details */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-1">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#F5AE25] shrink-0" />
            <span>{SCHOOL_INFO.address}</span>
          </div>

          <a
            href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 hover:text-[#F5AE25] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#F5AE25] shrink-0" />
            <span>{SCHOOL_INFO.phone}</span>
          </a>

          <a
            href={`mailto:${SCHOOL_INFO.email}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-[#F5AE25] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#F5AE25] shrink-0" />
            <span>{SCHOOL_INFO.email}</span>
          </a>
        </div>

        {/* Right: Portals Login & Admin Panel */}
        <div className="flex items-center divide-x divide-white/20 text-[11px] sm:text-[12px] font-medium">
          {PORTAL_LINKS.map((portal) => (
            <button
              key={portal.role}
              type="button"
              onClick={() => onOpenPortalModal?.(portal.role as "student" | "parent" | "teacher")}
              className="px-2.5 sm:px-3 hover:text-[#F5AE25] transition-colors first:pl-0 flex items-center gap-1 group"
              title={`Open ${portal.label}`}
            >
              <User className="w-3 h-3 text-white/60 group-hover:text-[#F5AE25] transition-colors" />
              <span>{portal.label}</span>
            </button>
          ))}

          <Link
            href="/admin"
            className="px-2.5 sm:px-3 text-[#F5AE25] hover:text-white transition-colors flex items-center gap-1 font-bold"
            title="Open School Administration Panel"
          >
            <Shield className="w-3 h-3 text-[#F5AE25]" />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
