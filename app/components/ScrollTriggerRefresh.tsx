"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global ScrollTrigger refresh handler for lazy-loaded content
 *
 * This component ensures ScrollTrigger recalculates positions after:
 * - Images load
 * - Canvas/WebGL contexts initialize
 * - Dynamic content renders
 *
 * Place this component in the root layout to handle all scroll-triggered animations
 */
export function ScrollTriggerRefresh() {
  useEffect(() => {
    // Initial refresh after a short delay for content to render
    const initialTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Refresh when images load
    const handleImageLoad = () => {
      ScrollTrigger.refresh();
    };

    // Refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    // Listen to image load events
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", handleImageLoad, { once: true });
      }
    });

    // Listen to window resize
    window.addEventListener("resize", handleResize);

    // Periodic refresh for lazy-loaded content (Canvas, etc.)
    // This catches any content that loads asynchronously
    const refreshInterval = setInterval(() => {
      ScrollTrigger.refresh();
    }, 1000);

    // Stop periodic refresh after 5 seconds (content should be loaded by then)
    const stopRefreshTimer = setTimeout(() => {
      clearInterval(refreshInterval);
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(stopRefreshTimer);
      clearInterval(refreshInterval);
      window.removeEventListener("resize", handleResize);
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, []);

  return null;
}
