"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Image as ImageIcon, X, ZoomIn, Sparkles } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortalLoginModal } from "@/components/modals/PortalLoginModal";

export default function GalleryPage() {
  const [portalModal, setPortalModal] = useState<{
    isOpen: boolean;
    role: "student" | "parent" | "teacher";
  }>({ isOpen: false, role: "student" });

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<{
    title: string;
    category: string;
    image: string;
    description?: string;
  } | null>(null);

  const galleryItems = [
    {
      title: "Annual Sports & Athletics Football Championship",
      category: "Sports",
      image: "/images/gallery/sports-football-hd.jpg",
      description: "Students actively competing on the school grounds during the Annual Inter-House Football League.",
      featured: true,
    },
    {
      title: "Interactive Smart Classroom & Digital Projection Hub",
      category: "Interactive Classroom",
      image: "/images/gallery/interactive-classroom-hd.jpg",
      description: "State-of-the-art classroom equipped with interactive digital smart boards, multimedia projection, and ergonomic student workstations.",
      featured: true,
    },
    {
      title: "Morning Glory Modern Campus Architecture",
      category: "Campus",
      image: "/images/campus/about-campus-2x.jpg",
      description: "Main institutional academic building surrounded by landscaped gardens and modern safety infrastructure.",
      featured: false,
    },
    {
      title: "Scholars Celebrating Academic Distinction",
      category: "Students",
      image: "/images/students/hero-students-2x.jpg",
      description: "Morning Glory students proudly wearing their school uniform outside the campus building.",
      featured: false,
    },
  ];

  const filterCategories = [
    { label: "All Photos", key: "All" },
    { label: "Sports & Athletics", key: "Sports" },
    { label: "Interactive Classroom", key: "Interactive Classroom" },
    { label: "Campus Infrastructure", key: "Campus" },
    { label: "Student Life", key: "Students" },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter === "All") return true;
    return item.category === activeFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFF]">
      <TopBar onOpenPortalModal={(role) => setPortalModal({ isOpen: true, role })} />
      <Navbar onOpenPortalModal={(role) => setPortalModal({ isOpen: true, role })} />

      {/* Hero Banner */}
      <div className="bg-[#082D68] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#F5AE25] hover:underline mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <ImageIcon className="w-5 h-5 text-[#F5AE25]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5AE25]">
              Visual Showcase
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Campus Life & Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            A vibrant glimpse into life at Morning Glory School — athletics tournaments, interactive smart classrooms, academic celebrations, and campus infrastructure.
          </p>
        </div>
      </div>

      {/* Main Gallery Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {filterCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeFilter === cat.key
                  ? "bg-[#082D68] text-white shadow-sm font-bold"
                  : "bg-white text-slate-600 hover:bg-[#EAF3FF] hover:text-[#082D68] border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(item)}
              className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-100 group cursor-pointer hover:border-[#1554B8]/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Category Pill Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#082D68]/85 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F5AE25] text-[#082D68] text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                {/* Hover Zoom Indicator */}
                <div className="absolute inset-0 bg-[#082D68]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white text-[#082D68] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="font-heading font-bold text-lg text-[#082D68] group-hover:text-[#1554B8] transition-colors leading-snug">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#1554B8] font-semibold">
                  <span>Click to view full photo</span>
                  <span className="p-1 rounded-md bg-[#EAF3FF] text-[#082D68] group-hover:bg-[#082D68] group-hover:text-white transition">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#06275B] text-white">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1554B8] text-[11px] font-bold uppercase text-white">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-heading font-bold text-base text-white">
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo View */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950">
              <Image
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Bottom Caption */}
            {selectedPhoto.description && (
              <div className="px-6 py-4 bg-[#F7FAFF] border-t border-slate-100 flex items-center justify-between gap-4 text-xs sm:text-sm text-slate-700">
                <p>{selectedPhoto.description}</p>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 rounded-lg bg-[#082D68] text-white text-xs font-semibold hover:bg-[#062352] transition shrink-0"
                >
                  Close Preview
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      <PortalLoginModal
        isOpen={portalModal.isOpen}
        initialRole={portalModal.role}
        onClose={() => setPortalModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
