import {
  getLeaderboard,
  getLeaderboards,
  getMonthlyLeaderboardForRoom,
} from "@/db/crossword";
import { LeaderboardItem } from "@/lib/crossword/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { id, day } = req.body;

  try {
    const data = await getMonthlyLeaderboardForRoom(id, day);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
}
