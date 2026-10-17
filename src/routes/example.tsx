import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/example")({
  head: () => ({
    meta: [
      { title: "Worked example: a student project start to finish — ResearchBodh" },
      { name: "description", content: "Follow one student's research project through every stage, from question to final report." },
      { property: "og:title", content: "Worked example — ResearchBodh" },
      { property: "og:description", content: "One real-feeling project, every research step shown." },
    ],
  }),
  component: Example,
});

const steps = [
  { stage: "Notice", text: "Aarav, a Class 11 student, notices that friends who study with their phones nearby seem to forget more of what they read." },
  { stage: "Question", text: "Vague: “Are phones bad?” Sharpened: “Does keeping a phone on the desk while reading reduce how much Class 11 students remember 24 hours later?”" },
  { stage: "Hypothesis", text: "Students who read with a phone face-down on the desk will recall fewer facts the next day than students whose phone is in another room. Null: there is no difference." },
  { stage: "Sources", text: "He finds a peer-reviewed study on the “brain drain” effect of smartphone presence, a news article summarising it (secondary), and a blog with no author — which he sets aside." },
  { stage: "Method", text: "Quantitative, simple experiment. 30 classmates (with consent) read the same 600-word passage. Half keep phones on the desk, half leave them outside. Next day: a 10-question recall test. Names are replaced with codes." },
  { stage: "Data", text: "Phone-on-desk group: mean 5.8/10, median 6. Phone-outside group: mean 7.1/10, median 7. One student scored 1 after being unwell — noted as an outlier and reported, not hidden." },
  { stage: "Reasoning", text: "The gap supports the hypothesis, but the sample is small, from one school, and students knew the purpose. He writes “suggests” rather than “proves”." },
  { stage: "Writing", text: "He structures the report with IMRaD, cites sources in APA style, paraphrases in his own words, and lists three limitations openly." },
  { stage: "Sharing", text: "He presents a 5-minute talk to his class and suggests a bigger follow-up across schools." },
];

function Example() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="eyebrow">Worked example</p>
      <h1 className="mt-2 text-4xl font-semibold">Phones on the desk: one project, every step</h1>
      <p className="mt-3 text-muted-foreground">See how the ideas from all nine modules fit together in a small, honest school project.</p>
      <ol className="relative mt-10 border-l-2 border-saffron/40 pl-8">
        {steps.map((s, i) => (
          <li key={s.stage} className="relative mb-8">
            <span className="absolute -left-[45px] grid h-8 w-8 place-items-center rounded-full bg-ink font-display text-sm text-ivory">{i + 1}</span>
            <h2 className="text-xl font-semibold">{s.stage}</h2>
            <p className="mt-1 leading-relaxed">{s.text}</p>
          </li>
        ))}
      </ol>
      <Link to="/toolkit" className="btn btn-saffron">Plan your own project in the toolkit</Link>
    </div>
  );
}
