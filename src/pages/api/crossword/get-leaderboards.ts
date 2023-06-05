import { getLeaderboards } from "@/db/crossword";
import { LeaderboardItem } from "@/lib/crossword/types";
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
    const data = await getLeaderboards();

    res.status(200).json({ leaderboards: data });
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
}
