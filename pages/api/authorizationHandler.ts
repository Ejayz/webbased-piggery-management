import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "./jwtProcessor";

/** This method will authorize api POST api endpoints it will accept parameter req,res,ApiMethod .ApiMethod is what the api method is intended to be */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  ApiMethod: String
) {
  if (req?.url == "'/api/authorizationHandler'") {
    return res
      .status(401)
      .json({ code: 401, message: "Invalid access to this api endpoint" });
  }
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
  if (req.query == null || req.query == undefined) {
    //This is for body
    res
      .status(400)
      .json({ code: 400, message: "400 Bad Request . Invalid Data passed." });
    return false;
  } else if (req.body == null || req.body == undefined) {
    res
      .status(400)
      .json({ code: 400, message: "400 Bad Request . Invalid Data passed." });
    return false;
  }

  return { cookie: cookie };
}
