import { getCrosswordUser, getMiniCrosswordDataNYT } from "@/lib/crossword";
import {
  addOrRefreshCrosswordUser,
  addUserToLeaderboard,
  createLeaderboard,
} from "@/db/crossword";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let { cookie, name: leaderboard_name, password } = req.body;

  try {
    const user = await getCrosswordUser(cookie);
    const board = await createLeaderboard(leaderboard_name, password);
    await addOrRefreshCrosswordUser(cookie, user.name, user.userID);
    await getMiniCrosswordDataNYT(cookie);
    await addUserToLeaderboard(user.userID, board.id, password);

    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
    return;
  }
}
