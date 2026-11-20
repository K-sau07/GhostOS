export const LEETCODE_USER = "CodeBreaker0708";
export const GITHUB_USER = "K-sau07";
export const leetcodeUrl = `https://leetcode.com/u/${LEETCODE_USER}/`;

export interface LeetCode {
  user: string;
  solved: number;
  easy: number;
  medium: number;
  hard: number;
}

export interface Contributions {
  total: number;
  /** oldest first, one entry per day; level is GitHub's own 0 to 4 */
  days: { date: string; level: number; count: number }[];
}

export interface Live {
  leetcode: LeetCode | null;
  contributions: Contributions | null;
}

/** what the server hands the page: live numbers plus today's quote */
export interface LiveData extends Live {
  quote: number;
}
