import SaurabhOS from "@/components/os/SaurabhOS";
import { getLive } from "@/lib/live";
import { quoteIndexFor } from "@/lib/quotes";

// LeetCode, GitHub contributions and the quote of the day refresh hourly.
export const revalidate = 3600;

export default async function Home() {
  const live = await getLive();
  return <SaurabhOS live={{ ...live, quote: quoteIndexFor(new Date()) }} />;
}
