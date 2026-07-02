"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMail, FiPhone, FiMapPin, FiArrowUp } from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      {/* Background SVG Waves at the top of the footer or bottom */}


      <div className={styles.footerContent}>
        <div className="container-chai">
          <div className="row g-4">
            {/* Brand column */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className={styles.brand}>
                <Link href="/" className={styles.logo}>
                  <Image
                    src="/icons/logo.svg"
                    alt="ChaiReader"
                    width={160}
                    height={32}
                  />
                </Link>
                <p className={styles.description}>
                  Chai Reader is an AI-powered book commerce platform designed to transform how people discover and experience books—through reading, chatting with books, and more. It is owned and operated by Ailaysa Technologies Pvt Ltd.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-12 col-md-6 col-lg-2">
              <div className={styles.column}>
                <h3 className={styles.columnTitle}>Quick Links</h3>
                <ul className={styles.linkList}>
                  <li>
                    <Link href="/about" className={styles.link}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className={styles.link}>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className={styles.link}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className={styles.link}>
                      FAQ
                    </Link>
                  </li>
                   <li>
                    <Link href="/products" className={styles.link}>
                      Support / Help Center
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Categories */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className={styles.column}>
                <h3 className={styles.columnTitle}>For Partners</h3>
                <ul className={styles.linkList}>
                  <li>
                    <Link href="/products?category=classics" className={styles.link}>
                      For Authors
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=self-help" className={styles.link}>
                      For Publishers
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=business" className={styles.link}>
                      Become a Partner
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className={styles.column}>
                <h3 className={styles.columnTitle}>Legal</h3>
                <ul className={styles.contactList}>
                  <li>
                    <FiMail className={styles.contactIcon} />
                    <a href="mailto:hello@chaireader.com" className={styles.link}>
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <FiPhone className={styles.contactIcon} />
                    <a href="tel:+15551234567" className={styles.link}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <FiMapPin className={styles.contactIcon} />
                    <span className={styles.link}>
                      Cookie Policy
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
            <div className={styles.wavesContainer}>
        <svg
          className={styles.waves}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            />
          </defs>
          <g className={styles.parallax}>
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(219,234,254,0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(191,219,254,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(147,197,253,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#E0F2FE" />
          </g>
        </svg>
      </div>
    </footer>
  );
}