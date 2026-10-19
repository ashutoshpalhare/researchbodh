<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep GitHub Pages deployment opt-in via the `github-pages` build mode and manual workflow; normal Lovable builds must retain their existing server target.
- Enumerate static content URLs in `scripts/pages-config.ts`, including concrete module paths, so direct links render without a server.
- Keep learner drafts and progress in the existing browser-only storage layer; static hosting must not introduce server-dependent persistence.
