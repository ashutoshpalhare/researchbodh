import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Printer } from "lucide-react";
import { useLocal, downloadText } from "@/lib/storage";

export const Route = createFileRoute("/toolkit")({
  head: () => ({
    meta: [
      { title: "Research toolkit — ResearchBodh" },
      { name: "description", content: "Question builder, source checker, outline builder, citation helper, notes and submission checklist." },
      { property: "og:title", content: "Research toolkit — ResearchBodh" },
      { property: "og:description", content: "Guided tools that coach your thinking, saved in your browser." },
    ],
  }),
  component: Toolkit,
});

const tools = ["Question builder", "Source checker", "Outline builder", "Citation helper", "Notes", "Submission checklist"] as const;

function Toolkit() {
  const [t, setT] = useState<(typeof tools)[number]>(tools[0]);
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="eyebrow no-print">Toolkit</p>
      <h1 className="mt-2 text-4xl font-semibold no-print">Tools that coach, not write</h1>
      <div className="no-print mt-6 flex flex-wrap gap-2" role="tablist">
        {tools.map((x) => (
          <button key={x} role="tab" aria-selected={t === x} onClick={() => setT(x)} className={`btn ${t === x ? "btn-ink" : "btn-ghost"} !py-1.5`}>{x}</button>
        ))}
      </div>
      <div className="card-paper mt-6 p-6">
        {t === "Question builder" && <QuestionBuilder />}
        {t === "Source checker" && <SourceChecker />}
        {t === "Outline builder" && <Outline />}
        {t === "Citation helper" && <Citation />}
        {t === "Notes" && <Notes />}
        {t === "Submission checklist" && <Submission />}
      </div>
    </div>
  );
}

function Actions({ name, text }: { name: string; text: string }) {
  return (
    <div className="no-print mt-5 flex gap-2">
      <button className="btn btn-ghost" onClick={() => downloadText(name, text)}><Download size={14} /> Download</button>
      <button className="btn btn-ghost" onClick={() => window.print()}><Printer size={14} /> Print</button>
    </div>
  );
}

function QuestionBuilder() {
  const [v, setV] = useLocal("tool:question", { topic: "", who: "", what: "", change: "", where: "" });
  const f = (k: keyof typeof v, label: string, ph: string) => (
    <label className="block text-sm"><span className="font-medium">{label}</span>
      <input className="field mt-1" placeholder={ph} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} />
    </label>
  );
  const q = v.what && v.who ? `Does ${v.change || "…"} affect ${v.what} among ${v.who}${v.where ? ` in ${v.where}` : ""}?` : "";
  return (
    <div>
      <h2 className="text-2xl font-semibold">Question builder</h2>
      <p className="mt-1 text-sm text-muted-foreground">Narrow a broad topic into a focused, testable question.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {f("topic", "Broad topic", "e.g. sleep and studying")}
        {f("who", "Who exactly?", "e.g. Class 10 students")}
        {f("what", "What will you measure?", "e.g. test scores")}
        {f("change", "What changes or is compared?", "e.g. hours of sleep")}
        {f("where", "Where / when? (optional)", "e.g. my school, this term")}
      </div>
      {q && (
        <div className="mt-5 rounded-xl bg-saffron-soft p-4">
          <p className="text-xs uppercase tracking-wider">Draft question</p>
          <p className="mt-1 font-display text-lg">{q}</p>
          <p className="mt-2 text-xs">Check: Can you actually collect this data? Is it specific? Is the answer not already obvious?</p>
        </div>
      )}
      <Actions name="research-question.txt" text={`Topic: ${v.topic}\nQuestion: ${q}`} />
    </div>
  );
}

const sourceChecks = [
  "I know who wrote it and their expertise",
  "It says where its evidence comes from",
  "It's recent enough for my topic",
  "It was peer-reviewed or from a reputable publisher",
  "Its purpose is to inform, not sell or persuade",
  "Other reliable sources agree",
];
function SourceChecker() {
  const [v, setV] = useLocal<{ title: string; c: boolean[] }>("tool:source", { title: "", c: sourceChecks.map(() => false) });
  const n = v.c.filter(Boolean).length;
  const verdict = n >= 5 ? "Strong — likely safe to rely on." : n >= 3 ? "Use with care — back it up with another source." : "Weak — look for something better.";
  return (
    <div>
      <h2 className="text-2xl font-semibold">Source checker</h2>
      <input className="field mt-4" placeholder="Source title or link" value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} />
      <div className="mt-4 space-y-2">
        {sourceChecks.map((c, i) => (
          <label key={c} className="flex items-center gap-3 text-sm">
            <input type="checkbox" className="h-4 w-4 accent-[var(--saffron)]" checked={v.c[i]} onChange={() => setV({ ...v, c: v.c.map((x, k) => (k === i ? !x : x)) })} />
            {c}
          </label>
        ))}
      </div>
      <p className="mt-4 font-medium">{n}/{sourceChecks.length}: {verdict}</p>
      <Actions name="source-check.txt" text={`${v.title}\n${sourceChecks.map((c, i) => `[${v.c[i] ? "x" : " "}] ${c}`).join("\n")}\n${verdict}`} />
    </div>
  );
}

const sections = [
  { k: "intro", t: "Introduction", h: "What's the problem? Why does it matter? What's your question?" },
  { k: "methods", t: "Methods", h: "Who, what, how? Enough detail for someone to repeat it." },
  { k: "results", t: "Results", h: "What did you find? Numbers and patterns, without interpreting yet." },
  { k: "discussion", t: "Discussion", h: "What does it mean? Limitations? What next?" },
];
function Outline() {
  const [v, setV] = useLocal<Record<string, string>>("tool:outline", {});
  const text = sections.map((s) => `${s.t.toUpperCase()}\n${v[s.k] ?? ""}`).join("\n\n");
  return (
    <div>
      <h2 className="text-2xl font-semibold">Outline builder (IMRaD)</h2>
      <div className="mt-4 space-y-4">
        {sections.map((s) => (
          <label key={s.k} className="block">
            <span className="font-display text-lg font-semibold">{s.t}</span>
            <span className="block text-xs text-muted-foreground">{s.h}</span>
            <textarea className="field mt-1 min-h-24" placeholder="Bullet points in your own words" value={v[s.k] ?? ""} onChange={(e) => setV({ ...v, [s.k]: e.target.value })} />
          </label>
        ))}
      </div>
      <Actions name="outline.txt" text={text} />
    </div>
  );
}

function Citation() {
  const [v, setV] = useLocal("tool:cite", { last: "", first: "", year: "", title: "", publisher: "", url: "" });
  const ini = v.first ? `${v.first.trim()[0]}.` : "";
  const apa = `${v.last}${ini ? `, ${ini}` : ""} (${v.year || "n.d."}). ${v.title}. ${v.publisher}.${v.url ? ` ${v.url}` : ""}`;
  const mla = `${v.last}${v.first ? `, ${v.first}` : ""}. ${v.title}. ${v.publisher}, ${v.year}.${v.url ? ` ${v.url}.` : ""}`;
  const field = (k: keyof typeof v, label: string) => (
    <label className="block text-sm"><span className="font-medium">{label}</span>
      <input className="field mt-1" value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} />
    </label>
  );
  return (
    <div>
      <h2 className="text-2xl font-semibold">Citation helper</h2>
      <p className="mt-1 text-sm text-muted-foreground">Fill in details you found on the source. Always double-check against your teacher's style guide.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {field("last", "Author last name")}{field("first", "Author first name")}{field("year", "Year")}
        {field("title", "Title")}{field("publisher", "Publisher / website")}{field("url", "Link (optional)")}
      </div>
      {v.last && v.title && (
        <div className="mt-5 space-y-3 text-sm">
          <p><strong>APA:</strong> {apa}</p>
          <p><strong>MLA:</strong> {mla}</p>
        </div>
      )}
      <Actions name="citation.txt" text={`APA: ${apa}\nMLA: ${mla}`} />
    </div>
  );
}

function Notes() {
  const [v, setV] = useLocal("tool:notes", "");
  return (
    <div>
      <h2 className="text-2xl font-semibold">Research notes</h2>
      <p className="mt-1 text-sm text-muted-foreground">Tip: note the source next to every idea so you can cite it later.</p>
      <textarea className="field mt-4 min-h-80" value={v} onChange={(e) => setV(e.target.value)} placeholder="Your notes…" />
      <Actions name="notes.txt" text={v} />
    </div>
  );
}

const subChecks = [
  "My question is clear and stated early",
  "My method is described so someone could repeat it",
  "I report results honestly, including surprises",
  "I separate findings from interpretation",
  "I list limitations",
  "Every borrowed idea is cited",
  "I wrote it in my own words",
  "Participants gave consent and are anonymised",
  "I proofread it out loud",
];
function Submission() {
  const [v, setV] = useLocal<boolean[]>("tool:submit", subChecks.map(() => false));
  return (
    <div>
      <h2 className="text-2xl font-semibold">Submission checklist</h2>
      <div className="mt-4 space-y-2">
        {subChecks.map((c, i) => (
          <label key={c} className="flex items-center gap-3 text-sm">
            <input type="checkbox" className="h-4 w-4 accent-[var(--saffron)]" checked={!!v[i]} onChange={() => setV(subChecks.map((_, k) => (k === i ? !v[k] : !!v[k])))} />
            {c}
          </label>
        ))}
      </div>
      <p className="mt-4 font-medium">{v.filter(Boolean).length}/{subChecks.length} done</p>
      <Actions name="submission-checklist.txt" text={subChecks.map((c, i) => `[${v[i] ? "x" : " "}] ${c}`).join("\n")} />
    </div>
  );
}
