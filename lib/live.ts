import "server-only";

/* Live numbers, fetched on the server and cached for an hour (see `revalidate`
   in app/page.tsx). Each source fails soft: if it can't be read, the widget
   shows a link instead of a number. Nothing here is typed in by hand. */

import { LEETCODE_USER, GITHUB_USER, type LeetCode, type Contributions, type Live } from "./live-types";

const HOUR = 3600;

export async function getLeetCode(): Promise<LeetCode | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({
        query: `query($u:String!){matchedUser(username:$u){submitStatsGlobal{acSubmissionNum{difficulty count}}}}`,
        variables: { u: LEETCODE_USER },
      }),
      next: { revalidate: HOUR },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const rows: { difficulty: string; count: number }[] =
      json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
    const n = (d: string) => rows.find((r) => r.difficulty === d)?.count;
    const [solved, easy, medium, hard] = ["All", "Easy", "Medium", "Hard"].map(n);
    if ([solved, easy, medium, hard].some((x) => typeof x !== "number")) return null;
    return { user: LEETCODE_USER, solved: solved!, easy: easy!, medium: medium!, hard: hard! };
  } catch {
    return null;
  }
}

/** GitHub's public contributions fragment, the same one the profile page loads. */
export async function getContributions(): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
      next: { revalidate: HOUR },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const counts = new Map<string, number>();
    for (const [, id, text] of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g)) {
      const m = text.match(/^(\d+) contributions?/);
      counts.set(id, m ? Number(m[1]) : 0);
    }
    const days: Contributions["days"] = [];
    for (const [tag] of html.matchAll(/<td[^>]*data-date="[^"]+"[^>]*>/g)) {
      const date = tag.match(/data-date="([^"]+)"/)?.[1];
      const id = tag.match(/id="([^"]+)"/)?.[1];
      const level = Number(tag.match(/data-level="(\d)"/)?.[1] ?? 0);
      if (date) days.push({ date, level, count: (id && counts.get(id)) || 0 });
    }
    days.sort((a, b) => a.date.localeCompare(b.date));

    const total = Number(html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1].replace(/,/g, ""));
    if (!days.length || !Number.isFinite(total)) return null;
    return { total, days };
  } catch {
    return null;
  }
}

export async function getLive(): Promise<Live> {
  const [leetcode, contributions] = await Promise.all([getLeetCode(), getContributions()]);
  return { leetcode, contributions };
}
