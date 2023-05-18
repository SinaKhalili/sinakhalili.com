import { getCrosswordUser, getMiniCrosswordData } from "@/lib/crossword";
import { addOrRefreshCrosswordUser } from "@/db/crossword";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { cookie } = req.body;
  try {
    const user = await getCrosswordUser(cookie);
    await addOrRefreshCrosswordUser(cookie, user.name, user.userID);
    await getMiniCrosswordData(cookie);
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
    return;
  }
}
