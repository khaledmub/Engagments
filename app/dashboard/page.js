"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const fetchGuests = () => {
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
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleResendAll = async () => {
    if (!window.confirm("هل أنت متأكد أنك تريد إعادة إرسال رسالة التأكيد لجميع المدعوين؟ (سيتم إرسال رسالة واتساب للجميع)")) {
      return;
    }
    
    setSending(true);
    try {
      const res = await fetch('/api/dashboard.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resend_all' })
      });
      if (res.ok) {
        alert("تمت العملية بنجاح! سيقوم البوت الآن بإرسال الرسائل للجميع.");
        fetchGuests(); // Refresh to show messageSent statuses if needed
      } else {
        alert("حدث خطأ أثناء محاولة الإرسال.");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ في الاتصال بالخادم.");
    }
    setSending(false);
  };

  const totalRsvps = guests.length;
  const totalCompanions = guests.reduce((sum, guest) => sum + parseInt(guest.companions || 0), 0);
  const totalGuests = totalRsvps + totalCompanions;

  if (loading) return <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", width: "100%", position: "absolute", top: 0, left: 0, zIndex: 10, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "system-ui, sans-serif", fontSize: "1.5rem", color: "#64748b" }} dir="rtl">جاري تحميل البيانات...</main>;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", width: "100%", position: "absolute", top: 0, left: 0, zIndex: 10, padding: "3rem 2rem", boxSizing: "border-box", fontFamily: "system-ui, -apple-system, sans-serif" }} dir="rtl">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "2.2rem", margin: "0 0 0.5rem 0", color: "#0f172a", fontWeight: "800", letterSpacing: "-0.5px" }}>
              لوحة تحكم الدعوات
            </h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: "1.1rem" }}>إدارة الحضور ومتابعة رسائل الواتساب</p>
          </div>
          
          <button 
            onClick={handleResendAll} 
            disabled={sending || guests.length === 0}
            style={{
              background: sending ? "#94a3b8" : "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              border: "none",
              padding: "0.9rem 1.8rem",
              borderRadius: "12px",
              fontSize: "1.05rem",
              fontWeight: "600",
              cursor: (sending || guests.length === 0) ? "not-allowed" : "pointer",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
              transition: "transform 0.2s, box-shadow 0.2s",
              opacity: guests.length === 0 ? 0.7 : 1
            }}
            onMouseOver={(e) => { if(!sending && guests.length > 0) e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            {sending ? "جاري الإرسال..." : "إعادة إرسال للجميع 🔄"}
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          
          <div style={{ background: "white", padding: "2rem", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0", borderRight: "5px solid #2563eb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ background: "#eff6ff", padding: "1rem", borderRadius: "14px", color: "#2563eb" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                <p style={{ fontSize: "1.05rem", color: "#64748b", margin: "0 0 0.4rem 0", fontWeight: "500" }}>إجمالي الحضور (مع المرافقين)</p>
                <p style={{ fontSize: "2.5rem", fontWeight: "800", margin: 0, color: "#0f172a" }}>{totalGuests}</p>
              </div>
            </div>
          </div>
          
          <div style={{ background: "white", padding: "2rem", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0", borderRight: "5px solid #10b981" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ background: "#ecfdf5", padding: "1rem", borderRadius: "14px", color: "#10b981" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div>
                <p style={{ fontSize: "1.05rem", color: "#64748b", margin: "0 0 0.4rem 0", fontWeight: "500" }}>الدعوات المسجلة</p>
                <p style={{ fontSize: "2.5rem", fontWeight: "800", margin: 0, color: "#0f172a" }}>{totalRsvps}</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Table Section */}
        <div style={{ background: "white", borderRadius: "20px", padding: "2rem", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "1.5rem", margin: "0 0 1.5rem 0", color: "#0f172a", fontWeight: "700" }}>سجل المدعوين</h2>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0", textAlign: "right" }}>
              <thead>
                <tr>
                  <th style={{ padding: "1.2rem 1rem", color: "#64748b", fontWeight: "600", fontSize: "0.95rem", borderBottom: "2px solid #f1f5f9" }}>رقم الدخول</th>
                  <th style={{ padding: "1.2rem 1rem", color: "#64748b", fontWeight: "600", fontSize: "0.95rem", borderBottom: "2px solid #f1f5f9" }}>الاسم</th>
                  <th style={{ padding: "1.2rem 1rem", color: "#64748b", fontWeight: "600", fontSize: "0.95rem", borderBottom: "2px solid #f1f5f9" }}>رقم الجوال</th>
                  <th style={{ padding: "1.2rem 1rem", color: "#64748b", fontWeight: "600", fontSize: "0.95rem", borderBottom: "2px solid #f1f5f9" }}>المرافقين</th>
                  <th style={{ padding: "1.2rem 1rem", color: "#64748b", fontWeight: "600", fontSize: "0.95rem", borderBottom: "2px solid #f1f5f9" }}>إجمالي العدد</th>
                  <th style={{ padding: "1.2rem 1rem", color: "#64748b", fontWeight: "600", fontSize: "0.95rem", borderBottom: "2px solid #f1f5f9" }}>تاريخ التسجيل</th>
                  <th style={{ padding: "1.2rem 1rem", color: "#64748b", fontWeight: "600", fontSize: "0.95rem", borderBottom: "2px solid #f1f5f9" }}>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id} style={{ transition: "background 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background = "#f8fafc"} onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "1.2rem 1rem", borderBottom: "1px solid #f1f5f9", fontWeight: "700", color: "#3b82f6" }}>#{guest.entryNumber}</td>
                    <td style={{ padding: "1.2rem 1rem", borderBottom: "1px solid #f1f5f9", color: "#0f172a", fontWeight: "500" }}>{guest.name}</td>
                    <td style={{ padding: "1.2rem 1rem", borderBottom: "1px solid #f1f5f9", color: "#475569" }} dir="ltr">{guest.phone}</td>
                    <td style={{ padding: "1.2rem 1rem", borderBottom: "1px solid #f1f5f9", color: "#475569" }}>{guest.companions}</td>
                    <td style={{ padding: "1.2rem 1rem", borderBottom: "1px solid #f1f5f9", fontWeight: "600", color: "#0f172a" }}>{1 + parseInt(guest.companions || 0)}</td>
                    <td style={{ padding: "1.2rem 1rem", borderBottom: "1px solid #f1f5f9", color: "#64748b", fontSize: "0.9rem" }} dir="ltr">{new Date(guest.createdAt).toLocaleString('ar-SA')}</td>
                    <td style={{ padding: "1.2rem 1rem", borderBottom: "1px solid #f1f5f9" }}>
                      {guest.messageSent == 1 ? (
                        <span style={{ background: "#dcfce7", color: "#166534", padding: "0.4rem 0.8rem", borderRadius: "99px", fontSize: "0.85rem", fontWeight: "600", display: "inline-block" }}>
                          ✓ تم الإرسال
                        </span>
                      ) : (
                        <span style={{ background: "#fef3c7", color: "#92400e", padding: "0.4rem 0.8rem", borderRadius: "99px", fontSize: "0.85rem", fontWeight: "600", display: "inline-block" }}>
                          ⏳ في الانتظار
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {guests.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "4rem 2rem", color: "#94a3b8", fontSize: "1.1rem" }}>
                      لا يوجد مدعوين حتى الآن.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
