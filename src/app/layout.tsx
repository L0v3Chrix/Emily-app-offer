import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emily's Circle Halloween Special | Custom App Development",
  description: "Exclusive 50% off custom app development for Emily's Tampa networking circle. Limited to 8 spots. Reserve yours today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
