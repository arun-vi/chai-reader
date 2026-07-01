"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiStar, FiHeart } from "react-icons/fi";
import { Product } from "@/types/product";
import styles from "./Card.module.css";

interface CardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal" | "simple";
}

export default function Card({ product, variant = "default" }: CardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FiStar key={i} className={styles.starFilled} />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<FiStar key={i} className={styles.starFilled} />); // simplify half stars
      } else {
        stars.push(<FiStar key={i} className={styles.starEmpty} />);
      }
    }
    return stars;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  if (variant === "horizontal") {
    return (
      <div className={`${styles.card} ${styles.horizontal}`}>
        <div className={styles.imageWrapper}>
          <Link href={`/products/${product.id}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
          </Link>
          <button
            className={`${styles.wishlistBtn} ${isLiked ? styles.active : ""}`}
            onClick={handleLike}
            aria-label="Add to wishlist"
          >
            <FiHeart className={isLiked ? styles.heartFilled : ""} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.headerInfo}>
            {/* <span className={styles.author}>{product.author || "Unknown Author"}</span> */}
            <Link href={`/products/${product.id}`}>
              <h3 className={styles.title}>{product.title}</h3>
            </Link>
            <p className={styles.description}>{product.description}</p>
          </div>

          <div className={styles.footerInfo}>
            {/* <div className={styles.rating}>
              <div className={styles.stars}>{renderStars()}</div>
              <span className={styles.reviews}>({product.reviews})</span>
            </div> */}
            <Link href={`/products/${product.id}`} className={styles.chatBtn}>
              Read & Chat
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className={`${styles.card} ${styles[variant]} ${variant === "simple" ? styles.simple : ""}`}>
        <div className={`${styles.imageWrapper} ${variant === "simple" ? styles.simpleImageWrapper : ""}`}>
        <Link href={`/products/${product.id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
          />
        </Link>
        <button
          className={`${styles.wishlistBtn} ${isLiked ? styles.active : ""}`}
          onClick={handleLike}
          aria-label="Add to wishlist"
        >
          <FiHeart className={isLiked ? styles.heartFilled : ""} />
        </button>
      </div>

      <div className={styles.content}>
        {variant !== "simple" && (
          <span className={styles.author}>{product.author || "Unknown Author"}</span>
        )}
        <Link className={styles.links} href={`/products/${product.id}`}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>
        <span className={styles.authorName}>Morgan Housel </span>
        {variant !== "compact" && variant !== "simple" && (
          <div className={styles.rating}>
            <div className={styles.stars}>{renderStars()}</div>
            <span className={styles.reviews}>({product.reviews})</span>
          </div>
        )}

        <div className={styles.footer}>
          <Link href={`/products/${product.id}`} className={styles.chatBtn}>
            Read & Chat
          </Link>
        </div>
      </div>
    </div>
  );
}