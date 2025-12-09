// src/components/PipelineSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActorReactionsStrip from "../ActorReactionsStrip";


gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "web",
    icon: "🌐",
    label: "Public Web",
    title: "Public Web → Scrapers",
    body:
      "Art portfolios, news sites, fan wikis, code repos, and social feeds are swept up by automated scrapers.",
    chip: "Where the web becomes raw material",
  },
  {
    id: "datasets",
    icon: "🗂️",
    label: "Datasets",
    title: "Massive Datasets (e.g., LAION-5B)",
    body:
      "Billions of image-text pairs are bundled together, mixing copyrighted and personal content with little or no individual consent.",
    chip: "Where consent disappears",
  },
  {
    id: "training",
    icon: "🧠",
    label: "Training",
    title: "Training Deep Models",
    body:
      "Models compress patterns of style, language, and composition into parameters powered entirely by human made work.",
    chip: "Where labor is hidden",
  },
  {
    id: "outputs",
    icon: "✨",
    label: "Outputs",
    title: "Outputs & Marketing Story",
    body:
      "The same patterns return as “AI art” or “machine generated content,” framed as original and authored by the model.",
    chip: "Where ‘originality’ is sold back",
  },
];

function PipelineSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const miniPipelineRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const trigger = section;
    if (!section || !track) return;

    const totalPanels = steps.length;
    const totalShift = (totalPanels - 1) * 100; // xPercent shift

    const ctx = gsap.context(() => {
      // Intro copy fades up as section enters
      gsap.from(".pipeline-intro", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Soften entry: fade/slide in the track and content as the section approaches
      gsap.from(track, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const textBlocks = gsap.utils.toArray(".pipeline-text");
      const nodeBlocks = gsap.utils.toArray(".pipeline-node");
      const miniBar = gsap.utils.toArray(".pipeline-mini");

      gsap.from([...textBlocks, ...nodeBlocks], {
        opacity: 0,
        y: 26,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(miniBar, {
        opacity: 0,
        y: 18,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: miniBar,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      const pinDuration = window.innerHeight * steps.length;
      gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -totalShift,
          ease: "none",
          scrollTrigger: {
            id: "pipelineScroll",
            trigger,
            pin: section,
            start: "top top",
            end: () => "+=" + pinDuration,
            scrub: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress; // 0–1
              const idx = Math.round(p * (steps.length - 1));
              setCurrentStep(idx);
            },
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToStep = (index) => {
    const st = ScrollTrigger.getById("pipelineScroll");
    if (!st) return;

    const clampedIndex = Math.max(0, Math.min(steps.length - 1, index));
    const { start, end } = st;
    const total = end - start;
    const progress =
      steps.length === 1 ? 0 : clampedIndex / (steps.length - 1);
    const target = start + total * progress;

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      className="relative min-h-screen w-screen max-w-none overflow-hidden bg-night-soft/40"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        scrollMarginTop: "96px",
      }}
    >
      {/* FULL-SECTION BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 pipeline-bg opacity-[0.12]" />
        <div className="absolute inset-0">
          <div className="pipeline-bar pipeline-bar-1" />
          <div className="pipeline-bar pipeline-bar-2" />
        </div>
      </div>

      {/* TITLE BLOCK */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-0 pipeline-intro">
        <p className="text-[11px] uppercase tracking-[0.25em] text-ink-muted mb-3">
          Step 2 · How Scraping &amp; Training Work
        </p>
        <h2 className="text-2xl md:text-3xl font-display text-ink mb-3">
          How Scraping Becomes “AI Creativity”
        </h2>
        <p className="text-sm md:text-[15px] text-ink-muted max-w-xl">
          Scroll to follow the pipeline that turns everyday online work into
          training data and then into “original” AI outputs. You can also click
          a step to jump there.
        </p>
      </div>

      {/* HORIZONTAL PIPELINE TRACK (BIG PANELS) */}
      <div className="relative pb-4 -mt-8">
        <div
          ref={trackRef}
          className="flex items-center h-[60vh] md:h-[52vh]"
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex-shrink-0 w-[100vw] flex items-center"
            >
              <div className="w-full max-w-5xl mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
                  {/* LEFT: text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-4 pipeline-text"
                  >
                    <div className="inline-flex items-center gap-2 text-[11px] text-ink-muted mb-1">
                      <span className="rounded-full bg-black/60 px-2 py-1 border border-white/10">
                        Step {index + 1}
                      </span>
                      {index < steps.length - 1 && (
                        <span className="hidden md:inline text-ink-muted/70">
                          → feeds the next stage
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg md:text-xl font-display text-ink">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-ink-muted max-w-xl">
                      {step.body}
                    </p>

                    <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-[11px] border border-white/10 text-ink-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-grad-orange" />
                      {step.chip}
                    </span>
                  </motion.div>

                  {/* RIGHT: glowing node for current step */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative flex items-center justify-center pipeline-node"
                  >
                    <div className="relative w-full max-w-sm">
                      {/* horizontal bar */}
                      <div className="h-3 rounded-full bg-gradient-to-r from-grad-blue via-grad-purple to-grad-orange opacity-80 shadow-[0_0_30px_rgba(0,0,0,0.8)]" />

                      {/* node */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-night-soft border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.8)] flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-grad-blue/50 via-grad-purple/50 to-grad-orange/50 blur-lg opacity-80" />
                          <div className="absolute inset-[6px] rounded-full bg-night-soft" />
                          <span className="relative z-10 text-3xl md:text-4xl">
                            {step.icon}
                          </span>
                        </div>
                      </div>

                      {/* tiny arrow to hint direction */}
                      {index < steps.length - 1 && (
                        <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 hidden md:block">
                          <div className="w-6 h-6 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-[10px] text-ink-muted">
                            →
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MINI SUMMARY PIPELINE (CLICKABLE) UNDER MAIN TRACK */}
      <div
        ref={miniPipelineRef}
        className="max-w-5xl mx-auto px-4 mt-0 pb-0 pipeline-mini"
      >
        <div className="flex items-center gap-1.5 md:gap-2">
          {steps.map((step, index) => {
            const isActiveOrSeen = index <= currentStep;

            return (
              <motion.button
                key={step.id}
                type="button"
                onClick={() => scrollToStep(index)}
                className="flex-1 flex flex-col items-center focus:outline-none"
                initial={{ opacity: 0.25, y: 6, scale: 0.94 }}
                animate={
                  isActiveOrSeen
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0.35, y: 3, scale: 0.95 }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div
                  className={`
                    relative w-6 h-6 md:w-7 md:h-7 rounded-full 
                    border border-white/15 flex items-center justify-center 
                    shadow-[0_10px_25px_rgba(0,0,0,0.6)]
                    ${
                      isActiveOrSeen
                        ? "bg-black/70"
                        : "bg-black/40"
                    }
                    cursor-pointer
                  `}
                >
                  {isActiveOrSeen && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-grad-blue/50 via-grad-purple/50 to-grad-orange/50 blur-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.85 }}
                      transition={{ duration: 0.35 }}
                    />
                  )}
                  <motion.span
                    className="relative z-10 text-[12px] md:text-[13px]"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.icon}
                  </motion.span>
                </div>

                <span className="mt-[2px] text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-ink-muted text-center">
                  {step.label}
                </span>

                {index < steps.length - 1 && (
                  <div className="hidden md:block w-full mt-0.5">
                    <div
                      className={
                        isActiveOrSeen
                          ? "h-px bg-gradient-to-r from-grad-purple/70 via-grad-blue/50 to-grad-orange/70"
                          : "h-px bg-card-border/60"
                      }
                    />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Reactions strip below mini pipeline */}
      <div className="max-w-5xl mx-auto px-4 mt-1">
        <ActorReactionsStrip
          reactions={[
            {
              actorId: "corporations",
              quote:
                "Modern AI simply isn’t possible without large-scale datasets. The open web is how innovation happens.",
              citation: "openaiMeta2024",
            },
            {
              actorId: "creators",
              quote:
                "Stability AI copied over 12 million Getty Images photographs without permission.",
              citation: "getty2023",
            },
            {
              actorId: "governance",
              quote:
                "Transparency isn’t optional. If AI is trained on copyrighted work, we need a record of it.",
              citation: "euAiAct2024",
            },
            {
              actorId: "public",
              quote:
                "Most Americans are more concerned than excited about AI’s growing role in daily life.",
              citation: "pew2024",
            },
          ]}
        />
      </div>

      {/* extra bottom padding to keep next section offscreen */}
      <div className="h-10 lg:h-12" aria-hidden />
    </section>
  );
}

export default PipelineSection;
