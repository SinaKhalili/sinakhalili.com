import { NextApiRequest, NextApiResponse } from "next";
import { getPosts } from "@/scripts/getPosts";

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const posts = getPosts(100);

  res.status(200).json(posts);
};

export default handler;
