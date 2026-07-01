import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Sidebar from "@/components/Sidebar/Sidebar";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import Footer from "@/components/Footer/Footer";
import BootstrapClient from "@/components/BootstrapClient";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChaiReader - Premium Tech & Gadgets",
  description:
    "Your premium destination for cutting-edge technology and gadgets. Discover the latest laptops, headphones, smartphones, tablets and accessories.",
  keywords: ["tech", "gadgets", "laptops", "headphones", "electronics"],
  authors: [{ name: "ChaiReader" }],
  openGraph: {
    title: "ChaiReader - Premium Tech & Gadgets",
    description:
      "Your premium destination for cutting-edge technology and gadgets.",
    type: "website",
    siteName: "ChaiReader",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <BootstrapClient />
        <div className="app-layout">
          {/* Fixed Sidebar - hidden on mobile/tablet via Bootstrap d-none d-lg-block */}
          <Sidebar />
          
          {/* Fixed TopNavbar */}
          <TopNavbar />
          
          {/* Main Content Area - uses responsive padding via globals.css */}
          <main className="main-content">
            {children}
          </main>
          
          {/* Footer is rendered inside children pages or globally */}
          <Footer />
        </div>
      </body>
    </html>
  );
}