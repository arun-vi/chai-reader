"use client";

import React, { use } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { products } from "@/data/products";
import Card from "@/components/Card/Card";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default function AuthorDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const authorName = decodeURIComponent(resolvedParams.name);

  // Find books by this author
  const authorBooks = products.filter(
    (p) => p.author?.toLowerCase() === authorName.toLowerCase()
  );

  // Find author details from the first book by them
  const firstBook = authorBooks[0];

  if (authorBooks.length === 0) {
    return (
      <div className={styles.notFound}>
        <h2>Author not found</h2>
        <p>We couldn't find any books by "{authorName}" in our directory.</p>
        <Link href="/" className={styles.backBtn}>
          Back to Browse
        </Link>
      </div>
    );
  }

  const authorImage = firstBook.authorImage || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300&q=80";
  const authorBio = firstBook.authorBio || `${authorName} is an acclaimed writer whose literature works continue to inspire readers worldwide.`;
  const authorTags = firstBook.tags || ["Author", "Literature", "Bestseller"];

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
        <div className="row align-items-center g-4 m-0 w-100">
          <div className="col-12 col-md-4 p-0 d-flex justify-content-center justify-content-md-start">
            <div className={styles.portraitWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={authorImage}
                alt={authorName}
                className={styles.portrait}
              />
            </div>
          </div>
          <div className="col-12 col-md-8 p-0">
            <div className={styles.profileContent}>
              <h1 className={styles.authorName}>{authorName}</h1>
              <p className={styles.authorBioText}>{authorBio}</p>
              
              {/* Genre and Topic tags */}
              <div className={styles.tagsContainer}>
                {authorTags.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Our New Releases */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2>Our New Releases</h2>
            <p>Trending books among readers</p>
          </div>
        </div>
        <div className="row g-4">
          {authorBooks.map((book) => (
            <div key={book.id} className="col-6 col-sm-4 col-md-3 col-lg-2.4 flex-fill">
              <Card product={book} />
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal List: Our New Releases */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2>Our New Releases</h2>
            <p>Trending books among readers</p>
          </div>
        </div>
        <div className="row g-4">
          {authorBooks.map((book) => (
            <div key={book.id} className="col-12 col-lg-6">
              <Card product={book} variant="horizontal" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
