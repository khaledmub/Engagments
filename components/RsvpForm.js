"use client";

import { useState } from "react";

export default function RsvpForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companions: 0,
  });
  
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStepper = (increment) => {
    setFormData((prev) => {
      let val = parseInt(prev.companions, 10);
      if (isNaN(val)) val = 0;
      val += increment;
      if (val < 0) val = 0;
      if (val > 20) val = 20;
      return { ...prev, companions: val };
    });
  };

  const handleCompanionChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 20) val = 20;
    setFormData({ ...formData, companions: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const formBody = new URLSearchParams();
      formBody.append("name", formData.name);
      formBody.append("phone", formData.phone);
      formBody.append("companions", formData.companions);

      const res = await fetch("/api/rsvp.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString()
      });
      
      const data = await res.json();
      
      if (data.status === "success") {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message || "An error occurred while submitting.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Failed to connect to the server.");
    }
  };

  const guestsCount = parseInt(formData.companions || 0, 10);

  return (
    <div className={`rsvp-card ${status === "success" ? "answered" : ""}`} id="rsvpCard">
      <form id="rsvpForm" onSubmit={handleSubmit} style={{ display: status === "success" ? "none" : "block" }}>
        <h2>RSVP</h2>
        <p>Kindly confirm your attendance below</p>

        <div className={`field ${status === "error" && !formData.name ? "error" : ""}`} id="nameField">
          <label htmlFor="guestName">Name</label>
          <input 
            type="text" 
            id="guestName" 
            name="name"
            placeholder="Your full name" 
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={`field ${status === "error" && !formData.phone ? "error" : ""}`} id="phoneField">
          <label htmlFor="guestPhone">Phone Number</label>
          <input 
            type="tel" 
            id="guestPhone" 
            name="phone"
            placeholder="e.g. 01xxxxxxxxx" 
            autoComplete="tel"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="companions">Number of Companions</label>
          <div className="stepper">
            <button type="button" aria-label="Decrease" onClick={() => handleStepper(-1)}>–</button>
            <input 
              type="number" 
              id="companions" 
              name="companions"
              min="0" 
              max="20" 
              inputMode="numeric"
              value={formData.companions}
              onChange={handleCompanionChange}
            />
            <button type="button" aria-label="Increase" onClick={() => handleStepper(1)}>+</button>
          </div>
          <p className="hint">Excluding you</p>
        </div>

        {status === "error" && (
          <p style={{ color: "#b5563f", fontSize: "0.9rem", margin: "0.5rem 0", fontStyle: "italic" }}>
            {errorMsg}
          </p>
        )}

        <button type="submit" className="confirm-btn" disabled={status === "loading"}>
          {status === "loading" ? "Confirming..." : "Confirm Attendance"}
        </button>
      </form>

      <div className={`thanks ${status === "success" ? "show" : ""}`} id="thanksBlock">
        <div className="check">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c6a15b" strokeWidth="2"><path d="M4 12l5 5L20 6"/></svg>
        </div>
        <h3 id="thanksName">Thank you, {formData.name ? formData.name.split(' ')[0] : ''}!</h3>
        <p id="thanksDetail">
          {guestsCount > 0
            ? `You and ${guestsCount} companion${guestsCount > 1 ? 's' : ''} are confirmed for 11/09/2026.`
            : `You're confirmed for 11/09/2026.`}
        </p>
      </div>
    </div>
  );
}
