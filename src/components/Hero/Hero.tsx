"use client";

import React from "react";
import Link from "next/link";
import styles from "./Hero.module.css";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText = "Shop Now",
  ctaLink = "/products",
  imageSrc,
  imageAlt = "Book Showcase",
}: HeroProps) {
  const displayImage = imageSrc || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=350&q=80";

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroCard}>
        <div className="row align-items-center g-4 w-100 m-0">
          <div className="col-12 col-md-7 p-0">
            <div className={styles.content}>
              <h1 className={styles.title}>
                The echo of a <span className={styles.italicText}>Silent Pages</span>
              </h1>
              <p className={styles.description}>{description}</p>
              <div className={styles.ctaWrapper}>
                <Link href={ctaLink} className={styles.ctaLink}>
                  <span>Read our details</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 p-0 d-flex justify-content-center justify-content-md-end">
            <div className={styles.imageContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayImage}
                alt={imageAlt}
                className={styles.heroImage}
              />
              <div className={styles.imageShadow}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}