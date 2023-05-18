import { getCrosswordUser, getSolves, getSolvesFull } from "@/db/crossword";
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
    const data = await getSolvesFull(id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
}
