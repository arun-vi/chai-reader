import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}