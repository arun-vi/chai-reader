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

  // Create recommended products with custom images
  const recommendedProducts1 = [
    { ...products[0], image: "/images/recommend-img1.png" },
    { ...products[1], image: "/images/recommend-img2.png" },
    { ...products[2], image: "/images/recommend-img3.png" },
    { ...products[3], image: "/images/recommend-img4.png" }
  ];

  const recommendedProducts2 = [
    { ...products[0], image: "/images/recommend-img5.png" },
    { ...products[1], image: "/images/recommend-img6.png" },
    { ...products[2], image: "/images/recommend-img7.png" },
    { ...products[3], image: "/images/recommend-img8.png" }
  ];

  // Filter books for different sections
  const newArrivals = products.slice(0, 6);
  const bestSellers = products.filter(p => p.rating >= 4.6).slice(0, 5);
  const crimeFiction = products.filter(p => p.category === "crime-fiction").slice(0, 6);
  const nonFiction = products.filter(p => p.category === "self-help" || p.category === "business").slice(0, 6);
  const academics = products.filter(p => p.category === "academics").slice(0, 5);
  const business = products.filter(p => p.category === "business").slice(0, 5);
  const techBooks = products.filter(p => p.category === "tech").slice(0, 6);
  const classics = products.filter(p => p.category === "classic").slice(0, 6);

  // Extract unique authors
  const famousAuthors = [
    {
      name: "J.K. Rowling",
      avatar: "/images/famous-auth1.png"
    },
    {
      name: "Chetan Bhagat",
      avatar: "/images/famous-auth2.png"
    },
    {
      name: "J.K. Rowling",
      avatar: "/images/famous-auth3.png"
    },
    {
      name: "Arundhati Roy",
      avatar: "/images/famous-auth4.png"
    },
    {
      name: "Ashwin",
      avatar: "/images/famous-auth5.png"
    },
    {
      name: "J.K. Rowling",
      avatar: "/images/famous-auth1.png"
    },
    {
      name: "Chetan Bhagat",
      avatar: "/images/famous-auth2.png"
    }
  ];

  // Authors for "Speak with Authors" section
  const speakAuthors = [
    {
      author: "J.K. Rowling",
      portrait: "/images/author-list1.png",
      bookId: 4,
      bookTitle: "Harry Potter and the Sorcerer's Stone",
      bookCover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=150&q=80"
    },
    {
      author: "ZeeverseVault",
      portrait: "/images/author-list2.png",
      bookId: 1,
      bookTitle: "Death before Breakfast",
      bookCover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=150&q=80"
    },
    {
      author: "Kathryn Bywaters",
      portrait: "/images/author-list3.png",
      bookId: 2,
      bookTitle: "The Past Is Rising",
      bookCover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className={styles.home}>
      {/* Hero Banner Section */}
    <div className={styles.heroBG}>
      <Hero
        title="The Echo of our Silent Pages"
        subtitle="The Echo of our Silent Pages"
        description="A global publishing technology pavilion designed to run alongside major international book fairs. Discover thousands of stories and connect with their creators."
        ctaLink="/products"
        imageSrc="/images/heroRight.png"
      />

      {/* Shop by Genre pills section */}
      <section className={styles.genresSection}>
        <h3 className={styles.genreTitle}>Dive into Different Genres</h3>
        <div className={styles.genreBar}>
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={styles.genrePill}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/genres-img${index + 1}.png`}
                alt={cat.name}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
      {/* New Arrivals Cover Gallery */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h6 className={styles.arrivalHeading}>New Arrivals</h6>
            <span className={styles.arrivalSub}>Trending books among readers</span>
          </div>
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
          <div className="column align-items-center g-4 recCardRow">
            <div className="col-12 col-lg-12">
              <div className={styles.recContent}>
                <span className={styles.recTag}>Recommended For You</span>
                <p className={styles.recDesc}>
                  A global publishing technology pavilion designed to run alongside major international book fairs.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-12">
              <div className={styles.recBookImages}>
                <img src="/images/recommend-img1.png" alt="Recommend 1" className={styles.recImage} />
                <img src="/images/recommend-img2.png" alt="Recommend 2" className={styles.recImage} />
                <img src="/images/recommend-img3.png" alt="Recommend 3" className={styles.recImage} />
                <img src="/images/recommend-img4.png" alt="Recommend 4" className={styles.recImage} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.recommendedCard}>
          <div className="column align-items-center g-4 recCardRow">
            <div className="col-12 col-lg-12">
              <div className={styles.recContent}>
                <span className={styles.recTag}>Recommended For You</span>
                <p className={styles.recDesc}>
                  A global publishing technology pavilion designed to run alongside major international book fairs.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-12">
              <div className={styles.recBookImages}>
                <img src="/images/recommend-img5.png" alt="Recommend 5" className={styles.recImage} />
                <img src="/images/recommend-img6.png" alt="Recommend 6" className={styles.recImage} />
                <img src="/images/recommend-img7.png" alt="Recommend 7" className={styles.recImage} />
                <img src="/images/recommend-img8.png" alt="Recommend 8" className={styles.recImage} />
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
        <div className={styles.scrollRow}>
          {bestSellers.map((book) => (
            <div key={book.id}>
              <Card product={book} variant="simple" />
            </div>
          ))}
        </div>
      </section>

      {/* Speak with Authors Section */}
      <section className={styles.authorsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2>Speak with Authors</h2>
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
              <p>Trending books among readers</p>
            </div>
            <Link href="/products?category=crime-fiction" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.scrollRow}>
            {crimeFiction.map((book) => (
              <div key={book.id}>
                <Card product={book} variant="simple" />
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
              <p>Trending books among readers</p>
            </div>
            <Link href="/products?category=self-help" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.scrollRow}>
            {nonFiction.map((book) => (
              <div key={book.id}>
                <Card product={book} variant="simple" />
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
              <p>Trending books among readers</p>
            </div>
            <Link href="/products?category=academics" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.scrollRow}>
            {academics.map((book) => (
              <div key={book.id}>
                <Card product={book} variant="simple" />
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
              <p>Trending books among readers</p>
            </div>
            <Link href="/products?category=business" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.scrollRow}>
            {business.map((book) => (
              <div key={book.id}>
                <Card product={book} variant="simple" />
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
              <p>Trending books among readers</p>
            </div>
            <Link href="/products?category=tech" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.scrollRow}>
            {techBooks.map((book) => (
              <div key={book.id}>
                <Card product={book} variant="simple" />
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
              <p>Trending books among readers</p>
            </div>
            <Link href="/products?category=classics" className={styles.viewAll}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.scrollRow}>
            {classics.map((book) => (
              <div key={book.id}>
                <Card product={book} variant="simple" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}