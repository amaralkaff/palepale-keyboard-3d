"use client";

import { FC, useEffect } from "react";
import { Bounded } from "@/app/components/Bounded";
import { FadeIn } from "@/app/components/FadeIn";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { SOUND_MAP, Switch } from "@/app/components/Switch";
import { Stage } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuVolume2 } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

type SwitchData = {
  uid: "red" | "brown" | "blue" | "black";
  name: string;
  color: string;
};

const SWITCHES: SwitchData[] = [
  { uid: "blue", name: "Blue Max", color: "#0F80E7" },
  { uid: "red", name: "Red Max", color: "#C92627" },
  { uid: "brown", name: "Brown Max", color: "#6E3205" },
  { uid: "black", name: "Black Max", color: "#000000" },
];

/**
 * Component for "SwitchPlayground" section.
 */
const SwitchPlayground: FC = () => {
  useEffect(() => {
    // Refresh ScrollTrigger after Canvas components render
    // This ensures correct scroll positions are calculated
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500); // Wait for Canvas to fully initialize

    return () => clearTimeout(timer);
  }, []);

  return (
    <Bounded
      className="relative"
      innerClassName="flex flex-col justify-center"
    >
      <FadeIn>
        <h2
          id="switch-playground"
          className="font-bold-slanted scroll-pt-6 text-6xl uppercase md:text-8xl"
        >
          Craft your Click
        </h2>

        <div className="mb-6 max-w-4xl text-xl text-pretty">
          <p>
            The Vapor75 can be customized with one of four premium switch types.
          </p>
        </div>
        <FadeIn
          targetChildren
          className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2"
        >
          {SWITCHES.map((switchData) => (
            <SharedCanvas key={switchData.uid} switchData={switchData} />
          ))}
        </FadeIn>
      </FadeIn>
    </Bounded>
  );
};

export default SwitchPlayground;

type ShareCanvasProps = {
  switchData: SwitchData;
};

const SharedCanvas = ({ switchData }: ShareCanvasProps) => {
  const { uid: colorName, color: hexColor, name } = switchData;

  const bgColor = {
    blue: "bg-sky-950",
    red: "bg-red-950",
    brown: "bg-amber-950",
    black: "bg-gray-900",
  }[colorName];

  const handleSound = () => {
    const selectedSound = gsap.utils.random([SOUND_MAP[colorName]]);

    const audio = new Audio(selectedSound[0]);
    audio.volume = 0.6;
    audio.play().catch(() => {
      // Silently handle autoplay policy errors
    });
  };

  return (
    <div className="group relative min-h-96 overflow-hidden rounded-3xl select-none">
      {/* Text button */}
      <button
        onClick={handleSound}
        className="font-bold-slanted absolute bottom-0 left-0 z-10 flex items-center gap-3 p-6 text-4xl italic text-white uppercase focus:ring-2 focus:ring-white focus:outline-none"
      >
        {name} <LuVolume2 className="h-8 w-8" />
      </button>
      {/* Canvas */}
      <Canvas
        camera={{
          position: [1.5, 2, 0],
          fov: 35,
        }}
        onCreated={() => {
          // Refresh ScrollTrigger when Canvas is ready
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        }}
      >
        <Stage
          adjustCamera
          intensity={0.5}
          shadows="contact"
          environment="city"
        >
          <Switch
            rotation={[0, Math.PI / 4, 0]}
            color={colorName}
            hexColor={hexColor || ""}
          />
        </Stage>
      </Canvas>
      <div
        className={clsx(
          "font-black-slanted absolute inset-0 -z-10 grid place-items-center text-8xl uppercase",
          bgColor,
        )}
      >
        <svg className="pointer-events-none h-auto w-full" viewBox="0 0 75 100">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={18}
            className="fill-white/30 uppercase mix-blend-overlay group-hover:fill-white motion-safe:transition-all motion-safe:duration-700"
          >
            {Array.from({ length: 8 }, (_, i) => (
              <tspan key={i} x={`${(i + 1) * 10}%`} dy={i === 0 ? -40 : 14}>
                {colorName}
                {colorName}
                {colorName}
              </tspan>
            ))}
          </text>
        </svg>
      </div>
    </div>
  );
};
