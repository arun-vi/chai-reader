'use client';

import React from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";
import GenresBar from "@/components/GenresBar/GenresBar";
import NewArrivals from "@/components/NewArrivals/NewArrivals";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import styles from "./page.module.css";

// Lazy load below-fold components with no SSR to reduce initial bundle
const RecommendedForYou = dynamic(() => import("@/components/RecommendedForYou/RecommendedForYou"), { ssr: false });
const BestSellers = dynamic(() => import("@/components/BestSellers/BestSellers"), { ssr: false });
const SpeakWithAuthors = dynamic(() => import("@/components/SpeakWithAuthors/SpeakWithAuthors"), { ssr: false });
const CategorySection = dynamic(() => import("@/components/CategorySection/CategorySection"), { ssr: false });
const FamousAuthors = dynamic(() => import("@/components/FamousAuthors/FamousAuthors"), { ssr: false });

export default function Home() {
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

      <NewArrivals books={products.slice(0, 6).map(product => ({
        ...product,
        image: product.id === 1 ? "/images/arrival-img1.png" :
               product.id === 2 ? "/images/arrival-img2.png" :
               product.id === 3 ? "/images/arrival-img3.png" :
               product.id === 4 ? "/images/arrival-img4.png" :
               product.id === 5 ? "/images/arrival-img5.png" :
               product.id === 6 ? "/images/arrival-img6.png" :
               product.image
      }))} />
      <React.Suspense fallback={<div style={{ height: "200px", opacity: 0.5 }} />}>
        <RecommendedForYou />
      </React.Suspense>
      <React.Suspense fallback={<div style={{ height: "200px", opacity: 0.5 }} />}>
        <BestSellers books={products.filter(p => p.rating >= 4.6).slice(0, 5)} />
      </React.Suspense>
      <React.Suspense fallback={<div style={{ height: "200px", opacity: 0.5 }} />}>
        <SpeakWithAuthors authors={speakAuthors} />
      </React.Suspense>

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