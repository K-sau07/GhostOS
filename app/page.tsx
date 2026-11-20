import GhostOS from "@/components/os/GhostOS";
import { getLive } from "@/lib/live";
import { quoteIndexFor } from "@/lib/quotes";

// LeetCode, GitHub contributions and the quote of the day refresh hourly.
export const revalidate = 3600;

export default async function Home() {
  const live = await getLive();
  return <GhostOS live={{ ...live, quote: quoteIndexFor(new Date()) }} />;
}
