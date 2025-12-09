// src/components/IllusionSection.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActorReactionsStrip from "../ActorReactionsStrip";
gsap.registerPlugin(ScrollTrigger);


// Create a full 20-tile grid from your 11 images with smart duplicates
function buildMosaic(images) {
  const fullGridSize = 20;

  // If there are fewer than 20 images, duplicate some
  const result = [...images];

  while (result.length < fullGridSize) {
    // Pick a random existing image to duplicate
    const randomIndex = Math.floor(Math.random() * images.length);
    result.push(images[randomIndex]);
  }

  return result;
}

const mosaicImagesRaw = [
  "/images/mosaic/shot_1.png",
  "/images/mosaic/shot_2.png",
  "/images/mosaic/shot_3.png",
  "/images/mosaic/shot_4.jpg",
  "/images/mosaic/shot_5.jpg",
  "/images/mosaic/shot_6.jpg",
  "/images/mosaic/shot_7.jpg",
  "/images/mosaic/shot_8.jpg",
  "/images/mosaic/shot_9.jpg",
  "/images/mosaic/shot_10.jpg",
  "/images/mosaic/shot_11.jpg",
];

const mosaicImages = buildMosaic(mosaicImagesRaw);

// pre-baked random layout so it doesn’t change every render
const mosaicTiles = Array.from({ length: 18 }).map((_, i) => {
  const src = mosaicImages[i % mosaicImages.length];

  const top = 5 + Math.random() * 70; // stay inside the card
  const left = 5 + Math.random() * 70;
  const width = 20 + Math.random() * 18; // tile size %
  const rotate = -12 + Math.random() * 24; // -12deg to 12deg

  return {
    id: i,
    src,
    top,
    left,
    width,
    rotate,
  };
});

// ---- FRAMER VARIANTS ----
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

function Illusion() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const auroras = gsap.utils.toArray(".aurora");


    // 1. Idle floating animation
    auroras.forEach((el) => {
      gsap.to(el, {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-60, 60),
        scale: () => gsap.utils.random(0.9, 1.2),
        duration: gsap.utils.random(6, 12),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    // 2. Brighten + saturate on entering Illusion
    gsap.fromTo(
      auroras,
      { opacity: 0.25, filter: "saturate(0.7) brightness(0.7)" },
      {
        opacity: 0.65,
        filter: "saturate(1.5) brightness(1.3)",
        scrollTrigger: {
          trigger: "#illusion",
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );

    // 3. Fade + desaturate as user scrolls past Illusion
    gsap.to(auroras, {
      opacity: 0.25,
      filter: "saturate(0.5) brightness(0.6)",
      scrollTrigger: {
        trigger: "#illusion",
        start: "center top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section id="illusion" className="relative z-0 overflow-visible py-32">
      {/* Aurora spans full viewport width */}
      <div
        id="illusion-aurora"
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
        <div className="aurora aurora-4"></div>
      </div>


      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* subtle top label */}
          <motion.p
            variants={itemVariants}
            className="text-[11px] uppercase tracking-[0.25em] text-ink-muted mb-3"
          >
            Step 1 · The Illusion
          </motion.p>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
            {/* LEFT: text / narrative */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-display text-ink">
                The Illusion of Originality
              </h2>
              <p className="text-sm md:text-[15px] text-ink-muted max-w-xl leading-relaxed">
                Generative AI is marketed as if the model itself is the author.
                It “imagines,” “dreams,” and “creates” something entirely new
                from your prompt. The UI is simple, glossy, and feels almost
                magical. Type a sentence, get a fully formed image or story.
              </p>
              <p className="text-sm md:text-[15px] text-ink-muted max-w-xl leading-relaxed">
                What you rarely see is how much that apparent originality
                depends on billions of scraped images, articles, and posts. The
                outputs feel new because they remix patterns from an invisible
                pile of human work that sits behind the interface.
              </p>

              <div className="grid gap-3 text-[13px] text-ink-muted">
                <div className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-grad-blue" />
                  <p>
                    <span className="text-ink">Marketing story:</span> “The AI
                    is the creator. Your prompt just inspires it.”
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-grad-orange" />
                  <p>
                    <span className="text-ink">Hidden reality:</span> the model
                    leans on a vast, uncredited archive of human made work
                    scraped into training datasets.
                  </p>
                </div>
                {/* subtle hover hint */}
                    <div className="flex items-center gap-2 mt-4 text-[12px] opacity-90">

                    {/* glowing dot */}
                    <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-grad-blue via-grad-purple to-grad-orange animate-glow" />

                    {/* glowing animated text */}
                    <span className="bg-gradient-to-r from-grad-blue via-grad-purple to-grad-orange bg-clip-text text-transparent animate-glow-text font-medium">
                        Hover the image to reveal what’s really underneath.
                    </span>
                    </div>

                    
              </div>
            </motion.div>

            {/* RIGHT: glossy AI card that “peels back” on hover */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center md:justify-end"
            >
              {/* group on outer wrapper so caption can respond */}
              <div className="group w-full max-w-md sm:max-w-lg">
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-card-border bg-night-soft shadow-[0_24px_60px_rgba(0,0,0,0.7)]">
                  {/* Pinterest-style scattered mosaic (hidden until hover) */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-3 pointer-events-none grid grid-cols-4 grid-rows-5 gap-[6px]">
                    
                    {mosaicImages.map((src, i) => {
                        const isDuplicate = i >= mosaicImagesRaw.length; // tiles beyond the real 11 images
                        const rotate = -2 + Math.random() * 4; // small rotation
                        const offsetX = Math.random() * 6 - 3;
                        const offsetY = Math.random() * 6 - 3;

                        return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.94 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                            duration: 0.35,
                            ease: "easeOut",
                            delay: i * 0.025,
                            }}
                            className="w-full h-full rounded-[8px] overflow-hidden shadow-[0_3px_8px_rgba(0,0,0,0.32)] bg-neutral-800"
                            style={{
                            transform: `rotate(${rotate}deg) translate(${offsetX}px, ${offsetY}px)`
                            }}
                        >
                            <img
                            src={src}
                            alt={`scraped-${i}`}
                            className="w-full h-full object-cover"
                            style={{
                                filter: isDuplicate
                                ? "blur(2px) saturate(0.7) brightness(0.9)"
                                : "none",
                                opacity: isDuplicate ? 0.85 : 1,
                            }}
                            loading="lazy"
                            />
                        </motion.div>
                        );
                    })}
                    </div>

                  {/* glossy AI UI layer (fades out on hover) */}
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-grad-blue via-grad-purple to-grad-orange p-4 transition-opacity duration-400 group-hover:opacity-0">
                    {/* fake prompt bar */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] text-ink/80">
                        <span className="uppercase tracking-[0.18em]">
                          ai image lab · beta
                        </span>
                        <span className="rounded-full bg-black/25 px-2 py-0.5">
                          4K Render · v3
                        </span>
                      </div>
                      <div className="rounded-full bg-black/25 px-3 py-2 text-[11px] text-ink/90 flex items-center justify-between">
                        <span className="truncate">
                          “A soft, dreamy pastel landscape with glowing hills
                          and a bright river…”
                        </span>
                        <span className="ml-2 rounded-full bg-white/10 px-2 py-1 text-[10px]">
                          Generate
                        </span>
                      </div>
                    </div>

                    {/* result area with framed AI image */}
                    <div className="relative flex-1 mt-4 rounded-[1.5rem] bg-black/20 border border-white/20 px-3 pb-3 pt-3.5">
                      {/* inner frame */}
                      <motion.div
                        initial={{
                          scale: 1,
                          filter: "brightness(1) saturate(1)",
                        }}
                        whileHover={{
                          scale: 1.02,
                          filter: "brightness(1.25) saturate(1.35)",
                          transition: { duration: 0.4, ease: "easeOut" },
                        }}
                        className="relative w-full h-full rounded-[1.2rem] overflow-hidden bg-night-soft/60 border border-white/25 shadow-[0_14px_40px_rgba(0,0,0,0.55)]"
                      >
                        <img
                          src="/images/garden.jpeg"
                          alt="AI generated dreamy landscape"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {/* subtle glossy highlight */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-black/40 mix-blend-screen" />
                      </motion.div>

                      {/* caption under image, inside card */}
                      <p className="mt-2 text-[11px] text-ink/90">
                        “AI-generated, 100% original image.”
                      </p>
                    </div>
                  </div>
                </div>

                {/* bottom caption – outside the clipped card */}
                <p className="mt-3 text-center text-[11px] text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  Underneath the glossy UI: countless tiny pieces of scraped
                  human work stitched into “AI creativity.”
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

    <ActorReactionsStrip
    reactions={[
        {
        actorId: "corporations",
        quote:
            "These systems are not databases of images or text; they learn general concepts that allow them to generalize to new ideas.",
        citation: "thompson2023",
        },
        {
        actorId: "creators",
        quote:
            "My work was taken without my consent, used to train a system that can now mimic my style.",
        citation: "andersen2023",
        },
        {
        actorId: "governance",
        quote:
            "Generative AI complicates existing copyright categories because it operates by ingesting massive amounts of protected work without permission.",
        citation: null,
        },
        {
        actorId: "public",
        quote:
            "I thought it was making something new. I didn’t realize AI was trained on real people’s art.",
        citation: "roose2023",
        },
    ]}
/>
    </section>
  );
}

export default Illusion;
