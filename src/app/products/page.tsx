"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FiSearch, FiGrid, FiList, FiSliders } from "react-icons/fi";
import Card from "@/components/Card/Card";
import Loader from "@/components/Loader/Loader";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { delay } from "@/utils/helpers";
import styles from "./page.module.css";

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const load = async () => {
      await delay(500);
      setIsLoading(false);
    };
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

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
  }, [selectedCategory, searchQuery, sortBy]);

  if (isLoading) {
    return <Loader fullPage variant="spinner" text="Loading products..." />;
  }

  return (
    <div className={styles.productsPage}>
      {/* Page Header */}
      <section className="page-hero">
        <div className="container-chai">
          <h1>Our Products</h1>
          <p>Browse our collection of premium tech products</p>
        </div>
      </section>

      <div className="container-chai">
        {/* Search & Controls */}
        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
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
                onChange={(e) =>
                  setSortBy(e.target.value as typeof sortBy)
                }
                className={styles.sortSelect}
              >
                <option value="default">Default</option>
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
          {/* Sidebar Filters - visible on lg+ (desktop) as column, offcanvas on smaller */}
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
                      All Products
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
                        All Products
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
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div
                className={`${
                  viewMode === "grid" ? "row g-3 g-lg-4" : "d-flex flex-column gap-3"
                }`}
              >
                {filteredProducts.map((product) =>
                  viewMode === "grid" ? (
                    <div key={product.id} className="col-12 col-sm-6 col-xl-4">
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