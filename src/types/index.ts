export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
  isPill?: boolean;
  children?: DropdownItem[];
}

export interface DropdownItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  iconName: "GraduationCap" | "Trophy" | "BookOpen" | "Landmark" | "Users" | "Star";
  description?: string;
}

export interface StatisticItem {
  id: string;
  value: string;
  label: string;
  iconName: "Users" | "UserCheck" | "Trophy" | "Star";
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  formattedDate: string;
  category: "Academic" | "Admission" | "Notice" | "Event";
  summary: string;
  content: string;
  isImportant?: boolean;
  pdfUrl?: string;
}

export interface QuickAccessItem {
  id: string;
  title: string;
  href: string;
  iconName: "BookOpen" | "Calendar" | "BarChart3" | "CreditCard" | "Library" | "Bus" | "Mail";
  bgColor: string;
  textColor: string;
  iconColor: string;
  borderColor: string;
  description?: string;
}

export interface SchoolInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  established: number;
  accreditation: string;
  socials: {
    facebook: string;
    youtube: string;
    linkedin: string;
  };
}
