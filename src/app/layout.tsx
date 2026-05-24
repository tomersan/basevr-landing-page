import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BaseVR | חוויית המכירה החדשה בעולם הנדל״ן",
  description:
    "הפכו את תהליך המכירה לחוויה בלתי נשכחת עם טכנולוגיית VR מתקדמת. 31% מהר יותר, 25% יותר סגירות, 74% יתרון תחרותי.",
  keywords: "VR נדלן, סיור וירטואלי, מכירת דירות, BaseVR, תלת מימד נדלן",
  openGraph: {
    title: "BaseVR | חוויית המכירה החדשה בעולם הנדל״ן",
    description: "הפכו את תהליך המכירה לחוויה בלתי נשכחת עם טכנולוגיית VR מתקדמת.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Latin:wght@300;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
