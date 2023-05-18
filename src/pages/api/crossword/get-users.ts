import { getCrosswordUser, getCrosswordUsers } from "@/db/crossword";
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
    const data = await getCrosswordUsers();
    res.status(200).json({ users: data });
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
}
