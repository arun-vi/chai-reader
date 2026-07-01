"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiTarget, FiEye, FiHeart, FiShield, FiTruck, FiHeadphones } from "react-icons/fi";
import Loader from "@/components/Loader/Loader";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { delay } from "@/utils/helpers";

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
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-chai">
          <h1>About ChaiReader</h1>
          <p>
            We are passionate about technology and committed to bringing you the
            best gadgets and electronics at unbeatable prices.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-chai">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <div className="rounded-4 overflow-hidden">
                <Image
                  src="/images/about-story.jpg"
                  alt="Our story"
                  width={560}
                  height={420}
                  className="w-100 h-auto"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-3">
                <span className="section-tag">Our Story</span>
                <h2 className="section-title-custom">From Passion to Purpose</h2>
                <p className="text-secondary" style={{ lineHeight: 1.8 }}>
                  ChaiReader was founded in 2024 with a simple mission: make premium
                  technology accessible to everyone. What started as a small
                  online store has grown into a trusted destination for tech
                  enthusiasts worldwide.
                </p>
                <p className="text-secondary" style={{ lineHeight: 1.8 }}>
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
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: "var(--color-gray-50)" }}>
        <div className="container-chai">
          <div className="row g-4">
            {values.map((value, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="value-card-chai">
                  <div className="value-icon">
                    <value.icon size={28} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-secondary)", marginBottom: "0.5rem" }}>{value.title}</h3>
                  <p style={{ color: "var(--color-gray-500)", lineHeight: 1.7, fontSize: "var(--text-sm)", margin: 0 }}>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding" style={{ background: "var(--color-secondary)" }}>
        <div className="container-chai">
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-lg-3">
                <div className="stat-card-chai text-center">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-chai">
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="feature-card-chai">
                  <div className="feature-icon">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--color-secondary)", marginBottom: "0.25rem" }}>{feature.title}</h3>
                    <p style={{ color: "var(--color-gray-500)", fontSize: "var(--text-sm)", lineHeight: 1.6, margin: 0 }}>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}