"use client";

import React from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";

interface Book {
  id: number;
  title: string;
  image: string;
}

interface NewArrivalsProps {
  books: Book[];
}

export default function NewArrivals({ books }: NewArrivalsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <h6 className={styles.arrivalHeading}>New Arrivals</h6>
          <span className={styles.arrivalSub}>Trending books among readers</span>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        {books.map((book) => (
          <div key={book.id} className={styles.bookCoverWrapper}>
            <Link href={`/products/${book.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.image}
                alt={book.title}
                className={styles.coverImage}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}