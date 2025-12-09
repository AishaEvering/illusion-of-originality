// src/components/ActorReactionsStrip.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  onActorClick,
}) {
  const [selected, setSelected] = useState(null);

  if (!reactions || reactions.length === 0) return null;

  return (
    <>
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

            const handleClick = () => {
              if (onActorClick) onActorClick({ actor, reaction: item, index });
              setSelected({ actor, reaction: item, index });
            };

            return (
              <motion.div
                key={actor.id}
                variants={cardVariants}
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                  }
                }}
                className="
                  relative
                  flex items-start gap-2
                  rounded-2xl border border-card-border/80
                  bg-black/60 backdrop-blur-md
                  px-3 py-2.5 
                  text-[11px] leading-snug
                  max-w-md
                  cursor-pointer focus:outline-none focus:ring-2 focus:ring-grad-orange/70 focus:ring-offset-2 focus:ring-offset-black/60
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

      {/* Modal zoom on selected reaction */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
                duration: 0.8,
              }}
              className="bg-night-soft/95 border border-card-border/80 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] w-full max-w-lg p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 right-3 text-ink-muted hover:text-ink"
                onClick={() => setSelected(null)}
              >
                <span className="text-lg leading-none">✕</span>
              </motion.button>

              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-full bg-night-soft border border-card-border/80 flex items-center justify-center">
                  <div
                    className={`
                        absolute inset-0 rounded-full 
                        bg-gradient-to-br ${selected.actor.accentClass}
                        opacity-50
                      `}
                  />
                  <div className="absolute inset-[3px] rounded-full bg-night-soft" />
                  {selected.actor.iconSrc ? (
                    <img
                      src={selected.actor.iconSrc}
                      alt={selected.actor.label}
                      className="relative z-10 w-[70%] h-[70%] object-contain"
                    />
                  ) : (
                    <span className="relative z-10 text-[11px] font-medium text-ink">
                      {selected.actor.shortLabel}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                    {selected.actor.label}
                  </p>
                  <p className="text-[12px] text-ink-muted/80">
                    Reaction #{selected.index + 1}
                  </p>
                </div>
              </div>

              <p className="text-[14px] md:text-[15px] text-ink leading-relaxed">
                “{selected.reaction.quote}”
                {selected.reaction.citation && (
                  <sup className="align-super ml-[4px] text-[10px] text-grad-orange">
                    <a href="#sources">{selected.index + 1}</a>
                  </sup>
                )}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ActorReactionsStrip;
