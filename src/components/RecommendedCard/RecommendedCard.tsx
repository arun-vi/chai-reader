"use client";

import React from "react";
import styles from "@/app/page.module.css";

interface RecommendedCardProps {
  tag: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
}

export default function RecommendedCard({ tag, description, images }: RecommendedCardProps) {
  return (
    <div className={styles.recommendedCard}>
      <div className="column align-items-center g-4 recCardRow">
        <div className="col-12 col-lg-12">
          <div className={styles.recContent}>
            <span className={styles.recTag}>{tag}</span>
            <p className={styles.recDesc}>{description}</p>
          </div>
        </div>
        <div className="col-12 col-lg-12">
          <div className={styles.recBookImages}>
            {images.map((img, index) => (
              <img key={index} src={img.src} alt={img.alt} className={styles.recImage} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}