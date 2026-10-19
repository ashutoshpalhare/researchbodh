# ResearchBodh

### From Curiosity to Confident Research

A free, interactive research academy for school and college students, created by **[Ashutosh Palhare](https://github.com/ashutoshpalhare)**.

ResearchBodh helps learners turn everyday questions into thoughtful research projects. Short lessons, relatable examples, practice exercises, and a practical toolkit guide students from their first observation to a completed project.

**The goal is to teach research thinking—not to generate papers or replace a learner’s own work.**

[Curriculum](#curriculum) · [Features](#features) · [Getting started](#getting-started) · [Deployment](#deployment) · [Contributing](#contributing)

## Features

- **Guided learning:** Nine modules with lessons, everyday examples, exercises, and assignments.
- **Quizzes with explanations:** Check understanding and learn why an answer is correct.
- **Progress tracking:** Keep lesson completion, best quiz scores, and assignment drafts in the current browser.
- **Worked example:** Follow a student research project from question to conclusion.
- **Searchable glossary:** Find plain-language explanations of research terminology.
- **Research toolkit:** Develop questions, evaluate sources, structure a report, prepare citations, and keep notes.
- **Export and print:** Download text drafts and print toolkit pages.
- **No account required:** Start learning without signing up or configuring an API key.

## Curriculum

| Stage | Focus |
| --- | --- |
| Foundations | Curiosity, critical thinking, and scientific reasoning |
| Investigate | Research questions, sources, and methods |
| Analyse | Making sense of evidence and results |
| Communicate | Research writing and sharing findings |
| Capstone | Bringing the skills together in a research project |

The nine modules contain **18 lessons**, with a quiz and an assignment for each module.

## Research toolkit

| Tool | Purpose |
| --- | --- |
| Question builder | Shape a topic into a focused research question |
| Source checker | Evaluate the credibility and relevance of a source |
| Outline builder | Organize a report using the IMRaD structure |
| Citation helper | Prepare basic APA and MLA citations |
| Notes | Keep working notes for a project |
| Submission checklist | Review a project before submitting it |

Citation output is a starting point; check it against your institution’s required style guide.

## Technology

| Area | Technology |
| --- | --- |
| Application | React 19, TypeScript, TanStack Start |
| Routing | TanStack Router with file-based routes |
| Styling | Tailwind CSS 4 and shared design tokens |
| UI primitives | Radix UI and shadcn-style components |
| Icons | Lucide React |
| Development and builds | Vite and Bun |
| Testing | Vitest and React Testing Library |
| Optional static hosting | GitHub Pages with GitHub Actions |

## Getting started

### Prerequisites

- **Node.js 22**
- **[Bun](https://bun.sh/)**

### Install and run

Clone this repository using its GitHub URL, then open the cloned directory:

```sh
git clone <repository-url>
cd <repository-directory>
bun install --frozen-lockfile
bun run dev
```

Open the local address printed by the development server.

No environment file, database, or API key is required for the current learning experience.

### Available commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run test` | Run the test suite once |
| `bun run test:watch` | Run tests in watch mode |
| `bun run lint` | Run ESLint |
| `bun run format` | Format the project with Prettier |
| `bun run build` | Build the standard server-targeted application |
| `bun run preview` | Start Vite’s production preview |
| `bun run build:pages` | Build the opt-in GitHub Pages version |

## Deployment

### Standard hosting

```sh
bun run build
```

The normal build retains the project’s existing server target. Use a compatible hosting environment or publish through Lovable; do not treat the standard build as a GitHub Pages artifact.

### GitHub Pages

Static publishing is **opt-in and manual**. Pushing a commit does not trigger a deployment.

1. Push or sync the project to your GitHub repository.
2. Open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Open **Actions → Publish ResearchBodh to GitHub Pages**.
4. Select **Run workflow**, choose the branch, and confirm.
5. After a successful deployment, find the live URL in the `github-pages` environment or **Settings → Pages**.

The workflow installs dependencies, runs tests, prerenders the listed content pages, checks the static output, and deploys **only `dist/client`**. Each listed module URL gets its own HTML page so direct links do not depend on a running server or a 404 redirect.

GitHub’s Pages configuration supplies the URL prefix for repository sites, user sites, and configured custom domains.

> Deployment is configured, but the workflow has not yet been verified in the connected GitHub repository. A successful workflow run is required to confirm the published output.

### Build a static version locally

For a repository site such as `https://USERNAME.github.io/REPOSITORY/`:

```sh
PAGES_BASE_PATH=/REPOSITORY/ bun run build:pages
```

For a user site or a custom domain served from `/`:

```sh
PAGES_BASE_PATH=/ bun run build:pages
```

These examples use POSIX shell syntax. Static files are generated in `dist/client`; serve them with a static web server rather than opening the HTML files directly.

**Adding pages:** Update `scripts/pages-config.ts` whenever a content route is added. Include concrete module paths, not only a dynamic route pattern. Keep the `github-pages` mode separate from normal builds.

## Privacy and saved work

Learner progress and drafts are stored in the browser’s **localStorage**, using keys prefixed with `researchbodh:`. The app’s learner-storage layer does not upload this content.

- Saved work belongs to the current browser and website origin.
- Progress does not sync between browsers or devices.
- Moving from a preview address to a published address does not transfer saved work.
- Clearing site data removes locally saved progress and drafts.
- Private browsing or restricted browser storage may prevent durable saving.
- Download important drafts to keep a separate copy.

The site loads typography from Google Fonts. Browser-local learner storage should not be interpreted as a claim that every site resource is served locally.

## Project structure

```text
.github/workflows/github-pages.yml  Manual GitHub Pages deployment
scripts/pages-config.ts            Static content URL list and base-path helper
src/
  assets/                          Images used by the site
  components/                      Shared UI and site navigation
  lib/
    curriculum.ts                  Modules, lessons, quizzes, and assignments
    glossary.ts                    Research terms and definitions
    storage.ts                     Browser-local state and text downloads
  routes/                          File-based pages and root layout
  test/                            Automated tests
  router.tsx                       Router setup
  styles.css                       Design tokens, shared styles, and print rules
vite.config.ts                     Standard and GitHub Pages build configuration
AGENTS.md                          Repository development guidance
```

## Contributing

Improvements to explanations, examples, accessibility, and research tools are welcome.

1. Open an issue describing the problem or proposed change.
2. Make a focused change on a branch or fork.
3. Run `bun run test` and `bun run lint`.
4. Submit a pull request explaining the change and how it was checked.

Keep research explanations approachable and evidence-aware. Preserve browser-only learner storage, and add any new content URLs to the static page list. Read `AGENTS.md` before changing deployment behavior.

For content corrections, include the relevant module or term and a reliable reference when possible. Do not include private learner drafts or personal information in public issues.

## Author

**Ashutosh Palhare** · [GitHub](https://github.com/ashutoshpalhare)

Built with [Lovable](https://lovable.dev).

## License

No license file is currently included in this repository. Public availability does not by itself grant permission to reuse or redistribute the code or learning content. Contact the author for permission until a license is added.
