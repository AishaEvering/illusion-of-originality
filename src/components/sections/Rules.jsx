// src/components/RulesSection.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.14,
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

function RulesSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const introTextRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // clean up any existing triggers on this section
    const cleanup = () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === sectionEl) st.kill(true);
      });
    };
    cleanup();

    // initial states
    gsap.set(cardRef.current, {
      scale: 1,
      opacity: 1,
      backgroundColor: "rgba(255,255,255,0.85)",
      boxShadow: "0 0 40px rgba(255,255,255,0.25)",
    });
    gsap.set(introTextRef.current, { opacity: 1 });
    gsap.set(pageRef.current, { opacity: 0, scale: 0.9, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    });

    // first phase: grow and tint slightly
    tl.to(
      cardRef.current,
      {
        scale: 6,
        backgroundColor: "rgba(226,232,240,0.85)",
        boxShadow: "0 0 60px rgba(255,255,255,0.35)",
        ease: "power1.inOut",
        duration: 0.5,
      },
      0
    );

    // fade intro text
    tl.to(
      introTextRef.current,
      {
        opacity: 0,
        ease: "power1.out",
        duration: 0.25,
      },
      0.1
    );

    // second phase: larger scale + soften
    tl.to(
      cardRef.current,
      {
        scale: 16,
        backgroundColor: "rgba(245,247,250,0.9)",
        boxShadow: "0 0 90px rgba(255,255,255,0.35)",
        ease: "power2.inOut",
        duration: 0.6,
      },
      0.5
    );

    // reveal the page as you "enter" the card
    tl.to(
      pageRef.current,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.4,
      },
      0.45
    );

    return cleanup;
  }, []);

  return (
    <section
      id="rules"
      ref={sectionRef}
      className="relative min-h-[190vh] text-black w-screen max-w-none overflow-hidden"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      {/* Soft background so it feels lighter than timeline but still on-brand */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-soft to-night/95" />
        <div className="absolute -top-32 left-[-10%] w-[30rem] h-[30rem] rounded-full bg-grad-purple/35 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[28rem] h-[28rem] rounded-full bg-grad-orange/30 blur-[120px]" />
      </div>

      {/* === STAGE 1: BLACK BACKGROUND + EXPANDING CIRCLE === */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          ref={cardRef}
          className="relative h-48 w-80 rounded-[28px] bg-white/85 border border-neutral-200 shadow-[0_0_60px_rgba(255,255,255,0.4)] flex items-center justify-center px-8"
        >
          {/* LAW label with flanking arrows */}
          <div ref={introTextRef} className="flex items-center gap-3 text-neutral-800">
            <span className="text-sm md:text-base opacity-70">↓</span>
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.32em]">
              Regulations
            </span>
            <span className="text-sm md:text-base opacity-70">↓</span>
          </div>
        </motion.div>
      </div>

      {/* === STAGE 2: WHITE LEGAL DOSSIER PAGE (FIXED POSITIONING) === */}
      <motion.div
        ref={pageRef}
        className="relative bg-white text-black"
      >
        {/* Pencil / margin notes (very subtle) */}
        <div className="pointer-events-none absolute top-10 right-6 text-[10px] text-neutral-300 italic rotate-[4deg]">
          check DMCA carve-outs
        </div>
        <div className="pointer-events-none absolute top-40 -left-2 text-[10px] text-neutral-300 italic -rotate-[6deg]">
          training ≠ copying? &mdash; disputed
        </div>
        <div className="pointer-events-none absolute bottom-24 right-1/3 text-[10px] text-neutral-300 italic rotate-[2deg]">
          note: EU rules stricter on data
        </div>

        {/* Light ruled “paper” feel */}
        <div className="absolute inset-0 opacity-[0.22] pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[length:100%_32px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* Header block – like a brief title page */}
            <motion.div
              variants={itemVariants}
              className="border-b border-neutral-300 pb-6 mb-8"
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-2">
                Step 5 · Legal & Institutional Rules
              </p>
              <h2 className="text-2xl md:text-3xl font-display text-black mb-3">
                Institutional Policies Governing Data Scraping for AI Training
              </h2>
              <p className="text-xs md:text-[13px] text-neutral-600 uppercase tracking-[0.18em]">
                Memorandum &mdash; Overview of Applicable Frameworks
              </p>
            </motion.div>

            {/* Intro paragraph */}
            <motion.p
              variants={itemVariants}
              className="max-w-3xl text-sm md:text-[15px] text-neutral-800 mb-10 leading-relaxed"
            >
              This section treats generative AI training not as a magical black
              box, but as a regulated activity. The goal is to map the legal and
              institutional rules that currently shape how companies scrape,
              store, and repurpose human created data.
            </motion.p>

            {/* I. U.S. LEGAL & REGULATORY FRAMEWORK */}
            <motion.h3
              variants={itemVariants}
              className="text-[13px] md:text-sm font-semibold tracking-[0.2em] uppercase text-neutral-700 mb-3"
            >
              I. U.S. Legal &amp; Regulatory Framework
            </motion.h3>

            {/* 1. COPYRIGHT */}
            <motion.div
              variants={itemVariants}
              className="border-l border-neutral-300 pl-4 md:pl-5 mb-8"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-700 mb-1">
                1. Copyright Law (Title 17, U.S. Code)
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed mb-2">
                Copyright governs copying, distribution, and derivative works,
                but it does <span className="font-semibold">not</span> regulate
                how material is obtained. As a result, web scraping itself sits
                in a gray zone unless it violates some other rule (e.g. contract
                law, privacy law, anti-circumvention).
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed mb-2">
                <span className="font-semibold">Actor positions:</span> AI
                companies argue that training is a{" "}
                <em>transformative use</em>, extracting statistical patterns
                rather than substitutable copies. Creators argue that
                large scale ingestion is infringement and that outputs can be
                derivative works that echo protected styles and compositions.
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed">
                Courts in cases such as <em>Getty Images v. Stability AI</em>{" "}
                and <em>New York Times v. OpenAI</em> are now being asked to
                decide whether mass scraping for training fits within fair use
                or crosses the line into industrial-scale copying.
              </p>
            </motion.div>

            {/* 2. DMCA */}
            <motion.div
              variants={itemVariants}
              className="border-l border-neutral-300 pl-4 md:pl-5 mb-10"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-700 mb-1">
                2. DMCA Anti-Circumvention &amp; Notice-and-Takedown
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed mb-2">
                The Digital Millennium Copyright Act (DMCA) prohibits
                circumventing technical protection measures (for example,
                paywalls or login barriers) and establishes a notice-and-takedown
                system for infringing copies.
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed mb-2">
                AI companies typically claim that scraping{" "}
                <em>publicly visible</em> HTML does not “circumvent” anything,
                so the DMCA anti-circumvention provisions do not apply. They
                also point to certain text-and-data-mining exemptions, originally
                intended for research, as evidence that copying for analysis can
                be lawful.
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed">
                Creators use DMCA takedowns and litigation when their work
                appears in training datasets or in outputs that visibly echo
                their originals.
              </p>
            </motion.div>

            {/* II. INTERNATIONAL RULES */}
            <motion.h3
              variants={itemVariants}
              className="text-[13px] md:text-sm font-semibold tracking-[0.2em] uppercase text-neutral-700 mb-3"
            >
              II. International Rules
            </motion.h3>

            {/* 3. GDPR */}
            <motion.div
              variants={itemVariants}
              className="border-l border-neutral-300 pl-4 md:pl-5 mb-8"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-700 mb-1">
                3. GDPR (EU General Data Protection Regulation)
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed mb-2">
                GDPR requires a lawful basis for processing, transparency about
                data use, minimization, and enforceable user rights. Scraping
                personal data including identifiable photos, voices, and
                text without consent will often conflict with these
                requirements.
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed">
                Regulators emphasize consent and purpose limitation, while
                companies lobby for broad research and text-and-data-mining
                exemptions that would cover large scale training.
              </p>
            </motion.div>

            {/* 4. EU AI ACT */}
            <motion.div
              variants={itemVariants}
              className="border-l border-neutral-300 pl-4 md:pl-5 mb-10"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-700 mb-1">
                4. EU AI Act (2024)
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed mb-2">
                The EU AI Act is the first major attempt to regulate AI
                comprehensively. It requires documentation of training data
                sources, licensing status, and risk assessments, especially for
                foundation models.
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed">
                High risk and foundation systems are expected not to rely on
                illegally obtained data. Civil society advocates push for strong
                transparency and enforcement, while industry seeks flexible
                definitions of “public data” and lighter disclosure obligations.
              </p>
            </motion.div>

            {/* III. INDUSTRY STANDARDS */}
            <motion.h3
              variants={itemVariants}
              className="text-[13px] md:text-sm font-semibold tracking-[0.2em] uppercase text-neutral-700 mb-3"
            >
              III. Emerging Industry Standards
            </motion.h3>

            {/* 5. MODEL / DATA CARDS */}
            <motion.div
              variants={itemVariants}
              className="border-l border-neutral-300 pl-4 md:pl-5 mb-10"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-700 mb-1">
                5. Model Cards &amp; Data Cards
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed mb-2">
                Model cards and data cards are documentation tools that describe
                model behavior, training data sources, known risks, and intended
                uses. They are not legally mandated, but are increasingly seen
                as part of “responsible AI” practice.
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed">
                Researchers and advocacy groups promote them as transparency
                tools. Companies sometimes adopt them selectively, revealing
                enough to appear accountable while still protecting proprietary
                datasets.
              </p>
            </motion.div>

            {/* IV. LEGAL TRENDS */}
            <motion.h3
              variants={itemVariants}
              className="text-[13px] md:text-sm font-semibold tracking-[0.2em] uppercase text-neutral-700 mb-3"
            >
              IV. Legal Trends in Creative Labor
            </motion.h3>

            {/* 6. GUILDS */}
            <motion.div
              variants={itemVariants}
              className="border-l border-neutral-300 pl-4 md:pl-5 mb-8"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-700 mb-1">
                6. Professional Guild Policies (WGA, SAG-AFTRA)
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed mb-2">
                Recent contracts for writers and actors now include explicit
                clauses about AI, including limits on using members’ work for
                training, requirements for consent, and conditions for
                compensation and credit.
              </p>
              <p className="text-sm text-neutral-800 leading-relaxed">
                Labor groups frame these provisions as a baseline for protecting
                creative workers in an AI saturated industry. Studios and
                technology companies negotiate for flexibility to keep AI in
                their production pipelines while avoiding binding precedents
                that would restrict data access.
              </p>
            </motion.div>

            {/* Closing note */}
            <motion.p
              variants={itemVariants}
              className="text-xs md:text-[13px] text-neutral-600 italic"
            >
              Together, these rules don’t fully resolve the ethics of scraping,
              but they define the battlefield. The next sections ask how those
              rules should change if we take creative labor and consent
              seriously.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default RulesSection;
