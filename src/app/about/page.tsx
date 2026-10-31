"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Award,
  Compass,
  Users,
  Building2,
  Mail,
  GraduationCap,
  Sparkles,
  Quote,
  ShieldCheck,
  Cpu,
  FlaskConical,
  Library,
  Monitor,
  Trophy,
  Bus,
  HeartPulse,
  Utensils,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortalLoginModal } from "@/components/modals/PortalLoginModal";
import { PRINCIPAL_INFO, FACULTY_MEMBERS } from "@/config/faculty";
import { CAMPUS_FACILITIES } from "@/config/facilities";

type TabKey = "overview" | "principal" | "vision" | "faculty" | "facilities";

const facilityIconMap = {
  Cpu: Cpu,
  FlaskConical: FlaskConical,
  Library: Library,
  Monitor: Monitor,
  Trophy: Trophy,
  Bus: Bus,
  HeartPulse: HeartPulse,
  Utensils: Utensils,
};

export default function AboutPage() {
  const [portalModal, setPortalModal] = useState<{
    isOpen: boolean;
    role: "student" | "parent" | "teacher";
  }>({ isOpen: false, role: "student" });

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [selectedDept, setSelectedDept] = useState<string>("All");

  // Handle hash on mount and hash change
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["overview", "principal", "vision", "faculty", "facilities"].includes(hash)) {
        setActiveTab(hash as TabKey);
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const scrollToSection = (tabKey: TabKey) => {
    setActiveTab(tabKey);
    const el = document.getElementById(tabKey);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const departments = [
    "All",
    "Administration",
    "Science & STEM",
    "Mathematics",
    "Humanities & Languages",
    "Primary Wing",
    "Sports & Arts",
  ];

  const filteredFaculty = FACULTY_MEMBERS.filter(
    (f) => selectedDept === "All" || f.department === selectedDept
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFF]">
      <TopBar onOpenPortalModal={(role) => setPortalModal({ isOpen: true, role })} />
      <Navbar onOpenPortalModal={(role) => setPortalModal({ isOpen: true, role })} />

      {/* Hero Header Banner */}
      <div className="bg-[#082D68] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#F5AE25] hover:underline mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-[#1554B8] text-white text-[11px] font-bold uppercase tracking-wider">
              Institutional Profile
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            About Morning Glory School
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Empowering minds and enriching lives since 2011 with a tradition of holistic education, scholarly leadership, and moral character.
          </p>
        </div>
      </div>

      {/* Sticky Sub-navigation Tabs */}
      <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar text-xs sm:text-sm font-semibold">
            {[
              { id: "overview", label: "About Morning Glory", icon: Building2 },
              { id: "principal", label: "Principal's Message", icon: Award },
              { id: "vision", label: "Vision & Mission", icon: Compass },
              { id: "faculty", label: "Our Faculty", icon: Users },
              { id: "facilities", label: "Campus Facilities", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id as TabKey)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#082D68] text-white shadow-sm font-bold"
                      : "text-slate-600 hover:text-[#082D68] hover:bg-[#F7FAFF]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#F5AE25]" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-16">
        {/* 1. OVERVIEW SECTION */}
        <section id="overview" className="scroll-mt-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-card border border-slate-100">
                <span className="text-xs uppercase tracking-wider font-bold text-[#1554B8]">
                  Our Philosophy
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082D68] mt-1 mb-4 font-heading">
                  Learn • Grow • Excel
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-4">
                  Morning Glory School was established with a singular vision: to build an educational sanctuary where every child discovers their intellectual vigor, builds unwavering moral character, and nurtures global competence.
                </p>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-6">
                  With a balanced curriculum spanning sciences, humanities, interactive robotics, language arts, and athletic disciplines, we empower each student to realize their fullest human potential.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Holistic, inquiry-driven pedagogy</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Student-centered smart classrooms</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1:15 Teacher-to-student attention</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Global Olympiad & debate mentorship</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-card border border-white">
                <Image
                  src="/images/campus/about-campus-2x.jpg"
                  alt="Morning Glory Campus"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                <h4 className="font-bold text-[#082D68] text-base font-heading">Key Institutional Facts</h4>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-2.5">
                  <li className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Established:</span>
                    <span className="font-bold text-[#082D68]">2011 (15+ Years)</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Total Enrolled Scholars:</span>
                    <span className="font-bold text-[#082D68]">1,200+ Active Students</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Teaching Faculty:</span>
                    <span className="font-bold text-[#082D68]">100+ Expert Educators</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Board Exam Success Rate:</span>
                    <span className="font-bold text-emerald-600">95% Top Honors (A+/A)</span>
                  </li>
                  <li className="flex items-center justify-between py-1">
                    <span className="text-slate-500">Campus Security:</span>
                    <span className="font-bold text-[#082D68]">24/7 CCTV & Security Protocol</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PRINCIPAL'S MESSAGE SECTION */}
        <section id="principal" className="scroll-mt-36">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-100">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Principal Profile Card */}
              <div className="w-full lg:w-80 shrink-0 bg-[#EAF3FF] rounded-2xl p-6 border border-[#D0E2FF] flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 bg-[#082D68] flex items-center justify-center">
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#082D68] to-[#1554B8] text-white">
                    <GraduationCap className="w-12 h-12 text-[#F5AE25] mb-1" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Leadership</span>
                  </div>
                </div>

                <h3 className="font-heading font-extrabold text-xl text-[#082D68]">
                  {PRINCIPAL_INFO.name}
                </h3>
                <div className="text-xs font-semibold text-[#1554B8] mt-1">
                  {PRINCIPAL_INFO.title}
                </div>
                <div className="text-[11px] text-slate-600 mt-2">
                  {PRINCIPAL_INFO.qualification}
                </div>
                <div className="text-[11px] font-bold text-[#082D68] mt-1">
                  {PRINCIPAL_INFO.experience}
                </div>

                <div className="mt-5 pt-4 border-t border-[#D0E2FF] w-full text-center">
                  <a
                    href="mailto:principal@morningglory.edu.bd"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#082D68] hover:text-[#1554B8] transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#1554B8]" />
                    <span>principal@morningglory.edu.bd</span>
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#082D68] text-white">
                    <Quote className="w-4 h-4 text-[#F5AE25]" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1554B8]">
                    From the Principal&apos;s Desk
                  </span>
                </div>

                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#082D68]">
                  Welcome to a Community of Lifelong Learners
                </h2>

                {/* Highlighted Quote Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 italic text-sm sm:text-base leading-relaxed relative">
                  &ldquo;{PRINCIPAL_INFO.quote}&rdquo;
                </div>

                {/* Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {PRINCIPAL_INFO.message.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-heading font-bold text-[#082D68] text-sm">
                      Dr. Shamsul Alam
                    </div>
                    <div className="text-xs text-slate-500">Principal, Morning Glory School</div>
                  </div>
                  <div className="font-script text-slate-400 text-lg italic">
                    Shamsul Alam
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. VISION & MISSION SECTION */}
        <section id="vision" className="scroll-mt-36 space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1554B8]">
              Guiding Principles
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#082D68] mt-1">
              Our Vision, Mission & Core Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              The fundamental pillars steering our educational pedagogy and community governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-7 rounded-2xl shadow-card border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF3FF] flex items-center justify-center text-[#1554B8] mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#082D68] mb-3">
                  Our Mission
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  To provide transformative, inquiry-based education that equips students with analytical thought, ethical leadership, and creative resilience. We cultivate an inclusive, supportive environment where intellectual curiosity is celebrated and moral values are actively practiced.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#1554B8] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Empowering every child with individualized guidance</span>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl shadow-card border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#F5AE25] mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#082D68] mb-3">
                  Our Vision
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  To emerge as a benchmark institution of educational distinction in Bangladesh, graduating compassionate scholars, pioneering innovators, and responsible global citizens who contribute meaningfully to societal progress and environmental sustainability.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#1554B8] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Recognized for scholastic distinction and leadership</span>
              </div>
            </div>
          </div>

          {/* 4 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {[
              {
                title: "Academic Rigor",
                desc: "Deep conceptual mastery, mathematical logic, and scientific inquiry.",
              },
              {
                title: "Moral Integrity",
                desc: "Honesty, empathy, self-discipline, and deep respect for diversity.",
              },
              {
                title: "Creative Innovation",
                desc: "Fostering design thinking, robotics, expressive arts, and coding.",
              },
              {
                title: "Global Citizenship",
                desc: "Ecological consciousness, international perspective, and civic engagement.",
              },
            ].map((p, idx) => (
              <div
                key={p.title}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="text-xs font-bold text-[#1554B8] mb-1">0{idx + 1}</div>
                <h4 className="font-heading font-bold text-base text-[#082D68] mb-1">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. OUR FACULTY SECTION */}
        <section id="faculty" className="scroll-mt-36 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded-md bg-[#1554B8] text-white">
                  <Users className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1554B8]">
                  Academic Mentors
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#082D68]">
                Meet Our Expert Faculty
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Passionate educators, Cambridge-certified specialists, and seasoned mentors dedicated to your child&apos;s academic journey.
              </p>
            </div>

            {/* Department Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedDept === dept
                      ? "bg-[#082D68] text-white shadow-xs font-bold"
                      : "bg-white text-slate-600 hover:bg-[#EAF3FF] hover:text-[#082D68] border border-slate-200"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Faculty Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 hover:border-[#1554B8]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#EAF3FF] text-[#082D68] flex items-center justify-center font-heading font-extrabold text-lg border border-[#D0E2FF] group-hover:bg-[#082D68] group-hover:text-white transition-colors duration-200">
                      {faculty.name
                        .split(" ")
                        .filter((w) => !["Dr.", "Mrs.", "Ms.", "Mr.", "Coach", "Engr."].includes(w))
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                      {faculty.department}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#082D68] group-hover:text-[#1554B8] transition-colors leading-tight">
                    {faculty.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#1554B8] mt-0.5">
                    {faculty.designation}
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400">Qualification: </span>
                      <span className="font-medium text-slate-800">{faculty.qualification}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Experience: </span>
                      <span className="font-medium text-slate-800">{faculty.experience}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Specialization: </span>
                      <span className="font-medium text-slate-800">{faculty.specialization}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                    {faculty.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`mailto:${faculty.email}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#082D68] hover:text-[#1554B8] transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#1554B8]" />
                    <span>Email Faculty</span>
                  </a>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Certified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CAMPUS FACILITIES SECTION */}
        <section id="facilities" className="scroll-mt-36 space-y-6">
          <div className="max-w-2xl mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-[#082D68] text-white">
                <Sparkles className="w-4 h-4 text-[#F5AE25]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1554B8]">
                World-Class Infrastructure
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#082D68]">
              Campus Facilities & Learning Spaces
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              State-of-the-art laboratories, high-speed digital infrastructure, and comprehensive athletic grounds designed to foster discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAMPUS_FACILITIES.map((facility) => {
              const Icon = facilityIconMap[facility.iconName as keyof typeof facilityIconMap] || Building2;
              return (
                <div
                  key={facility.id}
                  className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 flex flex-col justify-between hover:border-[#1554B8]/40 transition-all group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#EAF3FF] flex items-center justify-center text-[#082D68] mb-4 group-hover:bg-[#082D68] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6 text-[#1554B8] group-hover:text-[#F5AE25] transition-colors" />
                    </div>

                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {facility.category}
                    </span>
                    <h3 className="font-heading font-bold text-base text-[#082D68] mt-0.5 mb-2 leading-snug">
                      {facility.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {facility.description}
                    </p>

                    <div className="space-y-1.5 border-t border-slate-100 pt-3">
                      {facility.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
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
