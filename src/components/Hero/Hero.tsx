"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Button from "@/components/Button/Button";
import styles from "./Hero.module.css";

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText = "Shop Now",
  ctaLink = "/products",
  imageSrc,
  imageAlt,
  reversed = false,
}: HeroProps) {
  return (
    <section className={`${styles.hero} ${reversed ? styles.reversed : ""}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.subtitle}>{subtitle}</span>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
          <div className={styles.actions}>
            <Link href={ctaLink}>
              <Button variant="primary" size="lg">
                {ctaText}
                <FiArrowRight />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={600}
            height={500}
            className={styles.image}
            priority
          />
        </div>
      </div>
    </section>
  );
}