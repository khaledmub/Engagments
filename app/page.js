"use client";

import { motion } from "framer-motion";
import RsvpForm from "@/components/RsvpForm";

export default function Home() {
  return (
    <div className="scene">
      
      {/* Spacer to keep the initial view clear so the background image can be fully seen */}
      <div style={{ height: "90vh", width: "100%" }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        style={{ 
          width: "100%",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "4rem"
        }}
      >
        <div 
          style={{ 
            width: "100%", 
            maxWidth: "400px", 
            background: "var(--card-bg)", 
            backdropFilter: "blur(12px)", 
            WebkitBackdropFilter: "blur(12px)", 
            padding: "2.5rem 2rem", 
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
          }}
        >
          <div className="panel-title" style={{ textAlign: "center", marginBottom: "0.5rem" }}>RSVP</div>
          <div className="panel-sub" style={{ textAlign: "center", marginBottom: "2rem" }}>Kindly confirm your attendance below</div>
          <RsvpForm />
        </div>
      </motion.div>
      
    </div>
  );
}
