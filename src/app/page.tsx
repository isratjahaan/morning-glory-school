"use client";

import React, { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { HighlightsBar } from "@/components/home/HighlightsBar";
import { LowerGridSection } from "@/components/home/LowerGridSection";
import { QuickAccessSection } from "@/components/home/QuickAccessSection";
import { CampusTourModal } from "@/components/modals/CampusTourModal";
import { PortalLoginModal } from "@/components/modals/PortalLoginModal";
import { NoticeDetailModal } from "@/components/modals/NoticeDetailModal";
import { NoticeItem } from "@/types";

export default function HomePage() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [portalModalState, setPortalModalState] = useState<{
    isOpen: boolean;
    role: "student" | "parent" | "teacher";
  }>({
    isOpen: false,
    role: "student",
  });
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const handleOpenPortal = (role: "student" | "parent" | "teacher") => {
    setPortalModalState({
      isOpen: true,
      role,
    });
  };

  const handleClosePortal = () => {
    setPortalModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F7FAFF]">
      {/* 1. Top Contact & Portal Bar */}
      <TopBar onOpenPortalModal={handleOpenPortal} />

      {/* 2. Main Sticky Navigation */}
      <Navbar onOpenPortalModal={handleOpenPortal} />

      {/* 3. Hero Section */}
      <HeroSection onOpenTourModal={() => setIsTourModalOpen(true)} />

      {/* 4. Overlapping Highlights Feature Bar */}
      <HighlightsBar />

      {/* 5. Lower Section: About Our School + Achievements & Latest Notice */}
      <LowerGridSection onSelectNotice={(notice) => setSelectedNotice(notice)} />

      {/* 6. Quick Access 7 Pastel Tiles */}
      <QuickAccessSection />

      {/* 7. Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CampusTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />

      <PortalLoginModal
        isOpen={portalModalState.isOpen}
        initialRole={portalModalState.role}
        onClose={handleClosePortal}
      />

      <NoticeDetailModal
        notice={selectedNotice}
        isOpen={Boolean(selectedNotice)}
        onClose={() => setSelectedNotice(null)}
      />
    </main>
  );
}
