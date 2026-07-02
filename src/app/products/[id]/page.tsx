"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { FiHeart, FiStar, FiChevronRight } from "react-icons/fi";
import { products } from "@/data/products";
import Card from "@/components/Card/Card";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const book = products.find((p) => p.id === productId);

  const [isLiked, setIsLiked] = useState(false);
  const [readMore, setReadMore] = useState(false);

  if (!book) {
    return (
      <div className={styles.notFound}>
        <h2>Book not found</h2>
        <p>The book you are looking for does not exist.</p>
        <Link href="/" className={styles.backBtn}>
          Back to Browse
        </Link>
      </div>
    );
  }

  // Get related books from "might" category
  const relatedBooks = products
    .filter((p) => p.category === "might" && p.id !== book.id)
    .slice(0, 5);

  // Fallback to other books if none in the same category
  const finalRelated = relatedBooks.length > 0 
    ? relatedBooks 
    : products.filter((p) => p.id !== book.id).slice(0, 5);

  return (
    <div className={styles.detailPage}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb} aria-label="breadcrumb">
        <ol className={styles.breadcrumbList}>
          <li>
            <Link href="/">Browse</Link>
          </li>
          <li className={styles.separator}>
            <FiChevronRight size={14} />
          </li>
          {book.author && (
            <>
              <li>
                <Link href={`/authors/${encodeURIComponent(book.author)}`}>
                  {book.author}
                </Link>
              </li>
              <li className={styles.separator}>
                <FiChevronRight size={14} />
              </li>
            </>
          )}
          <li className={styles.active} aria-current="page">
            {book.title}
          </li>
        </ol>
      </nav>

      <div className="row g-5">
        {/* Left Side: Cover and Action Buttons */}
        <div className="col-12 col-md-5 col-lg-4">
          <div className={styles.coverSection}>
            <div className={styles.imageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.image}
                alt={book.title}
                className={styles.coverImage}
              />
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.readBtn}>Read</button>
              <button className={styles.chatBtn}>Chat Now</button>
            </div>
          </div>
        </div>

        {/* Right Side: Details, Specifications, Author, Reviews */}
        <div className="col-12 col-md-7 col-lg-8">
          <div className={styles.detailsHeader}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h1 className={styles.title}>{book.title}</h1>
                <p className={styles.authorLine}>
                  Written by : <span className={styles.authorName}>{book.author || "Unknown"}</span>
                </p>
              </div>
              <button
                className={`${styles.wishlistBtn} ${isLiked ? styles.liked : ""}`}
                onClick={() => setIsLiked(!isLiked)}
                aria-label="Add to wishlist"
              >
                <FiHeart className={isLiked ? styles.heartFilled : ""} size={20} />
              </button>
            </div>

            {/* Tags list */}
            {book.tags && book.tags.length > 0 && (
              <div className={styles.tagsContainer}>
                {book.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* About Section */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>About the Book</h2>
            <div className={styles.aboutContent}>
              <p className={readMore ? "" : styles.truncatedText}>
                {book.description}
              </p>
              <button
                className={styles.readMoreBtn}
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read less ▲" : "Read more ▼"}
              </button>
            </div>
          </div>

          {/* Product Details Specs Table */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Product Details</h2>
            <div className={styles.specsTable}>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Publisher :</span>
                <span className={styles.specValue}>{book.publisher || "N/A"}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Publication date :</span>
                <span className={styles.specValue}>{book.publishedDate || "N/A"}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Language :</span>
                <span className={styles.specValue}>{book.language || "N/A"}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Print length :</span>
                <span className={styles.specValue}>
                  {book.pages ? `${book.pages} pages` : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* About the Author */}
          {book.author && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>About the Author</h2>
              <div className={styles.authorCard}>
                <Link href={`/authors/${encodeURIComponent(book.author)}`} className={styles.authorAvatarWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={book.authorImage || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"}
                    alt={book.author}
                    className={styles.authorAvatar}
                  />
                </Link>
                <div className={styles.authorInfo}>
                  <Link href={`/authors/${encodeURIComponent(book.author)}`}>
                    <h3 className={styles.authorCardName}>{book.author}</h3>
                  </Link>
                  <p className={styles.authorBio}>
                    {book.authorBio ||
                      `${book.author} is a highly acclaimed writer known for their captivating literature storytelling.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reviews list */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Reviews</h2>
            <div className={styles.reviewsList}>
              {book.reviewsList && book.reviewsList.length > 0 ? (
                book.reviewsList.map((rev, idx) => (
                  <div key={idx} className={styles.reviewCard}>
                    <div className={styles.reviewerAvatar}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80`}
                        alt={rev.name}
                      />
                    </div>
                    <div className={styles.reviewContent}>
                      <h4 className={styles.reviewerName}>{rev.name}</h4>
                      <p className={styles.reviewText}>{rev.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noReviews}>No reviews yet. Be the first to write a review!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* You Might Also Like Slider grid */}
      <section className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>You might also like</h2>
        <div className={styles.finalContainerRow}>
          {finalRelated.map((relatedBook) => (
            <div key={relatedBook.id}>
              <Card product={relatedBook} variant="might" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
