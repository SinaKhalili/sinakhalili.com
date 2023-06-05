import { getLeaderboard, getLeaderboards } from "@/db/crossword";
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

  const { id } = req.body;

  try {
    const data = await getLeaderboard(id);
    const toReturn = {
      name: data.name,
      created_at: data.created_at,
      id: data.id,
      is_password_protected: data.password ? true : false,
    } as LeaderboardItem;

    res.status(200).json({ leaderboard: toReturn });
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
}
