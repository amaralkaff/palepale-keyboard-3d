import { FC } from "react";
import { Bounded } from "@/app/components/Bounded";
import clsx from "clsx";
import { FadeIn } from "@/app/components/FadeIn";
import Image from "next/image";

type BentoItem = {
  size: "Small" | "Medium" | "Large";
  image: string;
  text: string;
};

const BENTO_ITEMS: BentoItem[] = [
  {
    size: "Large",
    image: "/item_1.png",
    text: "**Full aluminum case.** Premium materials for satisfying heft and durability.",
  },
  {
    size: "Small",
    image: "/item_2.png",
    text: "**Interchangeable knob system.** Customize your control dial to click, scroll, or press.",
  },
  {
    size: "Medium",
    image: "/item_3.png",
    text: "**Cross Platform.** Mac, Windows, or Linux, Nimbus adapts to your workflow.",
  },
  {
    size: "Medium",
    image: "/item_4.png",
    text: "**Hot-Swappable Switches.** Change your feel without any soldering.",
  },
  {
    size: "Small",
    image: "/item_5.png",
    text: "**Premium keycaps.** Custom colorways with crisp legends and smooth texture.",
  },
  {
    size: "Large",
    image: "/item_6.png",
    text: "**RGB backlighting.** Per-key customization with stunning visual effects.",
  },
];

/**
 * Component for "BentoBox" section.
 */
const BentoBox: FC = () => {
  return (
    <Bounded>
      <FadeIn>
        <h2
          id="features"
          className="font-bold-slanted mb-8 scroll-pt-6 text-6xl uppercase md:text-8xl"
        >
          Vapor75 Features
        </h2>
      </FadeIn>

      <FadeIn targetChildren className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {BENTO_ITEMS.map((item, index) => (
          <BentoBoxItem key={index} item={item} />
        ))}
      </FadeIn>
    </Bounded>
  );
};

export default BentoBox;

type BentoBoxItemProps = {
  item: BentoItem;
};

function BentoBoxItem({ item }: BentoBoxItemProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-3xl",
        item.size === "Small" && "md:col-span-2",
        item.size === "Medium" && "md:col-span-3",
        item.size === "Large" && "md:col-span-4",
      )}
    >
      <Image
        src={item.image}
        alt={item.text}
        className="h-full w-full object-cover"
        quality={96}
        width={700}
        height={700}
      />

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-black"></div>

      <div className="absolute bottom-0 left-0 max-w-xl p-6 text-xl text-balance text-white">
        {item.text
          .split("**")
          .map((part, i) =>
            i % 2 === 0 ? (
              <span key={i}>{part}</span>
            ) : (
              <strong key={i}>{part}</strong>
            ),
          )}
      </div>
    </div>
  );
}
