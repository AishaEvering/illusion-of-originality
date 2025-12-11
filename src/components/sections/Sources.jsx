// src/components/Sources.jsx
import React from "react";
import { motion } from "framer-motion";
import { citations } from "../../data/citations";

const containerVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Sources() {
  return (
    <section
      id="sources"
      className="relative py-20 md:py-24 max-w-3xl mx-auto px-4"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-[-10%] w-[22rem] h-[22rem] rounded-full bg-grad-blue/18 blur-[120px]" />
        <div className="absolute bottom-[-25%] right-[-10%] w-[24rem] h-[24rem] rounded-full bg-grad-orange/14 blur-[130px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl font-display text-ink mb-6"
        >
          Sources &amp; References
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xs md:text-[13px] text-ink-muted mb-10 leading-relaxed"
        >
          This project draws on legal filings, model documentation, policy
          guidance, scholarly work, investigative journalism, and public
          statements from creators, along with inline citations used in earlier
          sections of this website.
        </motion.p>

        {/* ---------------------------------------------- */}
        {/*  Inline actor + section citations (your citations.js) */}
        {/* ---------------------------------------------- */}
        <SourceGroup title="Inline citations & actor references">
          {Object.values(citations).map((c, i) => (
            <SourceItem key={i}>
              {c.author} ({c.year}). <em>{c.title}</em>. {c.source}.{" "}
              {c.url && <SourceLink href={c.url} />}
            </SourceItem>
          ))}
        </SourceGroup>

        {/* ---------------------------------------------- */}
        {/*  MAIN APA REFERENCES — LEGAL CASES              */}
        {/* ---------------------------------------------- */}
        <SourceGroup title="Legal cases (primary sources)">
          <SourceItem>
            Getty Images (US), Inc. v.{" "}
            <em>Stability AI, Inc.</em>, No. 1:23-cv-00135 (D. Del. 2023).{" "}
            <SourceLink href="https://www.courtlistener.com/docket/66795436/getty-images-us-inc-v-stability-ai-inc/" />
          </SourceItem>
          <SourceItem>
            <em>The New York Times Company</em> v.{" "}
            <em>Microsoft Corporation &amp; OpenAI, Inc.</em>, No. 1:23-cv-11195
            (S.D.N.Y. 2023).{" "}
            <SourceLink href="https://www.courtlistener.com/docket/68009527/the-new-york-times-company-v-microsoft-corporation/" />
          </SourceItem>
          <SourceItem>
            <em>Authors Guild</em> v. <em>OpenAI, Inc.</em>, No. 1:23-cv-10311
            (S.D.N.Y. 2023).{" "}
            <SourceLink href="https://www.courtlistener.com/docket/67693344/authors-guild-v-openai-inc/" />
          </SourceItem>
        </SourceGroup>

        {/* ---------------------------------------------- */}
        {/*  DATASETS & TECH                                */}
        {/* ---------------------------------------------- */}
        <SourceGroup title="Datasets & technical documentation">
          <SourceItem>
            Rombach, R., Blattmann, A., Lorenz, D., Esser, P., &amp; Ommer, B.
            (2022). <em>Stable Diffusion model card</em>. Stability AI.{" "}
            <SourceLink href="https://huggingface.co/CompVis/stable-diffusion" />
          </SourceItem>

          <SourceItem>
            Schuhmann, C., Beaumont, R., Vencu, R., Gordon, C., Wightman, R., &
            Cope, A. (2022).{" "}
            <em>
              LAION-5B: A large-scale dataset for training next-generation
              image–language models
            </em>
            . <SourceLink href="https://laion.ai/blog/laion-5b/" />
          </SourceItem>

          <SourceItem>
            OpenAI. (2023). <em>GPT-4 System Card</em>.{" "}
            <SourceLink href="https://cdn.openai.com/papers/gpt-4-system-card.pdf" />
          </SourceItem>

          <SourceItem>
            Midjourney. (2023).{" "}
            <em>Community Guidelines and Training Data FAQ</em>.{" "}
            <SourceLink href="https://docs.midjourney.com/" />
          </SourceItem>
        </SourceGroup>

        {/* ---------------------------------------------- */}
        {/*  POLICY & GOVERNANCE                            */}
        {/* ---------------------------------------------- */}
        <SourceGroup title="Policy & governance">
          <SourceItem>
            U.S. Copyright Office. (2023).{" "}
            <em>
              Copyright registration guidance: Works containing material
              generated by artificial intelligence
            </em>
            . <SourceLink href="https://www.copyright.gov/ai/" />
          </SourceItem>

          <SourceItem>
            European Parliament &amp; Council. (2024).{" "}
            <em>EU Artificial Intelligence Act</em>.{" "}
            <SourceLink href="https://artificialintelligenceact.eu/" />
          </SourceItem>

          <SourceItem>
            Federal Trade Commission. (2023).{" "}
            <em>The FTC’s approach to AI and deceptive practices</em>.{" "}
            <SourceLink href="https://www.ftc.gov/news-events/topics/artificial-intelligence" />
          </SourceItem>
        </SourceGroup>

        {/* ---------------------------------------------- */}
        {/*  SCHOLARLY                                      */}
        {/* ---------------------------------------------- */}
        <SourceGroup title="Scholarly & analytical sources">
          <SourceItem>
            Barocas, S., Hardt, M., &amp; Narayanan, A. (2023).{" "}
            <em>Fairness and Machine Learning</em>.{" "}
            <SourceLink href="https://fairmlbook.org/" />
          </SourceItem>

          <SourceItem>
            Benjamin, R. (2019).{" "}
            <em>
              Race after technology: Abolitionist tools for the New Jim Code
            </em>
            . Polity Press.
          </SourceItem>

          <SourceItem>
            Kitchin, R. (2014).{" "}
            <em>
              The Data Revolution: Big Data, Open Data, and Data Infrastructures
            </em>
            . Sage Publications.
          </SourceItem>

          <SourceItem>
            Narayanan, A. (2023). <em>How to recognize AI snake oil</em>.
            Princeton University.{" "}
            <SourceLink href="https://www.youtube.com/watch?v=F6xjAGf0YBM" />
          </SourceItem>
        </SourceGroup>

        {/* ---------------------------------------------- */}
        {/*  JOURNALISM                                     */}
        {/* ---------------------------------------------- */}
        <SourceGroup title="Journalism & investigations">
          <SourceItem>
            Vincent, J. (2023). Everything you need to know about the biggest AI
            copyright lawsuits. <em>The Verge</em>.{" "}
            <SourceLink href="https://www.theverge.com" />
          </SourceItem>

          <SourceItem>
            Hao, K. (2022). We read the lawsuit trying to stop Stable Diffusion.{" "}
            <em>MIT Technology Review</em>.{" "}
            <SourceLink href="https://www.technologyreview.com" />
          </SourceItem>

          <SourceItem>
            Roose, K. (2024). The Times sues OpenAI and Microsoft.{" "}
            <em>The New York Times</em>.{" "}
            <SourceLink href="https://www.nytimes.com" />
          </SourceItem>

          <SourceItem>
            Metz, C. (2022). The artists suing AI companies.{" "}
            <em>The New York Times</em>.{" "}
            <SourceLink href="https://www.nytimes.com" />
          </SourceItem>
        </SourceGroup>

        {/* ---------------------------------------------- */}
        {/*  CREATOR PERSPECTIVES                           */}
        {/* ---------------------------------------------- */}
        <SourceGroup title="Creator perspectives & public statements">
          <SourceItem>
            Allen, S. (2022). As an artist, I never agreed to this: Why I'm
            suing Midjourney and Stability AI.{" "}
            <SourceLink href="https://stablediffusionsuit.com/" />
          </SourceItem>

          <SourceItem>
            Creative Commons. (2023). Artists’ open letter on AI training data.{" "}
            <SourceLink href="https://creativecommons.org" />
          </SourceItem>
        </SourceGroup>
      </motion.div>
    </section>
  );
}

/* -------------------------- Helper Components -------------------------- */

function SourceGroup({ title, children }) {
  return (
    <div className="space-y-3 mb-10">
      <h3 className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-ink-muted">
        {title}
      </h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function SourceItem({ children }) {
  return <li className="leading-relaxed">{children}</li>;
}

function SourceLink({ href }) {
  return (
    <a
      href={href}
      className="underline text-grad-orange hover:text-grad-pink transition-colors duration-150"
      target="_blank"
      rel="noopener noreferrer"
    >
      Link
    </a>
  );
}

export default Sources;
