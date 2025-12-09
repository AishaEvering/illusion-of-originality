// src/components/TimelineSection.jsx
import React from "react";
import { motion } from "framer-motion";
import ActorReactionsStrip from "../ActorReactionsStrip";

const timelineEvents = [
  {
    id: "getty",
    year: "2019–2023",
    title: "Getty Images v. Stability AI",
    side: "left",
    summary:
      "Getty alleges Stability AI copied millions of its licensed images, including watermarks to train Stable Diffusion without permission.",
    whyItMatters:
      "Raises the core question of whether mass scraping of licensed archives counts as fair use or large scale copyright infringement.",
  },
  {
    id: "disney-midjourney",
    year: "2022–2024",
    title: "Studios vs. Midjourney",
    side: "right",
    summary:
      "Companies argue that AI systems can reproduce iconic styles and characters in ways that bypass licensing and long standing IP agreements.",
    whyItMatters:
      "Tests how far ‘style’ and character likeness can be copied before it becomes an unlawful derivative work.",
  },
  {
    id: "nyt-openai",
    year: "2023–2024",
    title: "News Orgs vs. OpenAI & Others",
    side: "left",
    summary:
      "The New York Times and other publishers sue over the use of their archives in training models that can reproduce news content.",
    whyItMatters:
      "Pushes courts to decide whether training on paywalled journalism undermines existing business models and press freedom.",
  },
  {
    id: "guilds",
    year: "2023",
    title: "WGA & SAG-AFTRA AI Contract Clauses",
    side: "right",
    summary:
      "Writers and actors secure contract language about consent, compensation, and reuse of their work and likeness in AI systems.",
    whyItMatters:
      "Shows creative workers organizing to demand explicit limits on scraping, digital replicas, and synthetic performances.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Timeline() {
  return (
    <section
      id="timeline"
      className="relative py-28 md:py-32 overflow-hidden"
    >
      {/* Background image + gradient wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Background image – update path as needed */}
        <div className="absolute inset-0 bg-[url('/images/timeline-bg.jpg')] bg-cover bg-center opacity-40" />

        {/* Gradient overlay so it stays on-brand */}
        <div className="absolute inset-0 bg-gradient-to-b from-night/95 via-night/80 to-night/95 mix-blend-multiply" />

        {/* Soft color glows (match hero/illusion) */}
        <div className="absolute -top-40 -left-10 w-[40rem] h-[40rem] rounded-full bg-grad-blue/35 blur-[140px]" />
        <div className="absolute top-1/3 right-[-15%] w-[34rem] h-[34rem] rounded-full bg-grad-purple/35 blur-[140px]" />
        <div className="absolute bottom-[-30%] left-[20%] w-[36rem] h-[36rem] rounded-full bg-grad-orange/30 blur-[150px]" />
      </div>

      {/* ✨ Floating dust layer (above bg, below content) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="dust-layer">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="dust-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 18}s`,
                animationDuration: `${10 + Math.random() * 14}s`,
                opacity: 0.15 + Math.random() * 0.25,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 md:mb-16 text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-[11px] uppercase tracking-[0.25em] text-ink-muted mb-3"
          >
            Step 3 · Flashpoint Timeline
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-display text-ink mb-3"
          >
            The Legal & Cultural Flashpoints
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-sm md:text-[15px] text-ink-muted"
          >
            These are the moments where the illusion of “AI originality” ran
            into existing copyright rules, creative labor, and public debate.
          </motion.p>
        </motion.div>

        {/* Timeline wrapper */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative"
        >
          {/* Central spine */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden md:block">
            <div className="w-[2px] h-full mx-auto bg-gradient-to-b from-grad-blue via-grad-purple to-grad-orange opacity-70" />
            {/* dotted overlay for texture */}
            <div className="absolute inset-x-0 inset-y-5 flex flex-col justify-between">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="mx-auto h-1 w-1 rounded-full bg-white/30"
                />
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => {
              const isLeft =
                event.side === "left"
                  ? true
                  : event.side === "right"
                  ? false
                  : index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="relative flex flex-col md:flex-row md:items-stretch"
                >
                  {/* Left column (desktop) */}
                  <div
                    className={`hidden md:flex w-1/2 ${
                      isLeft
                        ? "justify-end pr-8"
                        : "justify-end pr-8 opacity-0 pointer-events-none"
                    }`}
                  >
                    {isLeft && (
                      <TimelineCard event={event} align="right" index={index} />
                    )}
                  </div>

                  {/* Center marker */}
                  <div className="relative md:w-0 md:flex md:flex-col md:items-center md:justify-center">
                    <div className="hidden md:flex flex-col items-center gap-2">
                      <div className="relative">
                        <div className="h-4 w-4 rounded-full bg-night border border-white/70 shadow-[0_0_20px_rgba(255,255,255,0.7)]" />
                        <div className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-grad-blue via-grad-purple to-grad-orange opacity-60 blur-[4px]" />
                      </div>
                      <span className="text-[11px] tracking-[0.18em] text-ink-muted uppercase">
                        {event.year}
                      </span>
                    </div>

                    {/* Mobile year */}
                    <div className="md:hidden mb-3 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-br from-grad-blue via-grad-purple to-grad-orange shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      <span className="text-[11px] tracking-[0.18em] text-ink-muted uppercase">
                        {event.year}
                      </span>
                    </div>
                  </div>

                  {/* Right column (desktop) */}
                  <div
                    className={`hidden md:flex w-1/2 ${
                      isLeft
                        ? "opacity-0 pointer-events-none"
                        : "justify-start pl-8"
                    }`}
                  >
                    {!isLeft && (
                      <TimelineCard event={event} align="left" index={index} />
                    )}
                  </div>

                  {/* Mobile full-width card */}
                  <div className="md:hidden">
                    <TimelineCard event={event} align="full" index={index} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Reactions from the panel */}
        <div className="mt-10 md:mt-14">
          <ActorReactionsStrip
            title="Reactions from the panel"
            reactions={[
              {
                actorId: "corporations",
                quote:
                  "We see these cases as clarifying the rules around innovation. Training on large datasets is essential if we want these tools to be useful at all.",
              },
              {
                actorId: "creators",
                quote:
                  "Every one of these lawsuits exists because people’s work was taken first and asked about later. The timeline is basically a record of that pattern.",
              },
              {
                actorId: "governance",
                quote:
                  "Each case pushes the law a little closer to answering the same question: when does learning from data become exploiting the people who made it?",
              },
              {
                actorId: "public",
                quote:
                  "I mostly heard that AI was ‘the future.’ Seeing all these court fights makes it clear the future is being negotiated in real time.",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ event, align, index }) {
  const base =
    "rounded-2xl border bg-night-soft/90 backdrop-blur shadow-[0_20px_45px_rgba(0,0,0,0.65)]";
  const gradientBorder =
    "border-transparent bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%),_linear-gradient(to_bottom_right,_rgba(59,130,246,0.5),_rgba(236,72,153,0.4),_rgba(249,115,22,0.5))] bg-origin-border bg-clip-border";

  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: "0 26px 60px rgba(0,0,0,0.75)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`${base} ${gradientBorder} p-[1px] max-w-md`}
    >
      <div className="h-full w-full rounded-[1.05rem] bg-night-soft/95 px-4 py-4 md:px-5 md:py-5">
        <p className="text-[11px] tracking-[0.22em] uppercase text-grad-orange/90 mb-1.5">
          {event.title}
        </p>
        <p className="text-xs md:text-[13px] text-ink-muted leading-relaxed mb-2.5">
          {event.summary}
        </p>
        <p className="text-[11px] md:text-[12px] text-ink/90">
          <span className="font-semibold text-grad-yellow/90">
            Why it matters:
          </span>{" "}
          {event.whyItMatters}
        </p>
      </div>
    </motion.div>
  );
}

export default Timeline;
