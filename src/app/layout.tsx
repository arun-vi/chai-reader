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
        <div className="app-container">
          <div className="app-main-layout">
            {/* Sidebar - hidden on mobile/tablet via d-none d-lg-block, sticky on desktop */}
            <Sidebar />
            
            <div className="app-right">
              {/* TopNavbar */}
              <TopNavbar />
              
              {/* Main Content Area */}
              <main className="main-content">
                {children}
              </main>
            </div>
          </div>
          {/* Footer spans the full width of the screen */}
          <Footer />
        </div>
      </body>
    </html>
  );
}