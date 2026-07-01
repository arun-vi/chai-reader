"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useToggle } from "@/hooks/useToggle";
import styles from "./TopNavbar.module.css";

export default function TopNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useToggle();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to products with search query
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header className={styles.topNavbar}>
        <div className={styles.container}>
          {/* Left: Search Bar */}
          <form className={styles.searchWrapper} onSubmit={handleSearch}>
            <Image
              src="/icons/search.svg"
              alt="Search"
              width={20}
              height={20}
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </form>

          {/* Right: Cart + Login */}
          <div className={styles.actions}>
            <button className={styles.cartBtn} aria-label="Cart">
              <Image src="/icons/user.svg" alt="Cart" width={20} height={20} />
              <span className={styles.cartBadge}>3</span>
            </button>
            <Link href="/contact">
              <button className={styles.loginBtn}>Login</button>
            </Link>
            <button
              className={styles.menuToggle}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Image src="/icons/menu.svg" alt="Menu" width={24} height={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <MobileSidebar onClose={closeMobileMenu} />
      )}
    </>
  );
}

function MobileSidebar({ onClose }: { onClose: () => void }) {
  const sidebarLinks = [
    { label: "Browse", href: "/" },
    { label: "New Arrivals", href: "/products?filter=new" },
    { label: "Best Sellers", href: "/products?filter=bestsellers" },
    { label: "Self Help", href: "/products?category=self-help" },
    { label: "Business", href: "/products?category=business" },
    { label: "Tech", href: "/products?category=tech" },
    { label: "Kids", href: "/products?category=kids" },
    { label: "Classics", href: "/products?category=classics" },
    { label: "Settings", href: "/about" },
  ];

  return (
    <div className={styles.mobileOverlay} onClick={onClose}>
      <div className={styles.mobileSidebar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.mobileLogo}>
          <Image src="/icons/logo.svg" alt="Logo" width={32} height={32} />
          <span className={styles.mobileLogoText}>ChaiReader</span>
        </div>
        <nav className={styles.mobileNav}>
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}