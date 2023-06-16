import { getCrosswordUser, getMiniCrosswordDataNYT } from "@/lib/crossword";
import {
  addOrRefreshCrosswordUser,
  addUserToLeaderboard,
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

  let { cookie, leaderboard_id, password } = req.body;
  try {
    cookie = cookie.replace("'", "");
    if (cookie.length < 5) {
      res.status(400).json({ error: "Invalid cookie" });
      return;
    }
    const user = await getCrosswordUser(cookie);
    await addOrRefreshCrosswordUser(cookie, user.name, user.userID);
    await getMiniCrosswordDataNYT(cookie);
    await addUserToLeaderboard(user.userID, leaderboard_id, password);
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
    return;
  }
}
