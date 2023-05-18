import {
  getCrosswordUser,
  getMiniCrosswordData,
  getSolveInfo,
} from "@/lib/crossword";
import {
  addOrRefreshCrosswordUser,
  enhanceSolveInformation,
  getAllCrosswordUsers,
  getSolves,
  updatePuzzlesTable,
  updateSolvesTable,
} from "@/db/crossword";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const users = await getAllCrosswordUsers();
    const first = users[0];
    const data = await getMiniCrosswordData(first.cookie);
    await updatePuzzlesTable(data);

    try {
      await Promise.all(
        users.map(async (user) => {
          const data = await getMiniCrosswordData(user.cookie);
          await updateSolvesTable(user.id, data);
          const solvesForUser = await getSolves(user.id);
          const solveInformation = await getSolveInfo(
            user.cookie,
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
    res.status(500).json({ error: error });
    return;
  }
}
