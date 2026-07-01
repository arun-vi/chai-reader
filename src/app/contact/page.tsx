"use client";

import React, { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import Loader from "@/components/Loader/Loader";
import Button from "@/components/Button/Button";
import { CONTACT_INFO } from "@/lib/constants";
import { delay } from "@/utils/helpers";

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
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-chai">
          <h1>Get in Touch</h1>
          <p>
            Have a question, feedback, or just want to say hello? We'd love
            to hear from you.
          </p>
        </div>
      </section>

      <div className="container-chai">
        <div className="row g-4 py-5 align-items-start">
          {/* Contact Methods */}
          <div className="col-12 col-lg-5">
            <div className="d-flex flex-column gap-3">
              {contactMethods.map((method, index) => (
                <div key={index} className="method-card-chai">
                  <div className="method-icon">
                    <method.icon size={24} />
                  </div>
                  <div>
                    <h5 className="text-uppercase text-muted mb-1" style={{ fontSize: "var(--text-sm)", letterSpacing: "1px", fontWeight: 600 }}>
                      {method.label}
                    </h5>
                    {method.href ? (
                      <a href={method.href} className="text-decoration-none" style={{ color: "var(--color-gray-900)", transition: "color var(--transition-fast)" }}
                         onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--color-primary)"}
                         onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--color-gray-900)"}>
                        {method.value}
                      </a>
                    ) : (
                      <p className="mb-0" style={{ color: "var(--color-gray-900)" }}>{method.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-12 col-lg-7">
            <div className="bg-white border rounded-4 p-4 p-lg-5 shadow-sm">
              <h2 className="fw-bold mb-2" style={{ fontFamily: "var(--font-primary)", color: "var(--color-secondary)" }}>
                Send Us a Message
              </h2>
              <p className="text-muted mb-4">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              {isSubmitted ? (
                <div className="text-center py-5 d-flex flex-column align-items-center gap-3" style={{ color: "var(--color-success)" }}>
                  <FiSend size={32} />
                  <h3 className="fw-bold" style={{ fontFamily: "var(--font-primary)", color: "var(--color-gray-900)" }}>
                    Message Sent Successfully!
                  </h3>
                  <p className="text-muted">Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-medium">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder="John Doe"
                          style={{ borderWidth: 2, padding: "0.75rem 1rem" }}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-medium">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder="john@example.com"
                          style={{ borderWidth: 2, padding: "0.75rem 1rem" }}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="subject" className="form-label fw-medium">Subject *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="form-select"
                          style={{ borderWidth: 2, padding: "0.75rem 1rem" }}
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Product Support</option>
                          <option value="order">Order Status</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="message" className="form-label fw-medium">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="form-control"
                          rows={6}
                          placeholder="Tell us how we can help..."
                          style={{ borderWidth: 2, padding: "0.75rem 1rem", resize: "vertical" }}
                        />
                      </div>
                    </div>
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
    </div>
  );
}