"use client";

import React from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import Image from "next/image";

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
          <div className={styles.heroRowContainer}>
            <div className={styles.content}>
              <h1 className={styles.title}>
                The echo of a Silent Pages
              </h1>
              <p className={styles.description}>{description}</p>
              <div className={styles.ctaWrapper}>
                <Link href={ctaLink} className={styles.ctaLink}>
                  <span>Explore More</span>
                  <Image
                    src="/icons/rightArrow.svg"
                      alt="Logo"
                      width={37}
                      height={10}
                    />
                </Link>
              </div>
            </div>
            <div className={styles.imageContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayImage}
                alt={imageAlt}
                className={styles.heroImage}
                height={234}
              />
              <div className={styles.imageShadow}></div>
            </div>
          </div>
    
    </section>
  );
}