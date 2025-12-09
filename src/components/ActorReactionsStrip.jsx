// src/components/ActorReactionsStrip.jsx
import React from "react";
import { motion } from "framer-motion";
import { ACTORS } from "../data/actors";

// animation variants for the whole strip + individual cards
const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

function ActorReactionsStrip({
  reactions,
  title = "Reactions from the Panel",
  className = "",
}) {
  if (!reactions || reactions.length === 0) return null;

  return (
    <motion.div
      className={`mt-10 space-y-3 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      {/* Label */}
      <p className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
        {title}
      </p>

      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
        {reactions.map((item, index) => {
          const actor = ACTORS[item.actorId];
          if (!actor) return null;
          const refNumber = index + 1;

          return (
            <motion.div
              key={actor.id}
              variants={cardVariants}
              className="
                relative
                flex items-start gap-2
                rounded-2xl border border-card-border/80
                bg-black/60 backdrop-blur-md
                px-3 py-2.5 
                text-[11px] leading-snug
                max-w-md
              "
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {/* Avatar */}
              <div className="mt-[2px] flex-shrink-0">
                <div className="relative w-8 h-8 rounded-full bg-night-soft border border-card-border/80 flex items-center justify-center">
                  {/* subtle colored ring */}
                  <div
                    className={`
                      absolute inset-0 rounded-full 
                      bg-gradient-to-br ${actor.accentClass}
                      opacity-40
                    `}
                  />
                  <div className="absolute inset-[2px] rounded-full bg-night-soft" />

                  {actor.iconSrc ? (
                    <img
                      src={actor.iconSrc}
                      alt={actor.label}
                      className="relative z-10 w-[70%] h-[70%] object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="relative z-10 text-[10px] font-medium text-ink">
                      {actor.shortLabel}
                    </span>
                  )}
                </div>
              </div>

              {/* Text + tiny reference link */}
              <div className="flex-1">
                <p className="text-ink">
                  “{item.quote}”
                  {item.citation && (
                    <sup className="align-super ml-[2px] text-[9px] text-grad-orange cursor-pointer">
                      <a href="#sources">{refNumber}</a>
                    </sup>
                  )}
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                  {actor.shortLabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ActorReactionsStrip;
