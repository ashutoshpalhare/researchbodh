import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { glossary } from "@/lib/glossary";
import { getModule } from "@/lib/curriculum";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Research glossary — ResearchBodh" },
      { name: "description", content: "Plain-language definitions of key research terms, from abstract to validity." },
      { property: "og:title", content: "Research glossary — ResearchBodh" },
      { property: "og:description", content: "Key research terms explained simply." },
    ],
  }),
  component: Glossary,
});

function Glossary() {
  const [q, setQ] = useState("");
  const list = glossary.filter((g) => (g.term + g.def).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="eyebrow">Reference</p>
      <h1 className="mt-2 text-4xl font-semibold">Glossary</h1>
      <input className="field mt-6" placeholder="Search terms…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search glossary" />
      <dl className="mt-6 divide-y">
        {list.map((g) => {
          const m = getModule(g.module);
          return (
            <div key={g.term} className="py-4">
              <dt className="font-display text-lg font-semibold">{g.term}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                {g.def}{" "}
                {m && <Link to="/learn/$moduleId" params={{ moduleId: m.id }} className="text-saffron underline-offset-4 hover:underline">Module {m.n}</Link>}
              </dd>
            </div>
          );
        })}
        {list.length === 0 && <p className="py-6 text-sm text-muted-foreground">No matching term.</p>}
      </dl>
    </div>
  );
}
