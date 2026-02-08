import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Serif_Display } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import "./globals.css";

const inter = localFont({
  src: "../public/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  display: "swap",
});

const montserrat = localFont({
  src: [
    {
      path: "../public/fonts/Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
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
      <body className={`${inter.variable} ${montserrat.variable} ${dmSerif.variable} font-sans`}>
        <LanguageProvider>
          {children}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
