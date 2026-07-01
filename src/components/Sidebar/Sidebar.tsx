"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

interface SidebarLink {
  label: string;
  href: string;
  icon: string;
}

const sidebarLinks: SidebarLink[] = [
  { label: "Browse", href: "/", icon: "/icons/menu.svg" },
  { label: "New Arrivals", href: "/products?filter=new", icon: "/icons/arrow-right.svg" },
  { label: "Best Sellers", href: "/products?filter=bestsellers", icon: "/icons/arrow-right.svg" },
  { label: "Self Help", href: "/products?category=self-help", icon: "/icons/user.svg" },
  { label: "Business", href: "/products?category=business", icon: "/icons/user.svg" },
  { label: "Tech", href: "/products?category=tech", icon: "/icons/search.svg" },
  { label: "Kids", href: "/products?category=kids", icon: "/icons/user.svg" },
  { label: "Classics", href: "/products?category=classics", icon: "/icons/arrow-right.svg" },
  { label: "Settings", href: "/about", icon: "/icons/user.svg" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/icons/logo.svg"
          alt="ChaiReader"
          width={36}
          height={36}
          priority
        />
        <span className={styles.logoText}>ChaiReader</span>
      </Link>

      <nav className={styles.nav}>
        <span className={styles.navTitle}>Browse</span>
        <ul className={styles.navList}>
          {sidebarLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.navLink} ${
                  pathname === link.href ? styles.active : ""
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
          ))}
        </ul>
      </nav>
    </aside>
  );
}