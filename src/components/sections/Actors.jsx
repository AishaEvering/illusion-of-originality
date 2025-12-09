import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const actors = [
  {
    id: "corporations",
    label: "Corporations & AI Developers",
    short: "Scraping the Internet",
    img: "/images/actors/corporations.png",
    role:
      "Build and market generative models, often framing scraping as ‘learning from data’ rather than using other people’s work.",
    gains: "Speed, scale, market dominance, investor excitement.",
    worries: "Regulation that limits scraping or demands licensing and transparency.",
  },
  {
    id: "creators",
    label: "Creators & Rights Holders",
    short: "Defendants & Plaintiffs",
    img: "/images/actors/creators.png",
    role:
      "Artists, writers, photographers, and media companies whose archives quietly become training data and sometimes evidence.",
    gains: "New tools, visibility if consent and credit are respected.",
    worries: "Loss of control, style cloning, devalued labor, ‘flooded’ markets.",
  },
  {
    id: "governance",
    label: "Governance & Gatekeepers",
    short: "Courts, Regulators, Platforms",
    img: "/images/actors/governance.png",
    role:
      "Courts, regulators, and platforms trying to retrofit copyright, privacy, and labor rules onto fast moving AI systems.",
    gains: "Clearer precedents, frameworks for responsible deployment.",
    worries: "Being too slow, too captured, or too weak to meaningfully shape norms.",
  },
  {
    id: "public",
    label: "Consumers & Everyday Users",
    short: "Prompting, Sharing, Normalizing",
    img: "/images/actors/public.png",
    role:
      "People who prompt models, share outputs, and absorb the marketing story that AI is ‘magic’, often without seeing where the data came from.",
    gains: "Fun, accessible tools, faster content creation.",
    worries: "Misinformation, job displacement, and finding out their own data was in the training pile.",
  },
];

function ActorsSection() {
  return (
    <section
      id="actors"
      className="relative py-28 md:py-32 overflow-hidden"
    >
      {/* Soft background so it feels lighter than timeline but still on-brand */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-soft to-night/95" />
        <div className="absolute -top-32 left-[-10%] w-[30rem] h-[30rem] rounded-full bg-grad-purple/35 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[28rem] h-[28rem] rounded-full bg-grad-orange/30 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 md:mb-14 text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-[11px] uppercase tracking-[0.25em] text-ink-muted mb-3"
          >
            Step 4 · The Actors
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-display text-ink mb-3"
          >
            Who Keeps the Illusion Alive?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-sm md:text-[15px] text-ink-muted"
          >
            Behind every “AI generated original” are people and institutions
            with very different stakes. These four actors keep the system
            running and shape what counts as acceptable scraping.
          </motion.p>
        </motion.div>

        {/* actor cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:gap-7 md:grid-cols-2"
        >
          {actors.map((actor, idx) => (
            <motion.article
              key={actor.id}
              variants={itemVariants}
              whileHover={{
                y: -4,
                scale: 1.01,
                boxShadow: "0 26px 60px rgba(0,0,0,0.7)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative rounded-2xl border border-card-border bg-night-soft/90 backdrop-blur px-4 py-4 md:px-5 md:py-5"
            >
              {/* subtle index tag */}
              <div className="absolute -top-3 left-4 text-[11px] uppercase tracking-[0.22em] text-grad-orange/90">
                {`0${idx + 1}`}
              </div>

              <div className="flex gap-4 md:gap-5 items-start">
                {/* icon */}
                <div className="relative shrink-0">
                  <div className="absolute inset-[-4px] rounded-2xl bg-gradient-to-br from-grad-blue via-grad-purple to-grad-orange opacity-60 blur-sm" />
                  <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-night-soft overflow-hidden border border-white/10 flex items-center justify-center">
                    <motion.img
                      src={actor.img}
                      alt={actor.label}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* text */}
                <div className="space-y-2">
                  <h3 className="text-sm md:text-[15px] font-semibold text-ink">
                    {actor.label}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-grad-yellow/90">
                    {actor.short}
                  </p>
                  <p className="text-xs md:text-[13px] text-ink-muted leading-relaxed">
                    {actor.role}
                  </p>

                  <div className="mt-3 space-y-1.5 text-[11px] md:text-[12px] text-ink-muted">
                    <p>
                      <span className="font-semibold text-ink">What they gain:</span>{" "}
                      {actor.gains}
                    </p>
                    <p>
                      <span className="font-semibold text-ink">What they worry about:</span>{" "}
                      {actor.worries}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* small note linking this to the reactions UI */}
        <div className="mt-8 md:mt-10 text-[11px] text-ink-muted text-center">
          These four icons match the “panel” you’ll see reacting throughout the
          site as the story unfolds.
        </div>
      </div>
    </section>
  );
}

export default ActorsSection;
