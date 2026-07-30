import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amr & Yasmine — Engagement Ceremony",
  description: "Join us in celebrating this special milestone. We look forward to sharing our joy with you.",
  openGraph: {
    title: "Amr & Yasmine — Engagement Ceremony",
    description: "Join us in celebrating this special milestone. We look forward to sharing our joy with you.",
    images: ["/image.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Alex+Brush&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
