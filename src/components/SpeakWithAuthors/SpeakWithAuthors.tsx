"use client";

import React, { useRef } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.authorsSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <h2>Speak with Authors</h2>
        </div>
        <div className={styles.arrowContainer}>
          <Image
            src="/icons/left-arrow-circle.svg" 
            alt="scroll left"
            width={40}
            height={40}
            className={styles.arrowIcon}
            onClick={() => scroll("left")}
          />
          <Image 
            src="/icons/right-arrow-circle.svg" 
            alt="scroll right"
            width={40}
            height={40}
            className={styles.arrowIcon}
            onClick={() => scroll("right")}
          />
        </div>
      </div>
      <div className={styles.authorList} ref={scrollRef}>
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
