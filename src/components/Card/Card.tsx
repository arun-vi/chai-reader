"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiStar, FiShoppingCart } from "react-icons/fi";
import { Product } from "@/types/product";
import { formatPrice, getDiscountPercentage } from "@/utils/helpers";
import Button from "@/components/Button/Button";
import styles from "./Card.module.css";

interface CardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal";
}

export default function Card({ product, variant = "default" }: CardProps) {
  const discount =
    product.originalPrice
      ? getDiscountPercentage(product.price, product.originalPrice)
      : 0;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FiStar key={i} className={styles.starFilled} />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<FiStar key={i} className={styles.starHalf} />);
      } else {
        stars.push(<FiStar key={i} className={styles.starEmpty} />);
      }
    }
    return stars;
  };

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.imageWrapper}>
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className={styles.image}
          />
        </Link>
        {discount > 0 && (
          <span className={styles.badge}>-{discount}%</span>
        )}
        {!product.inStock && (
          <span className={`${styles.badge} ${styles.outOfStock}`}>
            Out of Stock
          </span>
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <Link href={`/products/${product.id}`}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>

        {variant !== "compact" && (
          <p className={styles.description}>{product.description}</p>
        )}

        <div className={styles.rating}>
          <div className={styles.stars}>{renderStars()}</div>
          <span className={styles.reviews}>({product.reviews})</span>
        </div>

        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.inStock && (
            <Button size="sm" variant="primary" ariaLabel="Add to cart">
              <FiShoppingCart />
              <span>Add</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}