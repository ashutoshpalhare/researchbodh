# ResearchBodh

**From Curiosity to Confident Research.** A free research academy built by Ashutosh Palhare for school and college students. It teaches research thinking, not automated paper writing.

## Learning and tools

- Nine modules with lessons, examples, exercises, quizzes with explanations, and assignments.
- A worked student-project example and searchable research glossary.
- A question builder, source checker, outline builder, citation helper, notes, and submission checklist.
- Downloadable drafts and printable toolkit pages.
- Lesson completion, best quiz scores, assignments, and toolkit drafts saved in the current browser.

## Privacy and saving

No account, database, or API key is required. Learner content is stored locally under `researchbodh:` keys and is not uploaded. Clearing site data removes it; use the download buttons to keep important work. Progress does not sync across browsers or devices. Different website addresses have separate saved data. Google Fonts is used for typography.

## Local development

Use Node.js 22 and Bun.

```sh
bun install --frozen-lockfile
bun run dev
bun run test
```

`bun run build` produces the standard server-hosted application. `bun run preview` previews a production build. The app uses TanStack Start, React, TypeScript, and Tailwind CSS; it retains file-based routing.

## Publish on GitHub Pages

The repository includes a **manual** GitHub Actions workflow. Nothing is published merely by adding this setup.

1. Connect this Lovable project to a GitHub repository and make sure these changes are synced to the branch you want to publish.
2. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source.
3. Open **Actions → Publish ResearchBodh to GitHub Pages → Run workflow**, select the branch, and run it.
4. Once successful, the `github-pages` environment and repository Pages settings show the live address.

The workflow tests the app, renders every public page (including all nine module addresses) to HTML, and uploads only `dist/client`. No running server or private credentials are included. GitHub supplies the correct address prefix for repository sites, user sites, and configured custom domains. Direct lesson links therefore have their own HTML files instead of relying on a 404 redirect.

For a local static build, set the prefix to match the site:

```sh
# Repository site: https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
PAGES_BASE_PATH=/YOUR-REPOSITORY/ bun run build:pages

# User site or custom domain rooted at /
PAGES_BASE_PATH=/ bun run build:pages
```

The GitHub Pages build is separate from the normal Lovable build. The workflow has not been run from this workspace; its first GitHub run will verify the deployment output. New content routes must be added to the static page list in `scripts/pages-config.ts`. Features that require a server, authentication, or remote data would need a different hosting plan.

## Project organization

- `src/routes/`: home, modules, lesson reader, example, toolkit, glossary, and About.
- `src/lib/curriculum.ts`: lesson, quiz, and assignment content.
- `src/lib/glossary.ts`: research definitions.
- `src/lib/storage.ts`: browser saving and text downloads.
- `src/styles.css`: shared visual tokens and print styles.
- `.github/workflows/github-pages.yml`: optional static deployment.

Built and maintained with [Lovable](https://lovable.dev).
