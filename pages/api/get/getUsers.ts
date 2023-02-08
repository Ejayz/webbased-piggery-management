import { NextApiRequest, NextApiResponse } from "next";
import connection from "../mysql";
import { decodeJWT, verifyJWT } from "../jwtProcessor";
import searchCookie from "../cookieParser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    res.status(405).json({ code: 405, message: "Post Method not allowed" });
    return 0;
  }
  const cookies: any = req.headers.cookie;
  const cookie = await searchCookie(cookies, "auth");
  const isAllowed = await verifyJWT(cookie);
  const decode: any = await decodeJWT(cookie);
  if (isAllowed) {
    const data: any = await getUsers(decode.user_id);
    if (data.length == 0) {
      return res
        .status(200)
        .json({ code: 404, message: "No data fetched from database." });
    }
    return res.status(200).json({ code: 200, data: data });
  } else {
    return res.status(401).json({
      code: "401",
      message: "Invalid authentication. Make sure you are logged in.",
    });
  }
}

async function getUsers(USER_ID: any) {
  return new Promise((resolve, rejects) => {
    const sql =
      "select user_id,username,first_name,middle_name,last_name,phone,job from tbl_users where is_exist='true' and user_id !=? ORDER BY username ASC";
    connection.getConnection((err, conn) => {
      if (err) rejects(err);
      conn.query(sql, [USER_ID], (err, result, feilds) => {
        if (err) rejects(err);
        resolve(result);
      });
      conn.release();
    });
  });
}
