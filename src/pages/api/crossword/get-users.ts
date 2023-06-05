import {
  getCrosswordUser,
  getCrosswordUsers,
  getCrosswordUsersForLeaderboard,
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

  const { leaderboard_id } = req.body;
  try {
    const data = await getCrosswordUsersForLeaderboard(leaderboard_id);
    res.status(200).json({ users: data });
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
}
