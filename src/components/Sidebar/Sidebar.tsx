"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Sidebar.module.css";

interface SidebarLink {
  label: string;
  href: string;
  icon: string;
}

const sidebarLinks: SidebarLink[] = [
  { label: "Browse", href: "/", icon: "/icons/sidebar-icon1.svg" },
  { label: "New Arrivals", href: "/products?filter=new", icon: "/icons/sidebar-icon2.svg" },
  { label: "Best Sellers", href: "/products?filter=bestsellers", icon: "/icons/sidebar-icon3.svg" },
  { label: "Self Help", href: "/products?category=self-help", icon: "/icons/sidebar-icon4.svg" },
  { label: "Business", href: "/products?category=business", icon: "/icons/sidebar-icon5.svg" },
  { label: "Tech", href: "/products?category=tech", icon: "/icons/sidebar-icon6.svg" },
  { label: "Kids", href: "/products?category=kids", icon: "/icons/sidebar-icon7.svg" },
  { label: "Classics", href: "/products?category=classics", icon: "/icons/sidebar-icon8.svg" },
];

function SidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    const [linkPath, linkQuery] = href.split("?");
    if (pathname !== linkPath) return false;

    if (!linkQuery) return true;

    const params = new URLSearchParams(linkQuery);
    for (const [key, value] of params.entries()) {
      if (searchParams.get(key) !== value) {
        return false;
      }
    }
    return true;
  };

  // Close offcanvas on route change
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    import("bootstrap").then(({ Offcanvas }) => {
      const offcanvasEl = document.getElementById("sidebarOffcanvas");
      if (offcanvasEl) {
        const bsOffcanvas = Offcanvas.getInstance(offcanvasEl);
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        }
      }
    });
  }, [pathname, searchParams]);

  const renderLinks = () =>
    sidebarLinks.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className={`${styles.navLink} ${
            isActive(link.href) ? styles.active : ""
          }`}
        >
          <Image
            src={link.icon}
            alt={link.label}
            width={20}
            height={20}
            className={styles.navIcon}
          />
          <span>{link.label}</span>
        </Link>
      </li>
    ));

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`${styles.sidebar} d-none d-lg-block`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/icons/logo.svg"
            alt="ChaiReader"
            width={195}
            height={39}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>{renderLinks()}</ul>
        </nav>
      </aside>

      {/* Mobile/Tablet Offcanvas Sidebar (hidden on lg+) */}
      <div
        className="offcanvas offcanvas-start d-lg-none"
        tabIndex={-1}
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
        data-bs-scroll="false"
        data-bs-backdrop="true"
        style={{ width: "280px", backgroundColor: "#FFFBEF" }}
      >
        <div className="offcanvas-header border-bottom">
          <Link href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <Image
              src="/icons/logo.svg"
              alt="ChaiReader"
              width={140}
              height={28}
              priority
            />
          </Link>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body p-3">
          <nav>
            <span className={styles.navTitle}>Browse</span>
            <ul className={styles.navList}>{renderLinks()}</ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default function Sidebar() {
  return (
    <Suspense fallback={<div style={{ width: "260px" }} />}>
      <SidebarContent />
    </Suspense>
  );
}