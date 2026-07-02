"use client";

import React from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";
import Image from "next/image";

interface SpeakAuthor {
  author: string;
  portrait: string;
  bookId: number;
  bookTitle: string;
  bookCover?: string;
}

interface SpeakWithAuthorsProps {
  authors: SpeakAuthor[];
}

export default function SpeakWithAuthors({ authors }: SpeakWithAuthorsProps) {
  return (
    <section className={styles.authorsSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <h2>Speak with Authors</h2>
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
      <div className={styles.authorList}>
        {authors.map((authorData, index) => (
          <div key={index} className={styles.authorBookCard}>
            <div className={styles.authorPortraitWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={authorData.portrait}
                alt={authorData.author}
                className={styles.authorPortrait}
              />
            </div>
            <div className={styles.authorBookDetails}>
              <div>
                <Link href={`/authors/${encodeURIComponent(authorData.author)}`}>
                  <h4 className={styles.authorBookTitle}>{authorData.author}</h4>
                </Link>
                <p className={styles.authorBookName}>{authorData.bookTitle}</p>
              </div>
              <Link
                href={`/products/${authorData.bookId}`}
                className={styles.authorChatBtn}
              >
                Chat Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}