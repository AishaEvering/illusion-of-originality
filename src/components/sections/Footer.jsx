// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaGlobeAmericas } from "react-icons/fa";

// TODO: update these with your real links
const LINKS = {
  github: "https://github.com/AishaEvering",
  linkedin: "https://www.linkedin.com/in/aisha-evering-91580a3/",
  portfolio: "https://aishaeportfolio.com/",
};

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Footer() {
  return (
    <footer className="relative border-t border-card-border/60 mt-10">
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-[10%] w-[18rem] h-[18rem] rounded-full bg-grad-blue/14 blur-[110px]" />
        <div className="absolute -bottom-32 right-[5%] w-[20rem] h-[20rem] rounded-full bg-grad-purple/18 blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-[13px]"
      >
        {/* Left: name + course + school */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-ink font-medium tracking-wide">
            Aisha Evering
          </p>
          <p className="text-ink-muted">
            BIO 511 · Big Data In Context · Arizona State University
          </p>
          <p className="text-ink-muted/80">
            Fall 2025 · “Illusion of Originality” final project
          </p>
        </div>

        {/* Right: social / portfolio icons */}
        <div className="flex items-center gap-4 md:gap-5">
          {LINKS.github && (
            <IconLink href={LINKS.github} label="GitHub">
              <FaGithub className="h-5 w-5 md:h-6 md:w-6" />
            </IconLink>
          )}

          {LINKS.linkedin && (
            <IconLink href={LINKS.linkedin} label="LinkedIn">
              <FaLinkedin className="h-5 w-5 md:h-6 md:w-6" />
            </IconLink>
          )}

          {LINKS.portfolio && (
            <IconLink href={LINKS.portfolio} label="Portfolio">
              <FaGlobeAmericas className="h-5 w-5 md:h-6 md:w-6" />
            </IconLink>
          )}
        </div>
      </motion.div>
    </footer>
  );
}

function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center justify-center rounded-full border border-card-border/70
        bg-night-soft/80 backdrop-blur-sm p-2 md:p-2.5
        text-ink-muted hover:text-ink hover:border-grad-orange hover:bg-night
        transition-colors duration-200
      "
    >
      {children}
    </a>
  );
}

export default Footer;
