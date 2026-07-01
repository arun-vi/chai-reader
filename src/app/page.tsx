"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import Hero from "@/components/Hero/Hero";
import Card from "@/components/Card/Card";
import Loader from "@/components/Loader/Loader";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { delay } from "@/utils/helpers";
import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await delay(400);
      setIsLoading(false);
    };
    load();
  }, []);

  if (isLoading) {
    return <Loader fullPage variant="spinner" text="Opening ChaiReader..." />;
  }

  // Filter books for different sections
  const newArrivals = products.slice(0, 6);
  const bestSellers = products.filter(p => p.rating >= 4.6).slice(0, 5);
  const crimeFiction = products.filter(p => p.category === "crime-fiction").slice(0, 5);
  const nonFiction = products.filter(p => p.category === "self-help" || p.category === "business").slice(0, 5);
  const academics = products.filter(p => p.category === "academics").slice(0, 5);
  const business = products.filter(p => p.category === "business").slice(0, 5);
  const techBooks = products.filter(p => p.category === "tech").slice(0, 5);
  const classics = products.filter(p => p.category === "classics").slice(0, 5);

  // Extract unique authors
  const famousAuthors = [
    {
      name: "ZeeverseVault",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Kathryn Bywaters",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "J.K. Rowling",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Morgan Housel",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "George S. Clason",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "H.C. Verma",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  // Authors for "Speak with Authors" section
  const speakAuthors = [
    {
      author: "J.K. Rowling",
      portrait: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
      bookId: 4,
      bookTitle: "Harry Potter and the Sorcerer's Stone",
      bookCover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=150&q=80"
    },
    {
      author: "ZeeverseVault",
      portrait: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
      bookId: 1,
      bookTitle: "Death before Breakfast",
      bookCover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=150&q=80"
    },
    {
      author: "Kathryn Bywaters",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
      bookId: 2,
      bookTitle: "The Past Is Rising",
      bookCover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className={styles.home}>
      {/* Hero Banner Section */}
      <Hero
        title="The Echo of our Silent Pages"
        subtitle="The Echo of our Silent Pages"
        description="A global publishing technology pavilion designed to run alongside major international book fairs. Discover thousands of stories and connect with their creators."
        ctaLink="/products"
      />

      {/* Shop by Genre pills section */}
      <section className={styles.genresSection}>
        <h3 className={styles.genreTitle}>Shop into Different Genres</h3>
        <div className={styles.genreBar}>
          <Link href="/products" className={styles.genrePill}>
            All Genres
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={styles.genrePill}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals Cover Gallery */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2>New Arrivals</h2>
            <p>Trending books among readers</p>
          </div>
          <Link href="/products?filter=new" className={styles.viewAll}>
            View All <FiArrowRight />
          </Link>
        </div>
        <div className={styles.scrollContainer}>
          {newArrivals.map((book) => (
            <div key={book.id} className={styles.bookCoverWrapper}>
              <Link href={`/products/${book.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.image}
                  alt={book.title}
                  className={styles.coverImage}
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended For You Panel Card */}
      <section className={styles.recommendedSection}>
        <div className={styles.recommendedCard}>
          <div className="row align-items-center g-4 recCardRow">
            <div className="col-12 col-lg-5">
              <div className={styles.recContent}>
                <span className={styles.recTag}>Recommended For You</span>
                <h2 className={styles.recTitle}>Find books you love and enjoy them.</h2>
                <p className={styles.recDesc}>
                  A curated list of books handpicked by our readers and literature experts specifically tailored for your reading journey.
                </p>
                <Link href="/products?filter=recommended" className={styles.viewAll}>
                  Explore Recommended <FiArrowRight />
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="row g-3">
                {products.slice(0, 3).map((book) => (
                  <div key={book.id} className="col-12 col-sm-4">
                    <Card product={book} variant="compact" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Best Sellers Grid */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2>Our Best Sellers</h2>
            <p>The books our readers love most</p>
          </div>
          <Link href="/products?filter=bestsellers" className={styles.viewAll}>
            View All <FiArrowRight />
          </Link>
        </div>
        <div className="row g-3 g-lg-4">
          {bestSellers.slice(0, 5).map((book) => (
            <div key={book.id} className="col-6 col-sm-4 col-md-3 col-lg-2.4 col-xl-2.4 flex-fill">
              <Card product={book} />
            </div>
          ))}
        </div>
      </section>

      {/* Speak with Authors Section */}
      <section className={styles.authorsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2>Speak with Authors</h2>
            <p>Interact directly with creators</p>
          </div>
        </div>
        <div className={styles.authorList}>
          {speakAuthors.map((authorData, index) => (
            <div key={index} className={styles.authorBookCard}>
              <div className={styles.authorPortraitWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={authorData.portrait}
                  alt={authorData.author}
                  className={styles.authorPortrait}
                />
              </div>
              <div className={styles.authorBookDetails}>
                <div>
                  <Link href={`/authors/${encodeURIComponent(authorData.author)}`}>
                    <h4 className={styles.authorBookTitle}>{authorData.author}</h4>
                  </Link>
                  <p className={styles.authorBookName}>{authorData.bookTitle}</p>
                </div>
                <Link
                  href={`/products/${authorData.bookId}`}
                  className={styles.authorChatBtn}
                >
                  Chat Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Crime Fiction Row */}
      {crimeFiction.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleGroup}>
              <h2>Crime Fiction</h2>
              <p>Solve mysteries alongside world-class detectives</p>
            </div>
            <Link href="/products?category=crime-fiction" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="row g-3 g-lg-4">
            {crimeFiction.map((book) => (
              <div key={book.id} className="col-6 col-sm-4 col-md-3 col-lg-2.4 col-xl-2.4 flex-fill">
                <Card product={book} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Non Fiction / Self Help Row */}
      {nonFiction.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleGroup}>
              <h2>Non Fiction Books</h2>
              <p>True stories, ideas, and strategies for life</p>
            </div>
            <Link href="/products?category=self-help" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="row g-3 g-lg-4">
            {nonFiction.slice(0, 5).map((book) => (
              <div key={book.id} className="col-6 col-sm-4 col-md-3 col-lg-2.4 col-xl-2.4 flex-fill">
                <Card product={book} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Famous Authors Avatar Slider */}
      <section className={styles.famousAuthorsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2>Famous Authors</h2>
            <p>Popular creators writing on ChaiReader</p>
          </div>
        </div>
        <div className={styles.famousAuthorsScroll}>
          {famousAuthors.map((author, index) => (
            <Link
              key={index}
              href={`/authors/${encodeURIComponent(author.name)}`}
              className={styles.authorAvatarCard}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={author.avatar}
                alt={author.name}
                className={styles.avatarImage}
              />
              <span className={styles.avatarName}>{author.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Academics Section */}
      {academics.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleGroup}>
              <h2>Academics</h2>
              <p>Top textbooks and academic study guides</p>
            </div>
            <Link href="/products?category=academics" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="row g-3 g-lg-4">
            {academics.map((book) => (
              <div key={book.id} className="col-6 col-sm-4 col-md-3 col-lg-2.4 col-xl-2.4 flex-fill">
                <Card product={book} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Business Section */}
      {business.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleGroup}>
              <h2>Business</h2>
              <p>Learn financial management and startup strategies</p>
            </div>
            <Link href="/products?category=business" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="row g-3 g-lg-4">
            {business.map((book) => (
              <div key={book.id} className="col-6 col-sm-4 col-md-3 col-lg-2.4 col-xl-2.4 flex-fill">
                <Card product={book} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech Books Section */}
      {techBooks.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleGroup}>
              <h2>Tech Books</h2>
              <p>Learn programming, design, and tech concepts</p>
            </div>
            <Link href="/products?category=tech" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="row g-3 g-lg-4">
            {techBooks.map((book) => (
              <div key={book.id} className="col-6 col-sm-4 col-md-3 col-lg-2.4 col-xl-2.4 flex-fill">
                <Card product={book} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Classics Section */}
      {classics.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleGroup}>
              <h2>Classics</h2>
              <p>Time-tested masterpieces of literature</p>
            </div>
            <Link href="/products?category=classics" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="row g-3 g-lg-4">
            {classics.map((book) => (
              <div key={book.id} className="col-6 col-sm-4 col-md-3 col-lg-2.4 col-xl-2.4 flex-fill">
                <Card product={book} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}