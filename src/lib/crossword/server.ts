import {
  getCachedSolvePuzzleIDs,
  getCrosswordUserFromCookie,
  getSolves,
} from "@/db/crossword";
import { NYT_API_ROOT } from ".";

export const getSolveInfoNYT = async (cookie: string, puzzle_ids: number[]) => {
  if (!cookie) {
    throw new Error("No cookie provided");
  }
  const user = await getCrosswordUserFromCookie(cookie);
  const solveInfoForUser = await getCachedSolvePuzzleIDs(user.id);
  const solutionPromises = puzzle_ids.flatMap(async (puzzle_id) => {
    if (solveInfoForUser.find((solveInfo) => solveInfo === puzzle_id)) {
      // If it's cached, don't make a call to NYT
      return;
    }
    const SOLUTION_ENDPOINT = `${NYT_API_ROOT}/v6/game/${puzzle_id}.json`;
    const resp = await fetch(SOLUTION_ENDPOINT, {
      method: "GET",
      headers: {
        Cookie: `NYT-S=${cookie}`,
      },
      credentials: "include",
    });
    return resp.json();
  });

  const ans = await Promise.all(solutionPromises);
  const filtered = ans.filter((x) => x);

  return filtered;
};
