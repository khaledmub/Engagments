"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard.php')
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          setGuests(data.guests);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalRsvps = guests.length;
  const totalCompanions = guests.reduce((sum, guest) => sum + parseInt(guest.companions || 0), 0);
  const totalGuests = totalRsvps + totalCompanions;

  if (loading) return <main style={{ padding: "3rem", textAlign: "center", fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>Loading dashboard...</main>;

  return (
    <main style={{ padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "2rem" }}>
        Engagement Dashboard
      </h1>

      <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem" }}>
        <div className="glass-card" style={{ padding: "1.5rem 2rem", flex: 1, borderTop: "4px solid var(--color-primary)" }}>
          <p style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.5rem" }}>Total Guests</p>
          <p style={{ fontSize: "3rem", fontWeight: "bold", fontFamily: "var(--font-serif)" }}>{totalGuests}</p>
        </div>
        
        <div className="glass-card" style={{ padding: "1.5rem 2rem", flex: 1, borderTop: "4px solid var(--color-accent)" }}>
          <p style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.5rem" }}>Total RSVPs</p>
          <p style={{ fontSize: "3rem", fontWeight: "bold", fontFamily: "var(--font-serif)" }}>{totalRsvps}</p>
        </div>
      </div>

      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: "1rem" }}>Guest List</h2>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Entry Code</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Companions</th>
              <th>Total Party</th>
              <th>RSVP Date</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td style={{ fontWeight: "bold", color: "var(--color-accent)" }}>{guest.entryNumber}</td>
                <td>{guest.name}</td>
                <td>{guest.phone}</td>
                <td>{guest.companions}</td>
                <td>{1 + guest.companions}</td>
                <td>{new Date(guest.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {guests.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "2rem", fontStyle: "italic", opacity: 0.7 }}>
                  No RSVPs yet. They will appear here once submitted.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
