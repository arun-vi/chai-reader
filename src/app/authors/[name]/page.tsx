"use client";

import React, { use } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { getAllProducts } from "@/data/products";
import Card from "@/components/Card/Card";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default function AuthorDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const authorName = decodeURIComponent(resolvedParams.name);

  // Find books by this author
  const allProducts = getAllProducts();
  const authorBooks = allProducts.filter(
    (p) => p.author?.toLowerCase() === authorName.toLowerCase() && p.category === "author-page"
  );

  // Find author details
  const firstBook = authorBooks[0];
  const authorImage = firstBook?.authorImage || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300&q=80";
  const authorBio = firstBook?.authorBio || `${authorName} is an acclaimed writer whose literature works continue to inspire readers worldwide.`;
  const authorTags = firstBook?.tags || ["Author", "Literature", "Bestseller"];
  
  return (
    <div className={styles.authorPage}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb} aria-label="breadcrumb">
        <ol className={styles.breadcrumbList}>
          <li>
            <Link href="/">Browse</Link>
          </li>
          <li className={styles.separator}>
            <FiChevronRight size={14} />
          </li>
          <li>
            <span>Authors</span>
          </li>
          <li className={styles.separator}>
            <FiChevronRight size={14} />
          </li>
          <li className={styles.active} aria-current="page">
            {authorName}
          </li>
        </ol>
      </nav>

      {/* Author Profile Card Block */}
      <div className={styles.authorProfileCard}>
        <div className={styles.authorRowContainer}>
          <div>
            <div className={styles.portraitWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={authorImage}
                alt={authorName}
                className={styles.portrait}
              />
            </div>
          </div>
          <div>
            <div className={styles.profileContent}>
              <h1 className={styles.authorName}>{authorName}</h1>
              <p className={styles.authorBioText}>{authorBio}</p>
              
              {/* Genre and Topic tags */}
              <div className={styles.tagsContainer}>
                {(authorTags || ["Author", "Literature", "Bestseller"]).map((tag, idx) => (
                  <span key={idx} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Author's Popular Works */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2>Our New Releases</h2>
            <p>Trending books among readers</p>
          </div>
        </div>
        <div className={styles.newReleaseRow}>
          {
            authorBooks.slice(0, 10).map((book) => (
              <div key={book.id}>
                <Card product={book} variant="simple" />
              </div>
            ))
          }
        </div>
      </section>

      {/* Horizontal List: Latest Publications */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2>Latest Publications</h2>
            <p>Recent releases and editions from {authorName}</p>
          </div>
        </div>
        <div className="row g-4">
          {           
            authorBooks.slice(10, 16).map((book) => (
              <div key={book.id} className="col-12 col-lg-6">
                <Card product={book} variant="horizontal" />
              </div>
            ))
          }
        </div>
      </section>
    </div>
  );
}
