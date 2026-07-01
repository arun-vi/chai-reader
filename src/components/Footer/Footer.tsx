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
import { SITE_NAME, NAV_LINKS, CONTACT_INFO } from "@/lib/constants";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/logo.svg"
                alt={SITE_NAME}
                width={32}
                height={32}
              />
              <span className={styles.logoText}>{SITE_NAME}</span>
            </Link>
            <p className={styles.description}>
              Your premium destination for cutting-edge technology and gadgets.
              We bring the latest innovations right to your doorstep.
            </p>
            <div className={styles.social}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Categories</h3>
            <ul className={styles.linkList}>
              <li><Link href="/products" className={styles.link}>Laptops</Link></li>
              <li><Link href="/products" className={styles.link}>Headphones</Link></li>
              <li><Link href="/products" className={styles.link}>Smartphones</Link></li>
              <li><Link href="/products" className={styles.link}>Tablets</Link></li>
              <li><Link href="/products" className={styles.link}>Accessories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact Us</h3>
            <ul className={styles.contactList}>
              <li>
                <FiMail className={styles.contactIcon} />
                <a href={`mailto:${CONTACT_INFO.email}`} className={styles.link}>
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <FiPhone className={styles.contactIcon} />
                <a href={`tel:${CONTACT_INFO.phone}`} className={styles.link}>
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <FiMapPin className={styles.contactIcon} />
                <span className={styles.link}>{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <button className={styles.scrollTop} onClick={scrollToTop} aria-label="Scroll to top">
            <FiArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}