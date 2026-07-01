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
      <section className={`section-padding ${styles.featured}`}>
        <div className="container-chai">
          <div className="section-header">
            <div>
              <span className="section-tag">Top Picks</span>
              <h2 className="section-title-custom">Featured Products</h2>
              <p className="text-muted mb-0">Handpicked products just for you</p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                View All <FiArrowRight />
              </Button>
            </Link>
          </div>
          {/* Bootstrap responsive grid: 1 col on mobile, 2 on sm, 3 on md, 4 on lg */}
          <div className="row g-3 g-lg-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`section-padding ${styles.categories}`}>
        <div className="container-chai">
          <div className="section-header">
            <div>
              <span className="section-tag">Browse</span>
              <h2 className="section-title-custom">Shop by Category</h2>
              <p className="text-muted mb-0">Find exactly what you need</p>
            </div>
          </div>
          {/* Bootstrap responsive grid: 1 col on mobile, 2 on sm, 3 on md+ */}
          <div className="row g-3 g-lg-4">
            {categories.map((category) => (
              <div key={category.id} className="col-12 col-sm-6 col-md-4">
                <Link
                  href={`/products?category=${category.slug}`}
                  className="category-card-chai"
                >
                  <div className="category-img-wrap">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="category-info">
                    <h3 className="category-name">{category.name}</h3>
                    <span className="category-count">
                      {category.count} items
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className={styles.promo}>
        <div className="container-chai">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
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
            </div>
            <div className="col-12 col-lg-6 text-center">
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
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section-padding ${styles.testimonials}`}>
        <div className="container-chai">
          <div className="section-header text-center flex-column align-items-center">
            <div>
              <span className="section-tag">Testimonials</span>
              <h2 className="section-title-custom">What Our Customers Say</h2>
              <p className="text-muted mb-0">Trusted by thousands of happy customers</p>
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
        <div className="container-chai">
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