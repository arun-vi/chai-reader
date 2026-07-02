"use client";

import React from "react";
import RecommendedCard from "@/components/RecommendedCard/RecommendedCard";
import styles from "@/app/page.module.css";

export default function RecommendedForYou() {
  const cards = [
    {
      tag: "Recommended For You",
      description: "A global publishing technology pavilion designed to run alongside major international book fairs.",
      images: [
        { src: "/images/recommend-img1.png", alt: "Recommend 1" },
        { src: "/images/recommend-img2.png", alt: "Recommend 2" },
        { src: "/images/recommend-img3.png", alt: "Recommend 3" },
        { src: "/images/recommend-img4.png", alt: "Recommend 4" }
      ]
    },
    {
      tag: "Recommended For You",
      description: "A global publishing technology pavilion designed to run alongside major international book fairs.",
      images: [
        { src: "/images/recommend-img5.png", alt: "Recommend 5" },
        { src: "/images/recommend-img6.png", alt: "Recommend 6" },
        { src: "/images/recommend-img7.png", alt: "Recommend 7" },
        { src: "/images/recommend-img8.png", alt: "Recommend 8" }
      ]
    }
  ];

  return (
    <section className={styles.recommendedSection}>
      {cards.map((card, index) => (
        <RecommendedCard key={index} {...card} />
      ))}
    </section>
  );
}