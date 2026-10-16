import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [{ to: "/", label: "Home" }] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="ResearchBodh home">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-display text-lg text-ivory">ब</span>
      <span className="font-display text-xl font-semibold">
        Research<span className="text-saffron">Bodh</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Logo />
        <nav className="hidden gap-1 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-muted !text-foreground font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="btn btn-ghost !p-2 md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col border-t px-5 py-3 md:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-sm">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-sm text-muted-foreground md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs">From Curiosity to Confident Research. A free academy for thinking, not a paper generator.</p>
        </div>
        <p>Progress and drafts are saved only in this browser. Nothing is uploaded.</p>
        <p>
          Built by{" "}
          <a className="underline decoration-saffron underline-offset-4" href="https://github.com/ashutoshpalhare" target="_blank" rel="noreferrer">
            Ashutosh Palhare
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
