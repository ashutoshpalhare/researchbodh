// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { ConfigEnv } from "vite";
import { normalizePagesBase, staticPagePaths } from "./scripts/pages-config";

export default (env: ConfigEnv) => {
  const { mode } = env;
  const pagesBuild = mode === "github-pages";
  const base = pagesBuild ? normalizePagesBase(process.env["PAGES_BASE_PATH"] ?? "/") : "/";

  return defineConfig({
    vite: { base },
    // Node is used only to render static HTML in GitHub Actions; no server is deployed.
    ...(pagesBuild ? { nitro: { preset: "node-server" } } : {}),
    tanstackStart: {
      server: { entry: "server" },
      ...(pagesBuild ? {
        router: { basepath: base },
        pages: staticPagePaths.map((path) => ({
          path: path === "/" ? base : `${base}${path.slice(1)}`,
        })),
        prerender: {
          enabled: true,
          autoStaticPathsDiscovery: false,
          crawlLinks: false,
          failOnError: true,
          autoSubfolderIndex: true,
        },
      } : {}),
    },
  })(env);
};
