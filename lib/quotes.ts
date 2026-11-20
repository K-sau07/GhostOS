/* One quote a day, each with the person who actually said or wrote it.
   Lines with shaky attribution (the usual Einstein and Twain inventions)
   were left out on purpose. */

export interface Quote { text: string; by: string; where?: string }

export const QUOTES: Quote[] = [
  { text: "Simplicity is prerequisite for reliability.", by: "Edsger W. Dijkstra" },
  { text: "Talk is cheap. Show me the code.", by: "Linus Torvalds" },
  { text: "Make it work, make it right, make it fast.", by: "Kent Beck" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", by: "Harold Abelson", where: "SICP" },
  { text: "Premature optimization is the root of all evil.", by: "Donald Knuth" },
  { text: "Debugging is twice as hard as writing the code in the first place.", by: "Brian Kernighan" },
  { text: "Controlling complexity is the essence of computer programming.", by: "Brian Kernighan" },
  { text: "The most effective debugging tool is still careful thought, coupled with judiciously placed print statements.", by: "Brian Kernighan" },
  { text: "Simple things should be simple, complex things should be possible.", by: "Alan Kay" },
  { text: "The best way to predict the future is to invent it.", by: "Alan Kay" },
  { text: "Real artists ship.", by: "Steve Jobs" },
  { text: "Stay hungry. Stay foolish.", by: "Steve Jobs", where: "Stanford, 2005" },
  { text: "The only way to do great work is to love what you do.", by: "Steve Jobs", where: "Stanford, 2005" },
  { text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.", by: "Antoine de Saint-Exupéry" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", by: "Martin Fowler" },
  { text: "Adding manpower to a late software project makes it later.", by: "Fred Brooks" },
  { text: "The bearing of a child takes nine months, no matter how many women are assigned.", by: "Fred Brooks" },
  { text: "Beware of bugs in the above code; I have only proved it correct, not tried it.", by: "Donald Knuth" },
  { text: "One of my most productive days was throwing away 1,000 lines of code.", by: "Ken Thompson" },
  { text: "When in doubt, use brute force.", by: "Ken Thompson" },
  { text: "Optimism is an occupational hazard of programming: feedback is the treatment.", by: "Kent Beck" },
  { text: "The function of good software is to make the complex appear to be simple.", by: "Grady Booch" },
  { text: "Plans are worthless, but planning is everything.", by: "Dwight D. Eisenhower" },
  { text: "Discipline equals freedom.", by: "Jocko Willink" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", by: "Will Durant" },
  { text: "Code is like humor. When you have to explain it, it's bad.", by: "Cory House" },
  { text: "There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.", by: "C. A. R. Hoare" },
];

/** Same quote for everyone on a given UTC day. */
export function quoteIndexFor(date: Date): number {
  const day = Math.floor(date.getTime() / 86_400_000);
  return ((day % QUOTES.length) + QUOTES.length) % QUOTES.length;
}
