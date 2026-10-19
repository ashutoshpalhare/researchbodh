import { modules } from "../src/lib/curriculum";

export const staticPagePaths = [
  "/",
  "/learn",
  "/example",
  "/toolkit",
  "/glossary",
  "/about",
  ...modules.map((module) => `/learn/${module.id}`),
];

export function normalizePagesBase(path: string) {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}/` : "/";
}