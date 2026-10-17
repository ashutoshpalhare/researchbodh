import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ResearchBodh" },
      { name: "description", content: "Why ResearchBodh exists: a free academy that teaches research thinking, not shortcuts." },
      { property: "og:title", content: "About ResearchBodh" },
      { property: "og:description", content: "A free academy for research thinking, built by Ashutosh Palhare." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="eyebrow">About</p>
      <h1 className="mt-2 text-4xl font-semibold">Bodh means understanding.</h1>
      <div className="prose-rb mt-6">
        <p>ResearchBodh is a free academy for school and college students who want to research well — not just finish an assignment. It teaches the thinking behind research: noticing, questioning, checking sources, gathering evidence fairly, and writing honestly.</p>
        <p><strong>What it is not:</strong> a paper generator. The tools ask you questions and give structure, but the words and ideas are always yours.</p>
        <p><strong>Your privacy:</strong> there are no accounts. Progress, notes and drafts stay in your own browser. Clearing your browser data clears them too, so download anything important.</p>
        <p>Built by Ashutosh Palhare.</p>
      </div>
      <Link to="/learn" className="btn btn-saffron mt-4">Start learning</Link>
    </div>
  );
}
