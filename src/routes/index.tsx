import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Compass, Wrench } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { modules, allLessons } from "@/lib/curriculum";
import { useProgress } from "@/lib/storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResearchBodh — From Curiosity to Confident Research" },
      { name: "description", content: "Free, step-by-step academy teaching students to question, investigate, analyse and write research." },
      { property: "og:title", content: "ResearchBodh — From Curiosity to Confident Research" },
      { property: "og:description", content: "Nine modules that turn curiosity into confident research. Free, no sign-up." },
    ],
  }),
  component: Home,
});

function Home() {
  const [p] = useProgress();
  const done = allLessons.filter((l) => p.lessons[l.key]).length;
  const next = allLessons.find((l) => !p.lessons[l.key]);
  return (
    <div>
      <section className="paper-grain border-b">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-rise">
            <p className="eyebrow">A free research academy</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
              From curiosity to <em className="text-saffron">confident</em> research.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Learn to ask sharp questions, weigh evidence, and write honestly about what you found. No paper generator — just better thinking.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {next && done > 0 ? (
                <Link to="/learn/$moduleId" params={{ moduleId: next.moduleId }} className="btn btn-saffron">
                  Continue: {next.title} <ArrowRight size={16} />
                </Link>
              ) : (
                <Link to="/learn/$moduleId" params={{ moduleId: modules[0].id }} className="btn btn-saffron">
                  Start module 1 <ArrowRight size={16} />
                </Link>
              )}
              <Link to="/learn" className="btn btn-ghost">See all modules</Link>
            </div>
            {done > 0 && <p className="mt-4 text-sm text-muted-foreground">{done} of {allLessons.length} lessons done.</p>}
          </div>
          <img src={hero} alt="Open notebook with handwritten questions beside a cup of chai" className="card-paper aspect-[4/3] w-full object-cover" width={1200} height={900} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Compass, t: "Concepts before jargon", d: "Every idea is explained in plain words first. Terms come after you understand them." },
            { icon: BookOpen, t: "Learn by doing", d: "Each lesson has an example and an exercise. Each module ends with a quiz and assignment." },
            { icon: Wrench, t: "Tools that coach", d: "Builders and checklists guide your own thinking — they never write for you." },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className="card-paper p-6">
              <I className="text-saffron" />
              <h3 className="mt-3 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">The path</p>
        <h2 className="mt-2 text-3xl font-semibold">Nine modules, one journey</h2>
        <ol className="mt-8 grid gap-3 md:grid-cols-3">
          {modules.map((m) => (
            <li key={m.id}>
              <Link to="/learn/$moduleId" params={{ moduleId: m.id }} className="card-paper flex h-full gap-4 p-5 transition hover:-translate-y-0.5">
                <span className="font-display text-3xl text-saffron">{m.n}</span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">{m.stage}</span>
                  <span className="font-semibold">{m.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
