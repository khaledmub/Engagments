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

  if (loading) return <main style={{ padding: "3rem", textAlign: "center", fontFamily: "var(--font-serif)", fontSize: "1.5rem" }} dir="rtl">جاري تحميل البيانات...</main>;

  return (
    <main style={{ padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" }} dir="rtl">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", margin: 0 }}>
          لوحة تحكم الدعوات
        </h1>
        <button 
          onClick={handleResendAll} 
          disabled={sending || guests.length === 0}
          style={{
            background: "var(--navy)",
            color: "white",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            fontSize: "1.1rem",
            cursor: (sending || guests.length === 0) ? "not-allowed" : "pointer",
            fontFamily: "var(--font-serif)",
            opacity: (sending || guests.length === 0) ? 0.7 : 1
          }}
        >
          {sending ? "جاري التحديث..." : "إعادة إرسال واتساب للجميع"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem" }}>
        <div className="glass-card" style={{ padding: "1.5rem 2rem", flex: 1, borderTop: "4px solid var(--color-primary)" }}>
          <p style={{ fontSize: "1.2rem", color: "var(--color-primary)", marginBottom: "0.5rem" }}>إجمالي الحضور (مع المرافقين)</p>
          <p style={{ fontSize: "3rem", fontWeight: "bold", fontFamily: "var(--font-serif)" }}>{totalGuests}</p>
        </div>
        
        <div className="glass-card" style={{ padding: "1.5rem 2rem", flex: 1, borderTop: "4px solid var(--color-accent)" }}>
          <p style={{ fontSize: "1.2rem", color: "var(--color-primary)", marginBottom: "0.5rem" }}>عدد الدعوات المسجلة</p>
          <p style={{ fontSize: "3rem", fontWeight: "bold", fontFamily: "var(--font-serif)" }}>{totalRsvps}</p>
        </div>
      </div>

      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: "1rem" }}>قائمة المدعوين</h2>
      
      <div className="table-container">
        <table style={{ width: "100%", textAlign: "right", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.5)" }}>
              <th style={{ padding: "1rem" }}>رقم الدخول</th>
              <th style={{ padding: "1rem" }}>الاسم</th>
              <th style={{ padding: "1rem" }}>رقم الجوال</th>
              <th style={{ padding: "1rem" }}>المرافقين</th>
              <th style={{ padding: "1rem" }}>إجمالي العدد</th>
              <th style={{ padding: "1rem" }}>تاريخ التسجيل</th>
              <th style={{ padding: "1rem" }}>حالة الواتساب</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                <td style={{ padding: "1rem", fontWeight: "bold", color: "var(--color-accent)" }}>{guest.entryNumber}</td>
                <td style={{ padding: "1rem" }}>{guest.name}</td>
                <td style={{ padding: "1rem" }} dir="ltr">{guest.phone}</td>
                <td style={{ padding: "1rem" }}>{guest.companions}</td>
                <td style={{ padding: "1rem" }}>{1 + parseInt(guest.companions || 0)}</td>
                <td style={{ padding: "1rem" }} dir="ltr">{new Date(guest.createdAt).toLocaleString('ar-SA')}</td>
                <td style={{ padding: "1rem" }}>
                  {guest.messageSent == 1 ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>تم الإرسال</span>
                  ) : (
                    <span style={{ color: "orange", fontWeight: "bold" }}>في الانتظار</span>
                  )}
                </td>
              </tr>
            ))}
            {guests.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "2rem", fontStyle: "italic", opacity: 0.7 }}>
                  لا يوجد مدعوين حتى الآن.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
