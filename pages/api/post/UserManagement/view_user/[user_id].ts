import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT, verifyJWT } from "pages/api/jwtProcessor";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = getCookie("auth", { req, res });
  if (req.method == "GET") {
    return res
      .status(405)
      .json({ code: 405, message: "405 Method not allowed" });
  }
  const uid: any = req.query.user_id;
  if (uid == undefined) {
    return res
      .status(404)
      .json({ code: 404, message: "This route requires [user_id] ." });
  }

  if (cookie == undefined) {
    return res.status(401).json({
      code: 401,
      message: "401 Authroization Error . Please login first",
    });
  }
  const verify = await verifyJWT(cookie);
  if (!verify) {
    return res
      .status(498)
      .json({ code: 498, message: "498 Invalid token error" });
  }
  try {
    const userData: any = await viewUser(uid);

    const json: any = await decodeJWT(cookie);
    if (json.user_id == uid) {
      return res.status(409).json({
        code: 403,
        message: "403 Forbidden. Selecting logged in ID",
      });
    }
    if (userData.length == 0) {
      return res.status(400).json({
        code: 404,
        message: `404 Not Found . User with ID(${uid}) thus not exist or was removed from database`,
      });
    }

    return res.status(200).json({ code: 200, data: userData });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "500 Server error .Please try again later.",
    });
  }
}

async function viewUser(user_id: string) {
  return new Promise((resolve, reject) => {
    const sql =
      "select user_id,username,first_name,middle_name,last_name,phone,job from tbl_users where user_id=? and is_exist='true'";
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      conn.query(sql, [user_id], (err, result, feilds) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
