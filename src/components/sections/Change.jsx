// src/components/ChangeSection.jsx
import React from "react";
import { motion } from "framer-motion";
import ActorReactionsStrip from "../ActorReactionsStrip";

const containerVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.16,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function Change() {
  return (
    <section
      id="change"
      className="relative py-24 md:py-32 overflow-hidden w-screen max-w-none"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >

      {/* Background gradient + soft glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-10 w-[26rem] h-[26rem] rounded-full bg-sky-400/26 blur-[120px]" />
        <div className="absolute top-1/3 right-[-20%] w-[28rem] h-[28rem] rounded-full bg-amber-300/26 blur-[130px]" />
        <div className="absolute bottom-[-30%] left-[10%] w-[30rem] h-[30rem] rounded-full bg-emerald-400/22 blur-[130px]" />

        {/* subtle sun wash from top-right */}
        <div className="absolute -top-20 right-[-10%] w-[20rem] h-[20rem] rounded-full bg-amber-200/45 blur-[80px]" />

        {/* gentle top glow */}
        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-white/12 via-transparent to-transparent mix-blend-screen" />
      </div>

{/* ✨ Dreamy shimmer layer — white & denser */}
<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

  {/* 1. Many drifting white flecks */}
  {Array.from({ length: 60 }).map((_, i) => (
    <motion.span
      key={`fleck-${i}`}
      className="absolute rounded-full"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${2 + Math.random() * 3}px`,
        height: `${2 + Math.random() * 3}px`,
        backgroundColor: "rgba(255, 180, 220, 0.9)",
        boxShadow: "0 0 14px rgba(255, 255, 255, 0.95)",
        borderRadius: "9999px",
      }}
      animate={{
        x: [0, Math.random() * 16 - 8, 0],   // tiny horizontal drift
        y: [0, Math.random() * 16 - 8, 0],   // tiny vertical drift
        opacity: [0.2, 1, 0.4, 0.9, 0.3],    // soft twinkles
        scale: [1, 1.5, 1.1, 1.4, 1],        // gentle shimmer
      }}
      transition={{
        duration: 4 + Math.random() * 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    />
  ))}

  {/* 2. Glow blooms (soft white pulses) */}
  {Array.from({ length: 8 }).map((_, i) => (
    <motion.div
      key={`bloom-${i}`}
      className="absolute rounded-full"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${80 + Math.random() * 140}px`,
        height: `${80 + Math.random() * 140}px`,
        backgroundColor: "rgba(255,180,220,0.9)",
        filter: "blur(50px)",
        borderRadius: "9999px",
      }}
      animate={{
        opacity: [0, 0.4, 0.1, 0],
        scale: [0.9, 1.5, 1.1, 1.6],
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 6,
      }}
    />
  ))}

  {/* 3. Soft breathing haze */}
  <motion.div
    className="absolute inset-0"
    animate={{ opacity: [0.05, 0.15, 0.08] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    style={{
      background:
        "radial-gradient(circle at 50% 45%, rgba(255,196,50,0.10), transparent 70%)",
    }}
  />
</div>

      {/* CONTENT – original layout with cards */}
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="mb-10 md:mb-14 max-w-3xl"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-ink-muted mb-3">
              Step 7 · What Should Change
            </p>
            <h2 className="text-2xl md:text-3xl font-display text-ink mb-3">
              Rewriting the Rules of “Originality”
            </h2>
            <p className="text-sm md:text-[15px] text-ink-muted leading-relaxed">
              If scraping and training have turned human creativity into a raw
              material, the question is not just whether that can be legal, but
              whether it can be fair. This section brainstorms ideas 
              that could rebalance consent, credit, and power in the age of
              generative AI.
            </p>
          </motion.div>

          {/* Left narrative + right change levers (cards) */}
          <div className="grid gap-8 md:gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-start mb-12 md:mb-16">
            {/* Left: narrative */}
            <motion.div
              variants={itemVariants}
              className="space-y-5 text-sm md:text-[15px] text-ink-muted"
            >
              <p className="leading-relaxed">
                The current system defaults to “scrape first, negotiate later.”
                That keeps models impressive, but it also normalizes a world
                where most people never get to say yes, no, or “only under
                these conditions” to having their work ingested.
              </p>
              <p className="leading-relaxed">
                Change doesn’t have to mean shutting down AI entirely. It means
                moving away from invisible extraction toward{" "}
                <span className="text-ink font-semibold">
                  visible, negotiated participation
                </span>
                , where the people whose work fuels these systems are treated as
                stakeholders instead of raw material.
              </p>
              <p className="leading-relaxed">
                That could look like stronger consent defaults, clearer labels
                on synthetic content, shared governance over datasets, and
                collective bargaining so that solo creators are not negotiating
                alone with global platforms.
              </p>

              {/* Micro “principles” row */}
              <div className="mt-4 grid gap-3 text-[12px] text-ink-muted/90">
                <div className="flex items-start gap-2">
                  <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-grad-blue" />
                  <p>
                    <span className="text-ink">Consent by default:</span>{" "}
                    people should have to opt in or have meaningful opt out
                    routes, not discover scraping years later.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-grad-purple" />
                  <p>
                    <span className="text-ink">Transparency with teeth:</span>{" "}
                    not just blog posts, but auditable records of what went
                    into training and how it is governed.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-grad-orange" />
                  <p>
                    <span className="text-ink">Shared benefits:</span> if
                    creators' work fuels these models, they should share in the value
                    they generate.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: change levers grid (cards) */}
            <motion.div
              variants={itemVariants}
              className="grid gap-4 md:gap-5 sm:grid-cols-2"
            >
              <ChangeCard
                label="For AI companies"
                accent="from-grad-blue to-grad-purple"
                bullets={[
                  "Adopt real dataset governance: track licensing status, consent, and removal requests.",
                  "Provide creators with dashboards to see if/when their work was used and to set preferences.",
                  "Treat legal uncertainty as a reason to slow down ingestion, not just a cost of moving fast.",
                ]}
              />

              <ChangeCard
                label="For policymakers"
                accent="from-grad-orange to-grad-yellow"
                bullets={[
                  "Clarify how copyright and fair use apply to large scale training on expressive works.",
                  "Require basic disclosures about training data sources for high impact models.",
                  "Back opt out and removal rights with enforcement, not just voluntary promises.",
                ]}
              />

              <ChangeCard
                label="For platforms & institutions"
                accent="from-grad-purple to-grad-pink"
                bullets={[
                  "Label synthetic and heavily AI edited content where it appears in feeds and search.",
                  "Develop house rules: when is it acceptable to deploy generative AI, and when is human authorship required?",
                  "Support dataset registries and provenance tools so creators can track reuse.",
                ]}
              />

              <ChangeCard
                label="For creative communities"
                accent="from-grad-pink to-grad-blue"
                bullets={[
                  "Organize collectives or guilds that can negotiate licenses and terms on behalf of many artists and writers.",
                  "Share knowledge about contracts, rights, and safer ways to experiment with AI tools.",
                  "Frame objections not as ‘anti-technology’ but as pushing for fairer, more accountable design.",
                ]}
              />
            </motion.div>
          </div>

          {/* Reactions from the panel */}
          <motion.div variants={itemVariants}>
            <ActorReactionsStrip
              title="Reactions from the panel"
              reactions={[
                {
                  actorId: "corporations",
                  quote:
                    "Clearer rules and licensing paths would actually help us plan. Right now, every dataset feels like a separate legal gamble.",
                },
                {
                  actorId: "creators",
                  quote:
                    "I don’t want AI shut down. I want a future where ‘training on my work’ comes with my consent, my terms, and my name still attached.",
                },
                {
                  actorId: "governance",
                  quote:
                    "The challenge is to write rules that protect rights without freezing innovation. That balance won’t come from industry self-regulation alone.",
                },
                {
                  actorId: "public",
                  quote:
                    "I’d feel better using these tools if I could see where they learned from and know that the people behind the data agreed to it.",
                },
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ChangeCard({ label, accent, bullets }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
        boxShadow: "0 22px 50px rgba(0,0,0,0.7)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="relative rounded-2xl border border-card-border/70 bg-night-soft/80 backdrop-blur px-4 py-4 md:px-5 md:py-5"
    >
      <div
        className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${accent} bg-opacity-80 px-3 py-1 text-[11px] font-medium text-night mb-3`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-night/70" />
        <span className="uppercase tracking-[0.22em]">{label}</span>
      </div>

      <ul className="space-y-1.5 text-[12px] md:text-[13px] text-ink-muted leading-relaxed">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-[6px] h-[3px] w-[10px] rounded-full bg-ink/40" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default Change;
