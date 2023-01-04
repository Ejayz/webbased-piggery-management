import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", "my-cookie=value");

  res.status(200).json({ company: "RVM Hog Farm" });
}
