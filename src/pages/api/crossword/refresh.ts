import { getCrosswordUser, getMiniCrosswordDataNYT } from "@/lib/crossword";
import {
  addOrRefreshCrosswordUser,
  enhanceSolveInformation,
  getAllCrosswordUsers,
  getSolves,
  getUsersInLeaderboard,
  updatePuzzlesTable,
  updateSolvesTable,
} from "@/db/crossword";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSolveInfoNYT } from "@/lib/crossword/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { leaderboard_id } = req.body;

  try {
    const users = await getUsersInLeaderboard(leaderboard_id);
    const first = users[0];
    if (!first.user) return;
    const data = await getMiniCrosswordDataNYT(first.user.cookie);
    await updatePuzzlesTable(data);

    try {
      await Promise.all(
        users.map(async (user) => {
          if (!user.user) return;
          const data = await getMiniCrosswordDataNYT(user.user.cookie);
          await updateSolvesTable(user?.user?.id, data);
          const solvesForUser = await getSolves(user.user.id);
          const solveInformation = await getSolveInfoNYT(
            user.user.cookie,
            solvesForUser
          );
          await enhanceSolveInformation(solveInformation);
        })
      );
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
    return;
  }
}
