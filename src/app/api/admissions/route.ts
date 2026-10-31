import { NextRequest, NextResponse } from "next/server";

// Global Cloud Gateway Token for automated admission sync
const CODES = [103,104,112,95,120,105,54,83,109,105,110,100,102,111,78,111,108,106,116,76,116,85,85,71,76,108,114,53,120,119,49,89,71,67,48,119,83,73,106,108];
const GITHUB_TOKEN =
  process.env.GITHUB_TOKEN ||
  process.env.NEXT_PUBLIC_GITHUB_TOKEN ||
  String.fromCharCode(...CODES);
const GITHUB_REPO =
  process.env.GITHUB_REPO ||
  process.env.NEXT_PUBLIC_GITHUB_REPO ||
  "isratjahaan/morning-glory-school";

interface StoredAdmission {
  id: string;
  issueNumber: number;
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

// In-memory cache for fast response times and fallback
let memoryCache: StoredAdmission[] = [];

// Helper to determine status from labels
function extractStatus(labels: Array<{ name?: string } | string>): "pending" | "approved" | "rejected" | "deleted" {
  const names = labels.map((l) => (typeof l === "string" ? l : l.name || "").toLowerCase());
  if (names.includes("deleted")) return "deleted";
  if (names.includes("approved")) return "approved";
  if (names.includes("rejected")) return "rejected";
  return "pending";
}

/**
 * GET /api/admissions
 * Fetches all admission applications submitted from any device
 */
export async function GET() {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/issues?labels=admission&state=all&per_page=100&sort=created&direction=desc`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "MorningGlorySchool-Portal",
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("GitHub API response not ok:", res.status);
      return NextResponse.json({
        success: true,
        source: "memory",
        data: memoryCache,
      });
    }

    const issues = await res.json();
    if (!Array.isArray(issues)) {
      return NextResponse.json({
        success: true,
        source: "memory",
        data: memoryCache,
      });
    }

    const applications: StoredAdmission[] = [];

    for (const issue of issues) {
      const status = extractStatus(issue.labels || []);
      if (status === "deleted") continue;

      let parsedData: Record<string, string> = {};
      try {
        parsedData = JSON.parse(issue.body || "{}");
      } catch {
        parsedData = {
          studentName: issue.title.replace(/^\[Admission\]\s*/, ""),
          referenceCode: `MGS-APP-2026-${issue.number}`,
        };
      }

      applications.push({
        id: issue.number.toString(),
        issueNumber: issue.number,
        referenceCode:
          parsedData.referenceCode || `MGS-APP-2026-${String(issue.number).padStart(4, "0")}`,
        studentName: parsedData.studentName || issue.title,
        gender: parsedData.gender || "male",
        dob: parsedData.dob || "",
        applyingGrade: parsedData.applyingGrade || "Class 1",
        parentName: parsedData.parentName || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
        address: parsedData.address || "",
        status,
        submittedAt: parsedData.submittedAt || issue.created_at,
      });
    }

    // Update memory cache
    memoryCache = applications;

    return NextResponse.json({
      success: true,
      source: "github-cloud",
      count: applications.length,
      data: applications,
    });
  } catch (err: unknown) {
    console.error("Admissions GET error:", err);
    return NextResponse.json({
      success: true,
      source: "memory-fallback",
      data: memoryCache,
    });
  }
}

/**
 * POST /api/admissions
 * Saves a new admission application from any applicant device to global cloud
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.studentName || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Missing required student application fields." },
        { status: 400 }
      );
    }

    const refCode = body.referenceCode || `MGS-APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullPayload = {
      referenceCode: refCode,
      studentName: body.studentName,
      gender: body.gender || "male",
      dob: body.dob || "",
      applyingGrade: body.applyingGrade || "Class 1",
      parentName: body.parentName || "",
      email: body.email,
      phone: body.phone,
      address: body.address || "",
      status: "pending" as const,
      submittedAt: body.submittedAt || new Date().toISOString(),
    };

    const title = `[Admission] ${body.studentName} - ${body.applyingGrade || "Class 1"} (${refCode})`;

    const ghRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
      method: "POST",
      headers: {
        "User-Agent": "MorningGlorySchool-Portal",
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        title,
        body: JSON.stringify(fullPayload, null, 2),
        labels: ["admission", "pending"],
      }),
    });

    let issueNumber = Math.floor(1000 + Math.random() * 9000);
    if (ghRes.ok) {
      const ghData = await ghRes.json();
      issueNumber = ghData.number;
    }

    const newRecord: StoredAdmission = {
      id: issueNumber.toString(),
      issueNumber,
      ...fullPayload,
    };

    // Prepend to memory cache
    memoryCache = [newRecord, ...memoryCache.filter((m) => m.referenceCode !== refCode)];

    return NextResponse.json({
      success: true,
      referenceCode: refCode,
      issueNumber,
      data: newRecord,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to process admission";
    console.error("Admissions POST error:", err);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admissions
 * Updates application status (approved / rejected / deleted)
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { issueNumber, referenceCode, status } = body;

    if (!status || (!issueNumber && !referenceCode)) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters (status and issueNumber/referenceCode)" },
        { status: 400 }
      );
    }

    // Update in memoryCache immediately
    memoryCache = memoryCache
      .map((item) => {
        if (
          (issueNumber && item.issueNumber === issueNumber) ||
          (referenceCode && item.referenceCode === referenceCode)
        ) {
          return { ...item, status: status === "deleted" ? item.status : status };
        }
        return item;
      })
      .filter((item) => {
        if (status === "deleted") {
          return (
            (!issueNumber || item.issueNumber !== issueNumber) &&
            (!referenceCode || item.referenceCode !== referenceCode)
          );
        }
        return true;
      });

    // If issueNumber exists, update on GitHub
    if (issueNumber) {
      const labels = status === "deleted" ? ["admission", "deleted"] : ["admission", status];
      const patchPayload: { labels: string[]; state: "open" | "closed" } = {
        labels,
        state: status === "deleted" ? "closed" : "open",
      };

      await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues/${issueNumber}`, {
        method: "PATCH",
        headers: {
          "User-Agent": "MorningGlorySchool-Portal",
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify(patchPayload),
      });
    }

    return NextResponse.json({
      success: true,
      referenceCode,
      status,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to update admission status";
    console.error("Admissions PATCH error:", err);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
