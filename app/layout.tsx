import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

const dmSerif = DM_Serif_Display({ 
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-dm-serif',
});

export const metadata: Metadata = {
  title: "LandWise - Land Intelligence for Ko Pha Ngan",
  description: "Expert land visualizations, assessments, and preparation on Koh Phangan. Drone mapping, 3D models, and premium land visibility studies.",
  keywords: ["land assessment", "drone mapping", "Ko Pha Ngan", "land survey", "3D terrain", "property development"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${dmSerif.variable} font-sans`}>{children}</body>
    </html>
  );
}
