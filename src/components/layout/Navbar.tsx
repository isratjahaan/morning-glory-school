"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { MAIN_NAV_ITEMS, PORTAL_LINKS } from "@/config/navigation";

interface NavbarProps {
  onOpenPortalModal?: (role: "student" | "parent" | "teacher") => void;
}

export function Navbar({ onOpenPortalModal }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleSubItemClick = (href: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const currentPath = pathname || "/";
      if (currentPath === path || (path === "" && currentPath === "/")) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 50);
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white ${
        isScrolled ? "shadow-md py-1.5" : "shadow-sm py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#082D68] rounded-lg py-1"
          >
            <div className="relative h-12 w-auto min-w-[130px] sm:h-14 sm:min-w-[150px] transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src="/images/school-logo.png"
                alt="Morning Glory School Logo"
                width={200}
                height={64}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[14px] font-medium text-[#172B4D]">
            {MAIN_NAV_ITEMS.map((item) => {
              const isHome = item.label === "Home";
              const isActive = pathname === item.href || (item.children && item.children.some(c => pathname === c.href));
              const hasDropdown = Boolean(item.children && item.children.length > 0);

              if (isHome) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 rounded-full bg-[#082D68] text-white font-semibold text-[13.5px] shadow-sm hover:bg-[#062352] transition-all"
                  >
                    Home
                  </Link>
                );
              }

              if (hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      aria-expanded={activeDropdown === item.label}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:text-[#082D68] hover:bg-[#F7FAFF] ${
                        activeDropdown === item.label || isActive ? "text-[#082D68] font-semibold" : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180 text-[#082D68]" : "text-gray-400"
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-72 rounded-xl bg-white shadow-xl border border-slate-100 py-2.5 z-50 animate-fade-in divide-y divide-slate-100">
                        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {item.label} Overview
                        </div>
                        <div className="py-1">
                          {item.children?.map((sub) => (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onClick={() => handleSubItemClick(sub.href)}
                              className="group flex flex-col px-3.5 py-2 hover:bg-[#F7FAFF] rounded-lg mx-1 transition-colors"
                            >
                              <div className="flex items-center justify-between text-[13px] font-semibold text-[#172B4D] group-hover:text-[#082D68]">
                                <span>{sub.title}</span>
                                {sub.badge && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {sub.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 rounded-md transition-colors hover:text-[#082D68] hover:bg-[#F7FAFF] ${
                    isActive ? "text-[#082D68] font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Online Admission CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admission"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#082D68] text-white font-semibold text-[13.5px] shadow hover:bg-[#062352] hover:shadow-md transition-all active:scale-[0.98]"
            >
              <GraduationCap className="w-4 h-4 text-[#F5AE25]" />
              <span>Online Admission</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/admission"
              className="sm:hidden px-3 py-1.5 rounded-full bg-[#082D68] text-white text-[11px] font-semibold flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#F5AE25]" />
              <span>Admission</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#082D68] hover:bg-[#F7FAFF] focus:outline-none focus:ring-2 focus:ring-[#082D68]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto animate-fade-in">
          <div className="flex flex-col space-y-1">
            {MAIN_NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.children && item.children.length > 0);
              const isExpanded = mobileExpanded[item.label];

              if (!hasDropdown) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-semibold text-[#172B4D] hover:bg-[#F7FAFF] hover:text-[#082D68]"
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <div key={item.label} className="border-b border-slate-50 last:border-none">
                  <button
                    type="button"
                    onClick={() => toggleMobileSubmenu(item.label)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-semibold text-[#172B4D] hover:bg-[#F7FAFF] hover:text-[#082D68]"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#082D68]" : "text-gray-400"
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="pl-4 pr-2 pb-2 space-y-1">
                      {item.children?.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={() => handleSubItemClick(sub.href)}
                          className="block px-3 py-2 rounded-md text-[13px] text-slate-600 hover:text-[#082D68] hover:bg-[#F7FAFF]"
                        >
                          <div className="font-medium text-[#172B4D]">{sub.title}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{sub.description}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Portal Logins */}
          <div className="mt-5 pt-4 border-t border-slate-200">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              School Portals
            </p>
            <div className="grid grid-cols-3 gap-2 px-1">
              {PORTAL_LINKS.map((portal) => (
                <button
                  key={portal.role}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortalModal?.(portal.role as "student" | "parent" | "teacher");
                  }}
                  className="py-2 px-1 text-center rounded-lg bg-[#F7FAFF] hover:bg-[#EAF3FF] text-[11px] font-semibold text-[#082D68] border border-slate-200"
                >
                  {portal.label.replace(" Login", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Online Admission CTA */}
          <div className="mt-4 px-1">
            <Link
              href="/admission"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#082D68] text-white font-semibold text-[14px] shadow"
            >
              <GraduationCap className="w-5 h-5 text-[#F5AE25]" />
              <span>Apply for Online Admission</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
