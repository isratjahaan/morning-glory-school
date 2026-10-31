"use client";

import React from "react";
import { X, Calendar, Download, Printer, Tag, CheckCircle2 } from "lucide-react";
import { NoticeItem } from "@/types";

interface NoticeDetailModalProps {
  notice: NoticeItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NoticeDetailModal({
  notice,
  isOpen,
  onClose,
}: NoticeDetailModalProps) {
  if (!isOpen || !notice) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#06275B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1554B8] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#F5AE25]" />
              {notice.category}
            </span>
            <span className="text-white/60 text-xs flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Published: {notice.formattedDate}
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl text-white leading-snug">
            {notice.title}
          </h3>
        </div>

        {/* Notice Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="p-4 rounded-xl bg-[#EAF3FF] border border-[#D0E2FF] text-[#082D68] text-sm font-medium">
            {notice.summary}
          </div>

          <div className="prose prose-sm text-slate-700 leading-relaxed space-y-3">
            <p>{notice.content}</p>
            <div className="p-4 rounded-xl bg-[#F7FAFF] border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-[#082D68] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Official Notification
              </div>
              <p>Issued under the authority of the Morning Glory School Academic & Examination Directorate.</p>
              <p className="text-[11px] text-slate-400">Reference: MGS/NOTICE/2026-{notice.id.slice(-4).toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 bg-[#F7FAFF] border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              Print Notice
            </button>
            <button
              onClick={() => alert(`Downloading official PDF copy for: ${notice.title}`)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#082D68] hover:bg-slate-50 transition"
            >
              <Download className="w-3.5 h-3.5 text-[#1554B8]" />
              Download Circular
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#082D68] text-white text-xs font-semibold hover:bg-[#062352] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
