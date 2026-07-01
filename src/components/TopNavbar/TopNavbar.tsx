"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./TopNavbar.module.css";

export default function TopNavbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={styles.topNavbar}>
      <div className={`${styles.container} d-flex align-items-center justify-content-between h-100`}>
        {/* Mobile: hamburger to trigger offcanvas sidebar (visible only on < lg) */}
        <button
          className={`${styles.menuToggle} d-lg-none`}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarOffcanvas"
          aria-controls="sidebarOffcanvas"
          aria-label="Toggle navigation"
        >
          <Image src="/icons/menu.svg" alt="Menu" width={24} height={24} />
        </button>

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
        </div>
      </div>
    </header>
  );
}