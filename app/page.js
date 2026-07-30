"use client";

import { motion } from "framer-motion";
import RsvpForm from "@/components/RsvpForm";

export default function Home() {
  return (
    <main className="split-layout">
      {/* Left/Top Side: Hero Text over the Background Image */}
      <div className="layout-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="hero-title">You&apos;re Invited</h1>
          <p className="hero-subtitle">
            Join us in celebrating this special milestone. 
            We look forward to sharing our joy with you.
          </p>
        </motion.div>
      </div>

      {/* Right/Bottom Side: Frosted Glass Form Container */}
      <div className="layout-right">
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--navy-deep)", marginBottom: "0.5rem" }}>
              RSVP
            </h2>
            <p style={{ color: "var(--text-light)", fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}>
              Kindly confirm your attendance below
            </p>
          </div>
          
          <RsvpForm />
        </motion.div>
      </div>
    </main>
  );
}
