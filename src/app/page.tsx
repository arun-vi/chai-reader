"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Hero from "@/components/Hero/Hero";
import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { testimonials } from "@/data/testimonials";
import { formatPrice } from "@/utils/helpers";
import { delay } from "@/utils/helpers";
import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const load = async () => {
      await delay(600);
      setIsLoading(false);
    };
    load();
  }, []);

  const featuredProducts = products.filter((p) => p.featured);
  const nextTestimonial = () =>
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  if (isLoading) {
    return <Loader fullPage variant="spinner" text="Loading amazing deals..." />;
  }

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <Hero
        title="Discover the Future of Technology"
        subtitle="Welcome to ChaiReader"
        description="Explore our curated collection of premium gadgets and cutting-edge electronics. From powerful laptops to immersive audio, find everything you need to stay ahead."
        ctaText="Shop Now"
        ctaLink="/products"
        imageSrc="/images/hero-tech.png"
        imageAlt="Technology showcase"
      />

      {/* Featured Products */}
      <section className={`${styles.section} ${styles.featured}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>Top Picks</span>
              <h2 className={styles.sectionTitle}>Featured Products</h2>
              <p className={styles.sectionDescription}>
                Handpicked products just for you
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                View All <FiArrowRight />
              </Button>
            </Link>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`${styles.section} ${styles.categories}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>Browse</span>
              <h2 className={styles.sectionTitle}>Shop by Category</h2>
              <p className={styles.sectionDescription}>
                Find exactly what you need
              </p>
            </div>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryImage}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className={styles.categoryInfo}>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <span className={styles.categoryCount}>
                    {category.count} items
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className={styles.promo}>
        <div className={styles.container}>
          <div className={styles.promoContent}>
            <div className={styles.promoText}>
              <span className={styles.promoTag}>Limited Offer</span>
              <h2 className={styles.promoTitle}>
                Up to 30% Off on Premium Headphones
              </h2>
              <p className={styles.promoDescription}>
                Experience crystal-clear audio with industry-leading noise
                cancellation. Limited time offer on selected models.
              </p>
              <Link href="/products?category=headphones">
                <Button variant="primary" size="lg">
                  Grab the Deal <FiArrowRight />
                </Button>
              </Link>
            </div>
            <div className={styles.promoImage}>
              <Image
                src="/images/promo-headphones.png"
                alt="Premium Headphones"
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${styles.section} ${styles.testimonials}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>Testimonials</span>
              <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
              <p className={styles.sectionDescription}>
                Trusted by thousands of happy customers
              </p>
            </div>
          </div>
          <div className={styles.testimonialCarousel}>
            <button
              className={styles.carouselBtn}
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={24} />
            </button>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>
                {Array.from({ length: testimonials[activeTestimonial].rating }).map(
                  (_, i) => (
                    <FiStar key={i} className={styles.starFilled} />
                  )
                )}
              </div>
              <p className={styles.testimonialContent}>
                &ldquo;{testimonials[activeTestimonial].content}&rdquo;
              </p>
              <div className={styles.testimonialAuthor}>
                <Image
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  width={48}
                  height={48}
                  className={styles.testimonialAvatar}
                />
                <div>
                  <h4 className={styles.testimonialName}>
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <span className={styles.testimonialRole}>
                    {testimonials[activeTestimonial].role}
                  </span>
                </div>
              </div>
            </div>
            <button
              className={styles.carouselBtn}
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
          <div className={styles.testimonialDots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${
                  i === activeTestimonial ? styles.dotActive : ""
                }`}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className={styles.container}>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>
              Stay Updated with Latest Deals
            </h2>
            <p className={styles.newsletterDescription}>
              Subscribe to our newsletter and get exclusive offers delivered to
              your inbox.
            </p>
            <form
              className={styles.newsletterForm}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
                required
              />
              <Button type="submit" variant="primary" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}