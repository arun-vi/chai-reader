"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Hero from "@/components/Hero/Hero";
import Loader from "@/components/Loader/Loader";
import GenresBar from "@/components/GenresBar/GenresBar";
import NewArrivals from "@/components/NewArrivals/NewArrivals";
import RecommendedForYou from "@/components/RecommendedForYou/RecommendedForYou";
import BestSellers from "@/components/BestSellers/BestSellers";
import SpeakWithAuthors from "@/components/SpeakWithAuthors/SpeakWithAuthors";
import CategorySection from "@/components/CategorySection/CategorySection";
import FamousAuthors from "@/components/FamousAuthors/FamousAuthors";
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

  const speakAuthors = [
    {
      author: "J.K. Rowling",
      portrait: "/images/author-list1.png",
      bookId: 4,
      bookTitle: "Harry Potter and the Sorcerer's Stone"
    },
    {
      author: "ZeeverseVault",
      portrait: "/images/author-list2.png",
      bookId: 1,
      bookTitle: "Death before Breakfast"
    },
    {
      author: "Kathryn Bywaters",
      portrait: "/images/author-list3.png",
      bookId: 2,
      bookTitle: "The Past Is Rising"
    }
  ];

  const famousAuthors = [
    { name: "J.K. Rowling", avatar: "/images/famous-auth1.png" },
    { name: "Chetan Bhagat", avatar: "/images/famous-auth2.png" },
    { name: "J.K. Rowling", avatar: "/images/famous-auth3.png" },
    { name: "Arundhati Roy", avatar: "/images/famous-auth4.png" },
    { name: "Ashwin", avatar: "/images/famous-auth5.png" },
    { name: "J.K. Rowling", avatar: "/images/famous-auth1.png" },
    { name: "Chetan Bhagat", avatar: "/images/famous-auth2.png" }
  ];

  return (
    <div className={styles.home}>
      <div className={styles.heroBG}>
        <Hero
          title="The Echo of our Silent Pages"
          subtitle="The Echo of our Silent Pages"
          description="A global publishing technology pavilion designed to run alongside major international book fairs. Discover thousands of stories and connect with their creators."
          ctaLink="/products"
          imageSrc="/images/heroRight.png"
        />
        <GenresBar categories={categories} />
      </div>

      <NewArrivals books={products.slice(0, 6)} />
      <RecommendedForYou />
      <BestSellers books={products.filter(p => p.rating >= 4.6).slice(0, 5)} />
      <SpeakWithAuthors authors={speakAuthors} />

      <CategorySection
        title="Crime Fiction"
        description="Trending books among readers"
        books={products.filter(p => p.category === "crime-fiction").slice(0, 6)}
        viewAllHref="/products?category=crime-fiction"
      />
      <CategorySection
        title="Non Fiction Books"
        description="Trending books among readers"
        books={products.filter(p => p.category === "self-help" || p.category === "business").slice(0, 6)}
        viewAllHref="/products?category=self-help"
      />
      <FamousAuthors authors={famousAuthors} />
      <CategorySection
        title="Academics"
        description="Trending books among readers"
        books={products.filter(p => p.category === "academics").slice(0, 5)}
        viewAllHref="/products?category=academics"
      />
      <CategorySection
        title="Business"
        description="Trending books among readers"
        books={products.filter(p => p.category === "business").slice(0, 5)}
        viewAllHref="/products?category=business"
      />
      <CategorySection
        title="Tech Books"
        description="Trending books among readers"
        books={products.filter(p => p.category === "tech").slice(0, 6)}
        viewAllHref="/products?category=tech"
      />
      <CategorySection
        title="Classics"
        description="Trending books among readers"
        books={products.filter(p => p.category === "classic").slice(0, 6)}
        viewAllHref="/products?category=classics"
      />
    </div>
  );
}