import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageStack from "./ImageStack"; 

function Hero() {
  const [isScraped, setIsScraped] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const threshold = 80; // change sooner in the scroll
      setIsScraped(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    // run once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 flex flex-col justify-start gap-10 md:flex-row md:items-center overflow-hidden"
    >
      {/* LEFT: Text block */}
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-[0.25em] text-ink-muted mb-3">
          BIO 511 · Case Study By Aisha Evering
        </p>

        <h1 className="text-3xl md:text-5xl font-display leading-tight mb-4">
          Misleading Creativity:
          <span className="block text-ink">
            The Illusion of{" "}
            <span className="relative inline-block">
              {/* ORIGINALITY (default) */}
              <span
                className={`relative transition-opacity duration-300 ${
                  isScraped ? "opacity-0" : "opacity-100"
                }`}
              >
                Originality
              </span>

              {/* SCRAPED (glitches + gradient text) */}
              <span
                className={`absolute left-0 top-0 transition-opacity duration-300 ${
                  isScraped
                    ? "opacity-100 glitch bg-gradient-to-r from-grad-orange via-grad-yellow to-grad-pink bg-clip-text text-transparent"
                    : "opacity-0"
                }`}
              >
                Scraped
              </span>
            </span>{" "}
            in Generative AI
          </span>
        </h1>

        <p className="text-sm md:text-base text-ink-muted max-w-xl mb-3">
          Generative AI looks original. Underneath, it runs on scraped human
          creativity.
        </p>

        <p className="text-sm md:text-base text-ink-muted max-w-xl mb-6">
          This site explores how the illusion of originality in generative AI
          reshapes authorship, consent, and creative ownership.
        </p>

        <div className="flex gap-3">
          <a
            href="#illusion"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-grad-blue via-grad-purple to-grad-orange text-xs font-medium shadow-lg hover:opacity-90 transition"
          >
            Start the story
          </a>
          <a
            href="#actors"
            className="px-4 py-2 rounded-full border border-card-border text-xs text-ink-muted hover:text-ink hover:border-ink transition"
          >
            Meet the actors
          </a>
        </div>
      </div>

    {/* RIGHT: “Scraped photographs” stack */}
    <div className="flex-1 mt-8 md:mt-0 flex flex-col items-center">
        <div className="relative w-full max-w-[130px] sm:max-w-[170px] md:max-w-[230px] h-64 md:h-80">
            <ImageStack />
        </div>
        <p className="text-[11px] text-ink-muted mt-3 max-w-xs text-center">
            A rotating stack of “found” images hints at how generative AI quietly
            builds on top of countless human-made photos, artworks, and designs.
        </p>
    </div>
    </section>
  );
}

export default Hero;