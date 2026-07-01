"use client";

import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  text?: string;
  fullPage?: boolean;
}

export default function Loader({
  size = "md",
  variant = "spinner",
  text,
  fullPage = false,
}: LoaderProps) {
  const wrapperClass = fullPage ? styles.fullPage : "";

  return (
    <div className={wrapperClass} role="status" aria-label="Loading">
      <div className={`${styles.loader} ${styles[size]} ${styles[variant]}`}>
        {variant === "spinner" && <div className={styles.spinner} />}
        {variant === "dots" && (
          <div className={styles.dots}>
            <span />
            <span />
            <span />
          </div>
        )}
        {variant === "pulse" && <div className={styles.pulse} />}
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}