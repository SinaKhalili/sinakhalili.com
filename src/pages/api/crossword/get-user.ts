import { getCrosswordUser } from "@/db/crossword";
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
    const data = await getCrosswordUser(id);
    res.status(200).json({
      data: {
        username: data.username,
        created_at: data.created_at,
        id: data.id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
}
