import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://morningglory.edu.bd"),
  title: "Morning Glory School | Learn, Grow, Excel",
  description:
    "Welcome to Morning Glory School. Discover quality education, academic excellence, modern learning facilities and a brighter future for every student.",
  keywords: [
    "Morning Glory School",
    "School in Chattogram",
    "Quality Education",
    "English Medium",
    "Admission 2026",
    "Academic Excellence",
    "Learn Grow Excel",
  ],
  authors: [{ name: "Morning Glory School" }],
  openGraph: {
    title: "Morning Glory School | Learn, Grow, Excel",
    description:
      "Quality education, modern facilities and caring environment to help every student reach their full potential.",
    url: "https://morningglory.edu.bd",
    siteName: "Morning Glory School",
    images: [
      {
        url: "/images/school-logo.png",
        width: 1024,
        height: 682,
        alt: "Morning Glory School Official Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/school-logo.png",
    apple: "/images/school-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#06275B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F7FAFF] text-[#172B4D] selection:bg-[#EAF3FF] selection:text-[#082D68]">
        {children}
      </body>
    </html>
  );
}
