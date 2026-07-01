"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiTarget, FiEye, FiHeart, FiShield, FiTruck, FiHeadphones } from "react-icons/fi";
import Loader from "@/components/Loader/Loader";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { delay } from "@/utils/helpers";
import styles from "./page.module.css";

const values = [
  {
    icon: FiTarget,
    title: "Our Mission",
    description:
      "To make cutting-edge technology accessible to everyone by providing premium products at competitive prices with exceptional customer service.",
  },
  {
    icon: FiEye,
    title: "Our Vision",
    description:
      "To become the most trusted online destination for tech enthusiasts worldwide, known for quality, reliability, and innovation.",
  },
  {
    icon: FiHeart,
    title: "Our Values",
    description:
      "Integrity, transparency, and customer satisfaction are at the core of everything we do. We believe in building lasting relationships with our customers.",
  },
];

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "500+", label: "Products" },
  { number: "50+", label: "Brands" },
  { number: "99%", label: "Satisfaction" },
];

const features = [
  {
    icon: FiShield,
    title: "Quality Guarantee",
    description: "All products are verified for authenticity and quality",
  },
  {
    icon: FiTruck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50 worldwide",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support for your needs",
  },
];

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await delay(500);
      setIsLoading(false);
    };
    load();
  }, []);

  if (isLoading) {
    return <Loader fullPage variant="spinner" text="Loading about us..." />;
  }

  return (
    <div className={styles.aboutPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About ChaiReader</h1>
            <p className={styles.heroDescription}>
              We are passionate about technology and committed to bringing you the
              best gadgets and electronics at unbeatable prices.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.story}>
            <div className={styles.storyImage}>
              <Image
                src="/images/about-story.jpg"
                alt="Our story"
                width={560}
                height={420}
                className={styles.storyImg}
              />
            </div>
            <div className={styles.storyContent}>
              <span className={styles.tag}>Our Story</span>
              <h2 className={styles.sectionTitle}>From Passion to Purpose</h2>
              <p className={styles.storyText}>
                ChaiReader was founded in 2024 with a simple mission: make premium
                technology accessible to everyone. What started as a small
                online store has grown into a trusted destination for tech
                enthusiasts worldwide.
              </p>
              <p className={styles.storyText}>
                We carefully curate every product in our collection, ensuring
                that each item meets our rigorous standards for quality,
                performance, and value. Our team of tech experts tests and
                reviews products before they make it to our shelves.
              </p>
              <Link href="/products">
                <Button variant="primary" size="lg">
                  Explore Products <FiArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`${styles.section} ${styles.valuesSection}`}>
        <div className={styles.container}>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <value.icon size={28} />
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}