"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiSearch, FiGrid, FiList, FiSliders } from "react-icons/fi";
import Card from "@/components/Card/Card";
import Loader from "@/components/Loader/Loader";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { delay } from "@/utils/helpers";
import styles from "./page.module.css";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Sync state with URL search params reactively
  useEffect(() => {
    const cat = searchParams.get("category");
    const search = searchParams.get("search");
    
    setSelectedCategory(cat);
    setSearchQuery(search || "");
  }, [searchParams]);

  useEffect(() => {
    const load = async () => {
      await delay(300);
      setIsLoading(false);
    };
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by sidebar links query type
    const filterType = searchParams.get("filter");
    if (filterType === "new") {
      // sort by id descending (assuming higher id is newer)
      result = result.sort((a, b) => b.id - a.id);
    } else if (filterType === "bestsellers") {
      result = result.filter((p) => p.rating >= 4.7);
    } else if (filterType === "recommended") {
      result = result.filter((p) => p.rating >= 4.5);
    }

    // Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          (p.author && p.author.toLowerCase().includes(query)) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, searchParams]);

  if (isLoading) {
    return <Loader fullPage variant="spinner" text="Loading Books..." />;
  }

  return (
    <div className={styles.productsPage}>
      {/* Page Header */}
      <section className="page-hero">
        <div className="container-chai">
          <h1>
            {selectedCategory
              ? categories.find((c) => c.slug === selectedCategory)?.name
              : "Our Bookstore"}
          </h1>
          <p>
            {selectedCategory
              ? `Browse our list of ${categories.find((c) => c.slug === selectedCategory)?.name} books`
              : "Browse our premium selection of books"}
          </p>
        </div>
      </section>

      <div className="container-chai">
        {/* Search & Controls */}
        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.controlActions}>
            <button
              className={`${styles.filterToggle} d-lg-none`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiSliders size={18} />
              <span>Filters</span>
            </button>

            <div className={styles.sortWrapper}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className={styles.sortSelect}
              >
                <option value="default">Default Sort</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewBtn} ${viewMode === "grid" ? styles.viewActive : ""}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <FiGrid size={18} />
              </button>
              <button
                className={`${styles.viewBtn} ${viewMode === "list" ? styles.viewActive : ""}`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <FiList size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Sidebar Filters */}
          <div className="col-lg-3 d-none d-lg-block">
            <aside className={styles.sidebar}>
              <div className={styles.filterGroup}>
                <h3 className={styles.filterTitle}>Categories</h3>
                <ul className={styles.categoryList}>
                  <li>
                    <button
                      className={`${styles.categoryBtn} ${!selectedCategory ? styles.categoryActive : ""}`}
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Books
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        className={`${styles.categoryBtn} ${selectedCategory === cat.slug ? styles.categoryActive : ""}`}
                        onClick={() => setSelectedCategory(cat.slug)}
                      >
                        {cat.name}
                        <span className={styles.categoryCount}>{cat.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* Mobile filter overlay */}
          {showFilters && (
            <div className="d-lg-none">
              <div className={styles.filterOverlay} onClick={() => setShowFilters(false)} />
              <aside className={`${styles.mobileFilter}`}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 fw-bold">Filters</h5>
                  <button className="btn-close-chai" onClick={() => setShowFilters(false)} aria-label="Close filters">&times;</button>
                </div>
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterTitle}>Categories</h3>
                  <ul className={styles.categoryList}>
                    <li>
                      <button
                        className={`${styles.categoryBtn} ${!selectedCategory ? styles.categoryActive : ""}`}
                        onClick={() => { setSelectedCategory(null); setShowFilters(false); }}
                      >
                        All Books
                      </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          className={`${styles.categoryBtn} ${selectedCategory === cat.slug ? styles.categoryActive : ""}`}
                          onClick={() => { setSelectedCategory(cat.slug); setShowFilters(false); }}
                        >
                          {cat.name}
                          <span className={styles.categoryCount}>{cat.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          )}

          {/* Products Grid */}
          <div className="col-lg-9">
            {filteredProducts.length === 0 ? (
              <div className={styles.noResults}>
                <h3>No books found</h3>
                <p>Try adjusting your search query or categories filter</p>
              </div>
            ) : (
              <div
                className={`${
                  viewMode === "grid" ? "row g-3 g-lg-4" : "d-flex flex-column gap-3"
                }`}
              >
                {filteredProducts.map((product) =>
                  viewMode === "grid" ? (
                    <div key={product.id} className="col-6 col-sm-6 col-md-4">
                      <Card product={product} />
                    </div>
                  ) : (
                    <Card key={product.id} product={product} variant="horizontal" />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loader fullPage variant="spinner" text="Loading Books..." />}>
      <ProductsPageContent />
    </Suspense>
  );
}