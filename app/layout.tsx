import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollTriggerRefresh } from "./components/ScrollTriggerRefresh";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth", "slnt", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Amangly Keyboards",
  description: "Premium mechanical keyboards crafted for enthusiasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoFlex.variable} antialiased`}>
        <ScrollTriggerRefresh />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
