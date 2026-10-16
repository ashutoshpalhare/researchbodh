import { useEffect, useState, useCallback } from "react";

const PREFIX = "researchbodh:";

/** localStorage-backed state, hydration-safe (reads after mount). */
export function useLocal<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw) setValue(JSON.parse(raw));
    } catch {}
    setReady(true);
    const onSync = (e: Event) => {
      const d = (e as CustomEvent).detail;
      if (d?.key === key) setValue(d.value);
    };
    window.addEventListener("rb-sync", onSync);
    return () => window.removeEventListener("rb-sync", onSync);
  }, [key]);
  const set = useCallback(
    (next: T | ((p: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(PREFIX + key, JSON.stringify(v));
        } catch {}
        queueMicrotask(() =>
          window.dispatchEvent(new CustomEvent("rb-sync", { detail: { key, value: v } })),
        );
        return v;
      });
    },
    [key],
  );
  return [value, set, ready] as const;
}

export type Progress = {
  lessons: Record<string, boolean>;
  quizzes: Record<string, number>; // moduleId -> best score %
  assignments: Record<string, string>; // moduleId -> learner's answer
};
export const emptyProgress: Progress = { lessons: {}, quizzes: {}, assignments: {} };
export const useProgress = () => useLocal<Progress>("progress", emptyProgress);

export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
