"use client";

import React, { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import Loader from "@/components/Loader/Loader";
import Button from "@/components/Button/Button";
import { CONTACT_INFO } from "@/lib/constants";
import { delay } from "@/utils/helpers";
import styles from "./page.module.css";

const contactMethods = [
  {
    icon: FiMail,
    label: "Email Us",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: FiPhone,
    label: "Call Us",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
  },
  {
    icon: FiMapPin,
    label: "Visit Us",
    value: CONTACT_INFO.address,
  },
  {
    icon: FiClock,
    label: "Working Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM",
  },
];

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      await delay(500);
      setIsLoading(false);
    };
    load();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  if (isLoading) {
    return <Loader fullPage variant="spinner" text="Loading contact page..." />;
  }

  return (
    <div className={styles.contactPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Get in Touch</h1>
          <p className={styles.heroDescription}>
            Have a question, feedback, or just want to say hello? We'd love
            to hear from you.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Contact Methods */}
          <div className={styles.methods}>
            {contactMethods.map((method, index) => (
              <div key={index} className={styles.methodCard}>
                <div className={styles.methodIcon}>
                  <method.icon size={24} />
                </div>
                <div>
                  <h3 className={styles.methodLabel}>{method.label}</h3>
                  {method.href ? (
                    <a href={method.href} className={styles.methodValue}>
                      {method.value}
                    </a>
                  ) : (
                    <p className={styles.methodValue}>{method.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Send Us a Message</h2>
            <p className={styles.formDescription}>
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
            {isSubmitted ? (
              <div className={styles.successMessage}>
                <FiSend size={32} />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Product Support</option>
                    <option value="order">Order Status</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`${styles.input} ${styles.textarea}`}
                    rows={6}
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  <FiSend />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}