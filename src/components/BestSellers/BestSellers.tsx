"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Card from "@/components/Card/Card";
import styles from "@/app/page.module.css";
import { Product } from "@/types/product";
import Image from "next/image";

interface BestSellersProps {
  books: Product[];
}

export default function BestSellers({ books }: BestSellersProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <h2>Our Best Sellers</h2>
          <p>The books our readers love most</p>
        </div>
        <div className={styles.arrowContainer}>
          <Image 
          src="/icons/left-arrow-circle.svg" 
          alt="arrow"
          width={40}
          height={40}
          className={styles.arrowIcon}
          />
          <Image 
          src="/icons/right-arrow-circle.svg" 
          alt="arrow"
          width={40}
          height={40}
          className={styles.arrowIcon}
          />
        </div>
      </div>
      <div className={styles.scrollRow}>
        {books.map((book) => (
          <div key={book.id}>
            <Card product={book} variant="simple" />
          </div>
        ))}
      </div>
    </section>
  );
}