import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "./jwtProcessor";

export default async function handler(
  ApiMethod: String,
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.method != ApiMethod) {
    res?.status(405).json({
      code: 405,
      message: `405 Invalid Method.Api endpoint expects ${ApiMethod}.`,
    });
    return false;
  }
  const cookie = getCookie("auth", { req, res });
  if (cookie == null) {
    res.status(401).json({
      code: 401,
      message: "401 Authorization Error. Please login first.",
    });
    return false;
  }
  const verify = await verifyJWT(cookie);
  if (!verify) {
    res.status(401).json({
      code: 401,
      message: "401 Invalid Session. Please relogin.",
    });
    return false;
  }
  if (req.body == null || req.body == undefined) {
    res
      .status(400)
      .json({ code: 400, message: "400 Bad Request . Invalid Data passed." });
    return false;
  }
  return { cookie: cookie };
}
