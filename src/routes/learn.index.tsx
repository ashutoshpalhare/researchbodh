import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { modules, stages } from "@/lib/curriculum";
import { useProgress } from "@/lib/storage";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "All modules — ResearchBodh" },
      { name: "description", content: "Browse all nine ResearchBodh modules and track your progress." },
      { property: "og:title", content: "All modules — ResearchBodh" },
      { property: "og:description", content: "Nine modules from curiosity to a capstone project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Learn,
});

function Learn() {
  const [p] = useProgress();
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="eyebrow">Curriculum</p>
      <h1 className="mt-2 text-4xl font-semibold">Module explorer</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Go in order or jump to what you need. Your progress is saved in this browser.</p>
      {stages.map((s) => (
        <section key={s} className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{s}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {modules.filter((m) => m.stage === s).map((m) => {
              const done = m.lessons.filter((l) => p.lessons[`${m.id}/${l.id}`]).length;
              const pct = Math.round((done / m.lessons.length) * 100);
              const score = p.quizzes[m.id];
              return (
                <Link key={m.id} to="/learn/$moduleId" params={{ moduleId: m.id }} className="card-paper block p-6 transition hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold"><span className="text-saffron">{m.n}.</span> {m.title}</h3>
                    {pct === 100 && <CheckCircle2 className="shrink-0 text-success" size={20} />}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{m.summary}</p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-saffron" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {done}/{m.lessons.length} lessons{score !== undefined && ` · Quiz best ${score}%`}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
