import { NavItem } from "@/types";

export const PORTAL_LINKS = [
  { label: "Student Login", role: "student", href: "/portals/student" },
  { label: "Parent Login", role: "parent", href: "/portals/parent" },
  { label: "Teacher Login", role: "teacher", href: "/portals/teacher" },
];

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    isPill: true,
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      {
        title: "About Morning Glory",
        description: "Our history, legacy of excellence, and educational philosophy.",
        href: "/about",
      },
      {
        title: "Principal's Message",
        description: "A warm welcome from our visionary leadership team.",
        href: "/about#principal",
      },
      {
        title: "Vision & Mission",
        description: "Fostering intellectual curiosity, integrity, and global citizenship.",
        href: "/about#vision",
      },
      {
        title: "Our Faculty",
        description: "Meet our dedicated, world-class teaching professionals.",
        href: "/about#faculty",
      },
      {
        title: "Campus Facilities",
        description: "State-of-the-art science labs, tech hubs, and sports complex.",
        href: "/about#facilities",
      },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      {
        title: "Curriculum Overview",
        description: "Holistic, standards-aligned syllabus designed for critical thinking.",
        href: "/academics",
      },
      {
        title: "Primary Wing (Class 1-5)",
        description: "Foundational literacy, numeracy, experiential science, and arts.",
        href: "/academics#primary",
      },
      {
        title: "Middle Wing (Class 6-8)",
        description: "Interdisciplinary discovery, STEM integration, and languages.",
        href: "/academics#middle",
      },
      {
        title: "Senior Wing (Class 9-10)",
        description: "Board examination mastery and career pathway preparatory programs.",
        href: "/academics#senior",
      },
      {
        title: "Academic Calendar",
        description: "Comprehensive schedule of terms, examinations, and events.",
        href: "/academics#calendar",
      },
    ],
  },
  {
    label: "Admission",
    href: "/admission",
    children: [
      {
        title: "Admission Guidelines",
        description: "Step-by-step roadmap to enroll your child for session 2026-27.",
        href: "/admission",
      },
      {
        title: "Eligibility & Age Criteria",
        description: "Grade-wise age criteria and required documentation checklist.",
        href: "/admission#eligibility",
      },
      {
        title: "Fee Structure",
        description: "Transparent, all-inclusive tuition and term fee schedules.",
        href: "/admission#fees",
      },
      {
        title: "Online Application Form",
        description: "Fill and submit your registration form securely online.",
        href: "/admission#apply",
        badge: "Open Now",
      },
    ],
  },
  {
    label: "Notice Board",
    href: "/notices",
  },
  {
    label: "Results",
    href: "/results",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admission", href: "/admission" },
  { label: "Notice", href: "/notices" },
  { label: "Results", href: "/results" },
  { label: "Contact", href: "/contact" },
];
