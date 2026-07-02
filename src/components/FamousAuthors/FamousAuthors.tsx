"use client";

import React from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";

interface Author {
  name: string;
  avatar: string;
}

interface FamousAuthorsProps {
  authors: Author[];
}

export default function FamousAuthors({ authors }: FamousAuthorsProps) {
  return (
    <section className={styles.famousAuthorsSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <h2>Famous Authors</h2>
        </div>
      </div>
      <div className={styles.famousAuthorsScroll}>
        {authors.map((author, index) => (
          <Link
            key={index}
            href={`/authors/${encodeURIComponent(author.name)}`}
            className={styles.authorAvatarCard}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author.avatar}
              alt={author.name}
              className={styles.avatarImage}
            />
            <span className={styles.avatarName}>{author.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}