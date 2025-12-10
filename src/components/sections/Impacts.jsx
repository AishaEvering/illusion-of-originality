// src/components/ImpactsSection.jsx
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

function ImpactsSection() {
  return (
    <section
      id="impacts"
      className="relative py-24 md:py-32 overflow-hidden w-screen max-w-none"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      {/* Background glows + shimmer (matching Change) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-soft/90 to-night" />
        <div className="absolute -top-32 -left-10 w-[26rem] h-[26rem] rounded-full bg-sky-400/26 blur-[120px]" />
        <div className="absolute top-1/3 right-[-20%] w-[28rem] h-[28rem] rounded-full bg-amber-300/26 blur-[130px]" />
        <div className="absolute bottom-[-30%] left-[10%] w-[30rem] h-[30rem] rounded-full bg-emerald-400/22 blur-[130px]" />
        <div className="absolute -top-20 right-[-10%] w-[20rem] h-[20rem] rounded-full bg-amber-200/45 blur-[80px]" />
        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-white/12 via-transparent to-transparent mix-blend-screen" />
      </div>

      {/* Sparkly shimmer layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.span
            key={`fleck-${i}`}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 0 14px rgba(255, 255, 255, 0.95)",
              borderRadius: "9999px",
            }}
            animate={{
              x: [0, Math.random() * 16 - 8, 0],
              y: [0, Math.random() * 16 - 8, 0],
              opacity: [0.2, 1, 0.4, 0.9, 0.3],
              scale: [1, 1.5, 1.1, 1.4, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`bloom-${i}`}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${80 + Math.random() * 140}px`,
              height: `${80 + Math.random() * 140}px`,
              backgroundColor: "rgba(255,255,255,0.12)",
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

        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.05, 0.15, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.10), transparent 70%)",
          }}
        />
      </div>

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
              Step 6 · Downstream Impacts
            </p>
            <h2 className="text-2xl md:text-3xl font-display text-ink mb-3">
              Who Carries the Impact?
            </h2>
            <p className="text-sm md:text-[15px] text-ink-muted leading-relaxed">
              Once scraping and training are finished, the models feel abstract
              and neutral. But their outputs land on real people: creators whose
              styles are mimicked, workers whose jobs are reshaped, and everyday
              users who navigate feeds saturated with synthetic content.
            </p>
          </motion.div>

          {/* Main layout: left narrative + right impact grid */}
          <div className="grid gap-8 md:gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-start mb-12 md:mb-16">
            {/* Left: narrative + “threads” of impact */}
            <motion.div
              variants={itemVariants}
              className="space-y-5 text-sm md:text-[15px] text-ink-muted"
            >
              <p className="leading-relaxed">
                The illusion of originality doesn’t just live in legal briefs
                or glossy product launches. It ripples out into how people make
                a living, what kinds of stories and images get surfaced, and who
                feels replaceable in their own field.
              </p>
              <p className="leading-relaxed">
                For many creators, the shift is both economic and emotional.
                Their recognizable style can be summoned on demand, even as
                their names disappear. For workers and students, AI writing and
                AI design tools change what “good enough” looks like in daily
                tasks.
              </p>
              <p className="leading-relaxed">
                At the same time, platforms quietly fill with hybrid content:
                part human, part synthetic, often unlabeled. That makes it
                harder for audiences to know whose voice they’re hearing, and
                easier for institutions to treat human contributions as cheap,
                interchangeable training fuel.
              </p>

              {/* little “legend” strip */}
              <div className="mt-4 grid gap-3 text-[12px] text-ink-muted/90">
                <div className="flex items-start gap-2">
                  <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-grad-pink" />
                  <p>
                    <span className="text-ink">Creative labor:</span> styles,
                    voices, and reference images become a background resource
                    that can be sampled without direct credit.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-grad-blue" />
                  <p>
                    <span className="text-ink">Information quality:</span>{" "}
                    synthetic text and images blur the line between reporting,
                    opinion, and auto generated content.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-grad-orange" />
                  <p>
                    <span className="text-ink">Power balance:</span> a few big companies gain
                    most of the benefits from "innovation", while the risks and instability
                    fall on many smaller actors.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: impact cards grid */}
            <motion.div
              variants={itemVariants}
              className="grid gap-4 md:gap-5 sm:grid-cols-2"
            >
              {/* Creators */}
              <ImpactCard
                label="For creators"
                accent="from-grad-pink to-grad-orange"
                bullets={[
                  "Styles and characters can be imitated on demand without a commission or credit.",
                  "Clients sometimes ask, “Why should I pay you if I can prompt something similar?”",
                  "Emotional impact: feeling scraped, copied, or made obsolete by tools trained on your own work.",
                ]}
              />

              {/* Corporations */}
              <ImpactCard
                label="For corporations"
                accent="from-grad-blue to-grad-purple"
                bullets={[
                  "Stronger incentives to scrape more data once a few firms set the bar for model scale.",
                  "Pressure to ship features quickly can outweigh careful consent or dataset governance.",
                  "Legal risk is treated as a cost of doing business, something to be negotiated later.",
                ]}
              />

              {/* Governance */}
              <ImpactCard
                label="For governance"
                accent="from-grad-purple to-grad-orange"
                bullets={[
                  "Courts and regulators are asked to rule on technologies that are already widely deployed.",
                  "Hard to audit training data after the fact, especially when documentation is thin.",
                  "Policy has to balance innovation claims with long term impacts on culture and labor.",
                ]}
              />

              {/* Everyday public */}
              <ImpactCard
                label="For everyday users"
                accent="from-grad-yellow to-grad-pink"
                bullets={[
                  "Feeds fill with synthetic images, reviews, and articles that may not be clearly labeled.",
                  "People may unknowingly rely on outputs built from their own data.",
                  "Trust in what is “real,” “reported,” or “authored” becomes harder to maintain over time.",
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
                    "From our perspective, these tools expand creativity and productivity. The real challenge is helping people adapt, not slowing the technology down.",
                },
                {
                  actorId: "creators",
                  quote:
                    "It’s not just that the model can echo my style. It’s that my name disappears while the company selling the model gets all the credit and revenue.",
                },
                {
                  actorId: "governance",
                  quote:
                    "We’re being asked to referee conflicts that were baked in at the design stage, long after scraping and training have already happened.",
                },
                {
                  actorId: "public",
                  quote:
                    "I love how fast these tools are, but it’s unsettling to realize that somebody’s unpaid work is sitting behind almost every ‘AI generated’ thing I see.",
                },
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ImpactCard({ label, accent, bullets }) {
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
      {/* Accent pill */}
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

export default ImpactsSection;
