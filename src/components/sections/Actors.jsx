import React from "react";

function Actors() {
  return (
    <section id="actors" className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-display">
        Four Key Actors in the Illusion
      </h2>
      <p className="text-sm md:text-base text-ink-muted max-w-2xl">
        The illusion of originality is sustained by interactions between
        corporations, defendants, governance bodies, and everyday users.
      </p>

      <div className="grid gap-4 md:grid-cols-2 text-[13px]">
        <div className="p-4 rounded-2xl border border-card-border bg-night-soft/80">
          <h3 className="font-medium mb-1 bg-gradient-to-r from-grad-pink to-grad-orange bg-clip-text text-transparent">
            Corporations Scraping the Internet
          </h3>
          <p className="text-ink-muted">
            AI companies and dataset builders who collect data at scale and
            frame their models as innovative and transformative.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-card-border bg-night-soft/80">
          <h3 className="font-medium mb-1 text-ink">
            Defendants (Creators &amp; Rights Holders)
          </h3>
          <p className="text-ink-muted">
            Artists, authors, journalists, and media companies pushing back
            through lawsuits, contracts, and public campaigns.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-card-border bg-night-soft/80">
          <h3 className="font-medium mb-1 text-ink">
            Governance (Courts &amp; Regulators)
          </h3>
          <p className="text-ink-muted">
            Legal and policy institutions trying to adapt copyright,
            privacy, and AI regulation to fast-moving technologies.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-card-border bg-night-soft/80">
          <h3 className="font-medium mb-1 text-ink">
            Consumers &amp; Everyday Users
          </h3>
          <p className="text-ink-muted">
            People who prompt, share, and normalize AI outputs—often without
            seeing how their own data and labor feed the system.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Actors;
