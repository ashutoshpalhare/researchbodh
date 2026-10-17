import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Lightbulb, PenLine } from "lucide-react";
import { getModule, modules, type Module } from "@/lib/curriculum";
import { useProgress, downloadText } from "@/lib/storage";

export const Route = createFileRoute("/learn/$moduleId")({
  loader: ({ params }) => {
    const m = getModule(params.moduleId);
    if (!m) throw notFound();
    return { id: m.id };
  },
  head: ({ loaderData }) => {
    const m = loaderData ? getModule(loaderData.id) : undefined;
    if (!m) return { meta: [{ title: "Module not found — ResearchBodh" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${m.n}. ${m.title} — ResearchBodh` },
        { name: "description", content: m.summary },
        { property: "og:title", content: `${m.title} — ResearchBodh` },
        { property: "og:description", content: m.summary },
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const { id } = Route.useLoaderData();
  const m = getModule(id)!;
  const [tab, setTab] = useState<number | "quiz" | "assignment">(0);
  const [p, setP] = useProgress();
  const idx = modules.findIndex((x) => x.id === m.id);
  const prev = modules[idx - 1];
  const next = modules[idx + 1];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[240px_1fr]">
      <aside className="no-print md:sticky md:top-20 md:self-start">
        <Link to="/learn" className="text-sm text-muted-foreground hover:text-foreground">← All modules</Link>
        <p className="eyebrow mt-4">Module {m.n} · {m.stage}</p>
        <h1 className="mt-1 text-2xl font-semibold">{m.title}</h1>
        <nav className="mt-5 flex flex-col gap-1" aria-label="Lessons">
          {m.lessons.map((l, i) => (
            <button key={l.id} onClick={() => setTab(i)} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted ${tab === i ? "bg-muted font-medium" : ""}`}>
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] ${p.lessons[`${m.id}/${l.id}`] ? "border-success bg-success text-ivory" : ""}`}>
                {p.lessons[`${m.id}/${l.id}`] ? <Check size={12} /> : i + 1}
              </span>
              {l.title}
            </button>
          ))}
          <button onClick={() => setTab("quiz")} className={`rounded-lg px-3 py-2 text-left text-sm hover:bg-muted ${tab === "quiz" ? "bg-muted font-medium" : ""}`}>
            Quiz {p.quizzes[m.id] !== undefined && <span className="text-muted-foreground">· best {p.quizzes[m.id]}%</span>}
          </button>
          <button onClick={() => setTab("assignment")} className={`rounded-lg px-3 py-2 text-left text-sm hover:bg-muted ${tab === "assignment" ? "bg-muted font-medium" : ""}`}>
            Assignment {p.assignments[m.id] && "✓"}
          </button>
        </nav>
      </aside>

      <section key={String(tab)} className="animate-rise min-w-0">
        {typeof tab === "number" ? (
          <LessonView m={m} i={tab} onNext={() => setTab(tab + 1 < m.lessons.length ? tab + 1 : "quiz")} />
        ) : tab === "quiz" ? (
          <Quiz m={m} onScore={(s) => setP((o) => ({ ...o, quizzes: { ...o.quizzes, [m.id]: Math.max(s, o.quizzes[m.id] ?? 0) } }))} />
        ) : (
          <Assignment m={m} />
        )}
        <div className="no-print mt-12 flex justify-between border-t pt-6 text-sm">
          {prev ? <Link to="/learn/$moduleId" params={{ moduleId: prev.id }} className="flex items-center gap-1 text-muted-foreground hover:text-foreground"><ArrowLeft size={14} /> {prev.title}</Link> : <span />}
          {next && <Link to="/learn/$moduleId" params={{ moduleId: next.id }} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">{next.title} <ArrowRight size={14} /></Link>}
        </div>
      </section>
    </div>
  );
}

function LessonView({ m, i, onNext }: { m: Module; i: number; onNext: () => void }) {
  const l = m.lessons[i]!;
  const key = `${m.id}/${l.id}`;
  const [p, setP] = useProgress();
  const done = !!p.lessons[key];
  return (
    <article className="max-w-2xl">
      <p className="text-sm text-muted-foreground">Lesson {i + 1} of {m.lessons.length} · {l.minutes} min</p>
      <h2 className="mt-1 text-3xl font-semibold md:text-4xl">{l.title}</h2>
      <p className="mt-4 border-l-4 border-saffron pl-4 font-display text-xl italic">{l.idea}</p>
      <div className="prose-rb mt-6">
        {l.body.map((b, k) => <p key={k}>{b}</p>)}
        {l.points && <ul>{l.points.map((x) => <li key={x}>{x}</li>)}</ul>}
      </div>
      <div className="card-paper mt-6 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold"><Lightbulb size={16} className="text-saffron" /> Example: {l.example.title}</p>
        <p className="mt-2 text-sm leading-relaxed">{l.example.text}</p>
      </div>
      <div className="mt-4 rounded-xl bg-saffron-soft p-5">
        <p className="flex items-center gap-2 text-sm font-semibold"><PenLine size={16} /> Try it</p>
        <p className="mt-2 text-sm leading-relaxed">{l.exercise}</p>
      </div>
      {l.term && <p className="mt-4 text-sm text-muted-foreground"><strong className="text-foreground">Now you know the term:</strong> {l.term}</p>}
      <div className="no-print mt-8 flex flex-wrap gap-3">
        <button className={`btn ${done ? "btn-ghost" : "btn-ink"}`} onClick={() => setP((o) => ({ ...o, lessons: { ...o.lessons, [key]: !done } }))}>
          <Check size={16} /> {done ? "Marked complete" : "Mark complete"}
        </button>
        <button className="btn btn-saffron" onClick={() => { if (!done) setP((o) => ({ ...o, lessons: { ...o.lessons, [key]: true } })); onNext(); }}>
          Next <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

function Quiz({ m, onScore }: { m: Module; onScore: (s: number) => void }) {
  const [ans, setAns] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const correct = m.quiz.filter((q, i) => ans[i] === q.answer).length;
  const score = Math.round((correct / m.quiz.length) * 100);
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-semibold">Check your understanding</h2>
      <p className="mt-2 text-muted-foreground">Every answer comes with an explanation. Retake as often as you like.</p>
      <ol className="mt-6 space-y-6">
        {m.quiz.map((q, i) => (
          <li key={i} className="card-paper p-5">
            <p className="font-medium">{i + 1}. {q.q}</p>
            <div className="mt-3 grid gap-2">
              {q.options.map((o, k) => {
                const chosen = ans[i] === k;
                const state = submitted ? (k === q.answer ? "border-success bg-success/10" : chosen ? "border-destructive bg-destructive/10" : "") : chosen ? "border-saffron bg-saffron-soft" : "";
                return (
                  <button key={k} disabled={submitted} onClick={() => setAns({ ...ans, [i]: k })} className={`rounded-lg border px-3 py-2 text-left text-sm transition hover:bg-muted ${state}`}>
                    {o}
                  </button>
                );
              })}
            </div>
            {submitted && <p className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">{ans[i] === q.answer ? "Correct. " : "Not quite. "}</strong>{q.why}</p>}
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-center gap-4">
        {!submitted ? (
          <button className="btn btn-ink" disabled={Object.keys(ans).length < m.quiz.length} onClick={() => { setSubmitted(true); onScore(score); }}>Submit answers</button>
        ) : (
          <>
            <p className="font-display text-2xl">{score}%</p>
            <button className="btn btn-ghost" onClick={() => { setAns({}); setSubmitted(false); }}>Retake</button>
          </>
        )}
      </div>
    </div>
  );
}

function Assignment({ m }: { m: Module }) {
  const [p, setP] = useProgress();
  const text = p.assignments[m.id] ?? "";
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-semibold">Assignment</h2>
      <p className="mt-4 leading-relaxed">{m.assignment}</p>
      <textarea
        className="field mt-6 min-h-64"
        placeholder="Write your own answer here. It saves automatically in this browser."
        value={text}
        onChange={(e) => setP((o) => ({ ...o, assignments: { ...o.assignments, [m.id]: e.target.value } }))}
      />
      <div className="no-print mt-3 flex items-center gap-3">
        <span className="text-xs text-muted-foreground">{text.trim() ? text.trim().split(/\s+/).length : 0} words · saved</span>
        <button className="btn btn-ghost" disabled={!text.trim()} onClick={() => downloadText(`researchbodh-${m.id}-assignment.txt`, `${m.title}\n\n${m.assignment}\n\n---\n\n${text}`)}>Download</button>
      </div>
    </div>
  );
}
