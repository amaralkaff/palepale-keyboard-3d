import { type Metadata } from "next";
import Hero from "@/slices/Hero";
import BentoBox from "@/slices/BentoBox";
import Marquee from "@/slices/Marquee";
import ColorChanger from "@/slices/ColorChanger";
import PurchaseButton from "@/slices/PurchaseButton";
import SwitchPlayground from "@/slices/SwitchPlayground";

export default async function Page() {
  return (
    <>
      <Hero />
      <BentoBox />
      <Marquee />
      <SwitchPlayground />
      <Marquee />
      <ColorChanger />
      <Marquee />
      <PurchaseButton />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Amangly Keyboards - Premium Mechanical Keyboards",
    description:
      "Crafted for enthusiasts who demand the best typing experience. Premium aluminum construction with hot-swappable switches and RGB backlighting.",
    openGraph: {
      images: [{ url: "/Knurl.jpg" }],
    },
  };
}
