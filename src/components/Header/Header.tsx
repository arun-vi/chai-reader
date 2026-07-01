"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiShoppingCart, FiSearch } from "react-icons/fi";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt={SITE_NAME}
            width={36}
            height={36}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>{SITE_NAME}</span>
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${
                    pathname === link.href ? styles.active : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Search">
            <FiSearch size={20} />
          </button>
          <button className={styles.iconButton} aria-label="Cart">
            <FiShoppingCart size={20} />
            <span className={styles.cartBadge}>3</span>
          </button>
          <button
            className={`${styles.iconButton} ${styles.menuToggle}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
}