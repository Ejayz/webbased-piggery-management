import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorize = await authorizationHandler(req, res, "POST");
  if (!authorize) {
    return false;
  }

}


async function RemoveUser(){

}