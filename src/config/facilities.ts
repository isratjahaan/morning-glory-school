export interface FacilityItem {
  id: string;
  name: string;
  category: "Academic" | "Technology" | "Athletics" | "Safety & Services";
  description: string;
  features: string[];
  iconName: "Cpu" | "FlaskConical" | "Library" | "Monitor" | "Trophy" | "Utensils" | "Bus" | "HeartPulse";
}

export const CAMPUS_FACILITIES: FacilityItem[] = [
  {
    id: "stem-labs",
    name: "Advanced STEM & Robotics Hub",
    category: "Technology",
    description: "Equipped with 3D printers, Arduino & Raspberry Pi kits, drone assembly zones, and coding workstations.",
    features: ["Hands-on robotics kits", "Python & Scratch coding tools", "Annual science expo workshop"],
    iconName: "Cpu",
  },
  {
    id: "science-labs",
    name: "Composite Science Laboratories",
    category: "Academic",
    description: "Separate, fully ventilated physics, chemistry, and biology labs adhering to international safety norms.",
    features: ["Digital microscopes", "Fume hoods & safety showers", "Individual student apparatus sets"],
    iconName: "FlaskConical",
  },
  {
    id: "library",
    name: "Central Knowledge & Digital Library",
    category: "Academic",
    description: "Housing over 15,000 physical titles, peer-reviewed journals, and networked tablet workstations for e-reading.",
    features: ["Quiet study carrels", "Storytelling alcove for primary pupils", "Digital catalogue search"],
    iconName: "Library",
  },
  {
    id: "smart-classrooms",
    name: "Interactive Smart Classrooms",
    category: "Technology",
    description: "Ergonomically designed classrooms featuring 75-inch 4K interactive touch panels and acoustic sound damping.",
    features: ["Interactive 4K whiteboards", "Climate-controlled air filtration", "Natural daylight architectural design"],
    iconName: "Monitor",
  },
  {
    id: "sports-complex",
    name: "Multi-Sport Complex & Athletic Fields",
    category: "Athletics",
    description: "Spacious sports grounds accommodating football, cricket pitch, synthetic basketball court, and table tennis.",
    features: ["Natural grass football field", "Cricket nets with bowling machine", "Indoor chess & table tennis hall"],
    iconName: "Trophy",
  },
  {
    id: "transport-fleet",
    name: "GPS-Monitored Bus Transport Fleet",
    category: "Safety & Services",
    description: "Air-conditioned school buses covering major routes across Chattogram with CCTV and speed governors.",
    features: ["Live GPS tracking parent mobile app", "Female bus attendants on board", "First-aid certified drivers"],
    iconName: "Bus",
  },
  {
    id: "health-center",
    name: "Campus Medical Infirmary",
    category: "Safety & Services",
    description: "Dedicated healthcare center staffed by a certified resident nurse for first aid, vitals, and health checks.",
    features: ["Immediate emergency first aid", "Annual pediatric eye and dental screenings", "Direct hospital ambulance tie-up"],
    iconName: "HeartPulse",
  },
  {
    id: "cafeteria",
    name: "Hygiene-Certified School Cafeteria",
    category: "Safety & Services",
    description: "Nutritious hot meals, fresh fruits, and wholesome snacks prepared under strict food-handling protocols.",
    features: ["Zero trans-fat certified menu", "Purified reverse-osmosis drinking water", "Spacious sanitized seating"],
    iconName: "Utensils",
  },
];
