import { citations } from "../../data/citations";

function Sources() {
  return (
    <section id="sources" className="py-20 max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-display mb-6">Sources & References</h2>

      <ul className="space-y-4 text-sm text-ink-muted leading-relaxed">
        {Object.values(citations).map((c, i) => (
          <li key={i}>
            {c.author} ({c.year}). <em>{c.title}</em>. {c.source}.{" "}
            {c.url && (
              <a
                href={c.url}
                className="underline text-grad-orange hover:text-grad-pink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Sources;
