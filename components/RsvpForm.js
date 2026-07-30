"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function RsvpForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companions: 0,
  });
  const [status, setStatus] = useState("idle");
  const [entryNumber, setEntryNumber] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
        setEntryNumber(data.entryNumber);
      } else {
        setStatus("error");
        console.error(data.error);
      }
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "companions" ? parseInt(value) || 0 : value,
    }));
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="confirm show"
        style={{ marginTop: "1rem" }}
      >
        <p style={{ marginBottom: "1rem", fontFamily: "var(--font-serif)", fontSize: "18px" }}>
          Thank you, {formData.name}! We&apos;ve noted your RSVP.
        </p>
        <div style={{ padding: "0.5rem", borderRadius: "8px", display: "inline-block", background: "rgba(255,255,255,0.5)" }}>
          <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}>Your Entry Number</p>
          <p style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-serif)" }}>{entryNumber}</p>
        </div>
        <p style={{ fontSize: "0.85rem", marginTop: "1rem", opacity: 0.8 }}>We&apos;ve sent a confirmation SMS to {formData.phone}</p>
      </motion.div>
    );
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div className="field">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="e.g. 01xxxxxxxxx"
          required
          pattern="^01[0-25][0-9]{8}$"
          title="Please enter a valid 11-digit Egyptian phone number starting with 01"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      
      <div className="field">
        <label htmlFor="companions">Number of Companions</label>
        <input
          type="number"
          id="companions"
          name="companions"
          min="0"
          max="20"
          placeholder="0"
          required
          value={formData.companions}
          onChange={handleChange}
        />
        <small>Excluding you</small>
      </div>
      
      <button 
        type="submit" 
        className="submit-btn"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "CONFIRMING..." : "CONFIRM ATTENDANCE"}
      </button>
      
      {status === "error" && (
        <p style={{ color: "red", marginTop: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </motion.form>
  );
}
