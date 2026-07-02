"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import { products } from "@/data/products";
import styles from "./TopNavbar.module.css";

function TopNavbarContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Check if current page should show breadcrumb
  const showBreadcrumb = (pathname.includes("/authors/") || pathname.includes("/products/")) && pathname !== "/products";
  
  // Generate breadcrumb items based on pathname
  const getBreadcrumb = () => {
    if (!showBreadcrumb) return null;
    
    const parts = pathname.split("/").filter(Boolean);
    const breadcrumbItems = [{ label: "Browse", href: "/" }];
    
    if (parts[0] === "authors" && parts[1]) {
      breadcrumbItems.push({ label: "Authors", href: "/authors" });
      breadcrumbItems.push({ label: decodeURIComponent(parts[1]), href: pathname });
    } else if (parts[0] === "products" && parts[1]) {
      const productId = parseInt(parts[1]);
      const book = products.find((p) => p.id === productId);
      
      if (book) {
        if (book.author) {
          breadcrumbItems.push({ label: book.author, href: `/authors/${encodeURIComponent(book.author)}` });
        }
        breadcrumbItems.push({ label: book.title, href: pathname });
      } else {
        breadcrumbItems.push({ label: "Products", href: "/products" });
        breadcrumbItems.push({ label: `Product ${parts[1]}`, href: pathname });
      }
    }
    
    return breadcrumbItems;
  };

  const breadcrumb = getBreadcrumb();

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

        {/* Left: Breadcrumb or Search Bar */}
          <form className={styles.searchWrapper} onSubmit={handleSearch}>
            <Image
              src="/icons/search-icon.svg"
              alt="Search"
              width={15}
              height={15}
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Search book title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </form>
        

        {/* Right: Cart + Login */}
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Wishlist">
            <Image src="/icons/heart-icon.svg" alt="Heart" width={20} height={20} />
          </button>
          <button className={styles.cartBtn} aria-label="Cart">
            <Image src="/icons/cart-icon.svg" alt="Cart" width={20} height={20} />
          </button>
          <Link href="/contact">
            <button className={styles.loginBtn}>Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function TopNavbar() {
  return (
    <Suspense fallback={<header className={styles.topNavbar} />}>
      <TopNavbarContent />
    </Suspense>
  );
}