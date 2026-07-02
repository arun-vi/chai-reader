"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/types/product";
import styles from "@/app/page.module.css";

interface GenresBarProps {
  categories: Category[];
}

export default function GenresBar({ categories }: GenresBarProps) {
  return (
    <section className={styles.genresSection}>
      <h3 className={styles.genreTitle}>Dive into Different Genres</h3>
      <div className={styles.genreBar}>
        {categories.map((cat, index) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className={styles.genrePill}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/genres-img${index + 1}.png`}
              alt={cat.name}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
