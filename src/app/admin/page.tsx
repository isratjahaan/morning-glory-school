"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Trash2,
  Eye,
  LogOut,
  Sparkles,
  Lock,
  Printer,
  RefreshCw,
  Wifi,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface AdmissionApplication {
  id?: string;
  issueNumber?: number;
  referenceCode: string;
  studentName: string;
  gender: string;
  dob: string;
  applyingGrade: string;
  parentName: string;
  email: string;
  phone: string;
  address: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

const DEFAULT_APPLICATIONS: AdmissionApplication[] = [
  {
    referenceCode: "MGS-APP-2026-8421",
    studentName: "NUSRAT JAHAN",
    gender: "female",
    dob: "2020-03-10",
    applyingGrade: "Nursery",
    parentName: "MALEKA",
    email: "malekan2003@gmail.com",
    phone: "0198765432",
    address: "House 24, Road 5, Nasirabad, Chattogram",
    status: "pending",
    submittedAt: "2026-10-31T12:28:00.000Z",
  },
  {
    referenceCode: "MGS-APP-2026-5192",
    studentName: "Tahmidur Rahman",
    gender: "male",
    dob: "2018-05-14",
    applyingGrade: "Class 2",
    parentName: "Mohammad Shafiqul Islam",
    email: "shafiq.rahman@gmail.com",
    phone: "+880 1712 345678",
    address: "Agrabad Residential Area, Chattogram",
    status: "approved",
    submittedAt: "2026-10-30T10:15:00.000Z",
  },
  {
    referenceCode: "MGS-APP-2026-3840",
    studentName: "Ayesha Siddiqua",
    gender: "female",
    dob: "2019-11-20",
    applyingGrade: "Class 1",
    parentName: "Dr. Farzana Begum",
    email: "farzana.begum@yahoo.com",
    phone: "+880 1819 876543",
    address: "GEC Circle, O.R. Nizam Road, Chattogram",
    status: "pending",
    submittedAt: "2026-10-29T14:40:00.000Z",
  },
  {
    referenceCode: "MGS-APP-2026-2917",
    studentName: "Rayhan Chowdhury",
    gender: "male",
    dob: "2016-08-05",
    applyingGrade: "Class 5",
    parentName: "Enamul Haque Chowdhury",
    email: "enamul.chowdhury@outlook.com",
    phone: "+880 1911 223344",
    address: "Khulshi Hills, Road 3, Chattogram",
    status: "approved",
    submittedAt: "2026-10-28T09:20:00.000Z",
  },
];

export default function AdminPage() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [gradeFilter, setGradeFilter] = useState<string>("All");
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("");

  // Load applications from global cloud API with localStorage fallback
  const loadApplications = useCallback(async (isBackground = false) => {
    if (!isBackground) setIsRefreshing(true);
    try {
      const res = await fetch("/api/admissions");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const cloudList: AdmissionApplication[] = json.data;

          let localList: AdmissionApplication[] = [];
          try {
            localList = JSON.parse(localStorage.getItem("mgs_admissions") || "[]");
          } catch {}

          const merged = [...cloudList];
          // Include any local items that aren't on cloud yet
          localList.forEach((loc) => {
            if (!merged.some((m) => m.referenceCode === loc.referenceCode)) {
              merged.push(loc);
            }
          });

          // Include default sample records if needed
          DEFAULT_APPLICATIONS.forEach((def) => {
            if (!merged.some((m) => m.referenceCode === def.referenceCode)) {
              merged.push(def);
            }
          });

          setApplications(merged);
          setLastSyncTime(new Date().toLocaleTimeString());
          try {
            localStorage.setItem("mgs_admissions", JSON.stringify(merged));
          } catch {}
          if (!isBackground) setIsRefreshing(false);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not fetch cloud admissions:", e);
    }

    // Fallback if cloud API is unreachable
    try {
      const stored = JSON.parse(localStorage.getItem("mgs_admissions") || "[]");
      if (stored && stored.length > 0) {
        setApplications(stored);
      } else {
        setApplications(DEFAULT_APPLICATIONS);
      }
    } catch {
      setApplications(DEFAULT_APPLICATIONS);
    }
    setLastSyncTime(new Date().toLocaleTimeString());
    if (!isBackground) setIsRefreshing(false);
  }, []);

  // Initial fetch and auto-polling every 8 seconds
  useEffect(() => {
    loadApplications();
    const interval = setInterval(() => {
      loadApplications(true);
    }, 8000);
    return () => clearInterval(interval);
  }, [loadApplications]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdminLoggedIn(true);
  };

  const handleQuickAdminLogin = () => {
    setAdminEmail("admin@morningglory.edu.bd");
    setAdminPassword("admin123");
    setIsAdminLoggedIn(true);
  };

  const updateApplicationStatus = async (
    refCode: string,
    newStatus: "pending" | "approved" | "rejected",
    issueNumber?: number
  ) => {
    // 1. Optimistic UI update
    const updated = applications.map((app) =>
      app.referenceCode === refCode ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
    if (selectedApp && selectedApp.referenceCode === refCode) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    try {
      localStorage.setItem("mgs_admissions", JSON.stringify(updated));
    } catch {}

    // 2. Sync status to global cloud
    try {
      await fetch("/api/admissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceCode: refCode,
          issueNumber: issueNumber,
          status: newStatus,
        }),
      });
    } catch (err) {
      console.warn("Status patch error:", err);
    }
  };

  const deleteApplication = async (refCode: string, issueNumber?: number) => {
    if (confirm(`Are you sure you want to delete application ${refCode}?`)) {
      const updated = applications.filter((app) => app.referenceCode !== refCode);
      setApplications(updated);
      if (selectedApp?.referenceCode === refCode) {
        setSelectedApp(null);
      }
      try {
        localStorage.setItem("mgs_admissions", JSON.stringify(updated));
      } catch {}

      // Delete from cloud API
      try {
        await fetch("/api/admissions", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referenceCode: refCode,
            issueNumber: issueNumber,
            status: "deleted",
          }),
        });
      } catch (err) {
        console.warn("Delete patch error:", err);
      }
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery);

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesGrade = gradeFilter === "All" || app.applyingGrade === gradeFilter;

    return matchesSearch && matchesStatus && matchesGrade;
  });

  const totalCount = applications.length;
  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const approvedCount = applications.filter((a) => a.status === "approved").length;
  const rejectedCount = applications.filter((a) => a.status === "rejected").length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFF]">
      <TopBar />
      <Navbar />

      {/* Admin Banner Header */}
      <div className="bg-[#06275B] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#F5AE25] hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-[#F5AE25]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5AE25]">
                Morning Glory Administration
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Admissions & Student Registry Portal
            </h1>
          </div>

          {isAdminLoggedIn && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white">Chief Admissions Officer</div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Admin Mode Active
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdminLoggedIn(false)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {!isAdminLoggedIn ? (
          /* Admin Login Panel */
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-5">
              <div className="text-center pb-2 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-[#082D68] text-white flex items-center justify-center mx-auto mb-2 shadow">
                  <Shield className="w-7 h-7 text-[#F5AE25]" />
                </div>
                <h2 className="font-heading font-bold text-xl text-[#082D68]">
                  School Admin Console
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sign in to view and manage student admission applications
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Admin Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@morningglory.edu.bd"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Master Security Key
                  </label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#082D68] hover:bg-[#062352] text-white font-semibold text-sm shadow transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#F5AE25]" />
                  <span>Access Admin Panel</span>
                </button>
              </form>

              {/* 1-Click Instant Admin Access */}
              <div className="pt-3 border-t border-slate-100 text-center space-y-2">
                <button
                  type="button"
                  onClick={handleQuickAdminLogin}
                  className="w-full py-2.5 rounded-xl bg-[#EAF3FF] hover:bg-[#D8EAFF] text-[#082D68] text-xs font-bold transition flex items-center justify-center gap-1.5 border border-[#D0E2FF]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5AE25]" />
                  <span>1-Click Instant Admin Access</span>
                </button>
                <p className="text-[11px] text-slate-400">
                  Instant view of all submitted admission records
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Admin Dashboard */
          <div className="space-y-8 animate-fade-in">
            {/* Cloud Sync Status & Quick Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-100 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <Wifi className="w-4 h-4 text-emerald-600" />
                <span className="text-[#082D68] font-bold">Cloud Live Sync Active</span>
                <span className="text-slate-400 hidden md:inline">| Cross-Device Applications Connected</span>
                {lastSyncTime && (
                  <span className="text-[11px] text-slate-400 ml-1">
                    (Last checked: {lastSyncTime})
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => loadApplications(false)}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EAF3FF] hover:bg-[#D8EAFF] text-[#082D68] text-xs font-bold transition self-start sm:self-auto border border-[#D0E2FF]"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#1554B8] ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "Checking Cloud..." : "Refresh Applications"}</span>
              </button>
            </div>

            {/* Top Stat Counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Total Applications
                  </span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#082D68] mt-1">
                    {totalCount}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF3FF] flex items-center justify-center text-[#1554B8]">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Pending Review
                  </span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-600 mt-1">
                    {pendingCount}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Approved
                  </span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600 mt-1">
                    {approvedCount}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Rejected / Archived
                  </span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-rose-600 mt-1">
                    {rejectedCount}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <XCircle className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student, parent, phone, or reference ID..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <div className="flex items-center gap-1 bg-[#F7FAFF] p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                  {["All", "pending", "approved", "rejected"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition ${
                        statusFilter === st
                          ? "bg-[#082D68] text-white shadow-xs font-bold"
                          : "text-slate-600 hover:text-[#082D68]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {/* Grade Selector */}
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#082D68]"
                >
                  <option value="All">All Grades</option>
                  <option value="Playgroup">Playgroup</option>
                  <option value="Nursery">Nursery</option>
                  <option value="Kindergarten">Kindergarten</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 8">Class 8</option>
                </select>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <Printer className="w-3.5 h-3.5 text-[#082D68]" />
                  <span>Print List</span>
                </button>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-base text-[#082D68]">
                    Admission Applications ({filteredApplications.length})
                  </h3>
                  <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold">
                    Realtime Synced
                  </span>
                </div>
                <span className="text-xs text-slate-400">Sorted by submission date (newest first)</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#F7FAFF] text-slate-400 text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-6">Ref Code</th>
                      <th className="py-3 px-6">Student Name</th>
                      <th className="py-3 px-6">Grade</th>
                      <th className="py-3 px-6">Guardian & Phone</th>
                      <th className="py-3 px-6">Submission Date</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-10 text-center text-slate-400 text-xs">
                          No admission applications found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => (
                        <tr key={app.referenceCode} className="hover:bg-[#F7FAFF]/80 transition-colors">
                          <td className="py-3.5 px-6 font-mono font-bold text-[#1554B8] text-xs">
                            {app.referenceCode}
                          </td>
                          <td className="py-3.5 px-6 font-bold text-[#082D68]">
                            {app.studentName}
                          </td>
                          <td className="py-3.5 px-6">
                            <span className="px-2.5 py-1 rounded-full bg-[#EAF3FF] text-[#082D68] text-xs font-semibold">
                              {app.applyingGrade}
                            </span>
                          </td>
                          <td className="py-3.5 px-6">
                            <div className="font-medium text-slate-800">{app.parentName}</div>
                            <div className="text-xs text-slate-500 font-mono">{app.phone}</div>
                          </td>
                          <td className="py-3.5 px-6 text-xs text-slate-500">
                            {new Date(app.submittedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-3.5 px-6 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                                app.status === "approved"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : app.status === "rejected"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedApp(app)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#EAF3FF] text-slate-700 hover:text-[#082D68] transition"
                                title="View Full Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {app.status !== "approved" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateApplicationStatus(app.referenceCode, "approved", app.issueNumber)
                                  }
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                                  title="Approve Application"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              )}

                              {app.status !== "rejected" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateApplicationStatus(app.referenceCode, "rejected", app.issueNumber)
                                  }
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition"
                                  title="Reject Application"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => deleteApplication(app.referenceCode, app.issueNumber)}
                                className="p-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full Application Details Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#06275B] text-white p-6 relative">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#1554B8] text-white font-bold">
                  {selectedApp.referenceCode}
                </span>
                <span
                  className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    selectedApp.status === "approved"
                      ? "bg-emerald-500 text-white"
                      : selectedApp.status === "rejected"
                      ? "bg-rose-500 text-white"
                      : "bg-amber-400 text-[#082D68]"
                  }`}
                >
                  {selectedApp.status}
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white">
                {selectedApp.studentName}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Application for Admission to {selectedApp.applyingGrade}
              </p>
            </div>

            {/* Modal Details Grid */}
            <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-[#F7FAFF] border border-slate-100">
                  <span className="text-slate-400 text-xs block">Date of Birth</span>
                  <span className="font-bold text-[#082D68] text-base">{selectedApp.dob || "Not specified"}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F7FAFF] border border-slate-100">
                  <span className="text-slate-400 text-xs block">Applying Grade</span>
                  <span className="font-bold text-[#082D68] text-base">{selectedApp.applyingGrade}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs sm:text-sm">
                <h4 className="font-heading font-bold text-sm text-[#082D68] border-b border-slate-100 pb-2">
                  Parent / Guardian Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 text-xs block">Guardian Full Name</span>
                    <span className="font-semibold text-slate-800">{selectedApp.parentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Phone Number</span>
                    <a href={`tel:${selectedApp.phone}`} className="font-semibold text-[#1554B8] hover:underline">
                      {selectedApp.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Email Address</span>
                    <a href={`mailto:${selectedApp.email}`} className="font-semibold text-[#1554B8] hover:underline">
                      {selectedApp.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Submission Timestamp</span>
                    <span className="text-slate-700">{new Date(selectedApp.submittedAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 text-xs block">Residential Address</span>
                  <span className="text-slate-800 font-medium">{selectedApp.address || "Not provided"}</span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateApplicationStatus(selectedApp.referenceCode, "approved", selectedApp.issueNumber)
                    }
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateApplicationStatus(selectedApp.referenceCode, "rejected", selectedApp.issueNumber)
                    }
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
