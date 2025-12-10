// src/components/DedicationSection.jsx
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
    },
  },
};

function Dedication() {
  return (
    <section
      id="dedication"
      className="relative py-20 md:py-24 px-4 max-w-3xl mx-auto text-center"
    >
      {/* Soft background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[26rem] h-[26rem] rounded-full bg-grad-purple/20 blur-[130px]" />
        <div className="absolute bottom-[-30%] left-[10%] w-[20rem] h-[20rem] rounded-full bg-grad-blue/18 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[5%] w-[22rem] h-[22rem] rounded-full bg-grad-orange/16 blur-[130px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative"
      >
        <p className="text-[11px] uppercase tracking-[0.25em] text-ink-muted mb-4">
          Dedication
        </p>

        <h2 className="text-2xl md:text-3xl font-display text-ink mb-4">
          To my family
        </h2>

        <p className="text-sm md:text-[15px] text-ink-muted leading-relaxed max-w-xl mx-auto">
          To my family: thank you for surviving my “I swear I’m almost done”
          weeks, my many cups of coffee, and my complete lack of sleep.
          <br className="hidden md:block" /> This project exists because of you.
        </p>
      </motion.div>
    </section>
  );
}

export default Dedication;
