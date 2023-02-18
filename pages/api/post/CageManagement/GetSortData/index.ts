import { getCookie, getCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT, verifyJWT } from "pages/api/jwtProcessor";
import connection from "pages/api/mysql";
import { resolve } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(504).json({
      code: 504,
      message: "504 Invalid Method. Endpoint Expects POST",
    });
  }
  if (req.body == "") {
    return res.status(400).json({
      code: 400,
      message: "400 Bad Request. Payload /JSON is invalid",
    });
  }
  const cookie = getCookie("auth", { req, res });
  if (cookie == null) {
    return res.status(401).json({
      code: 401,
      message: "401 Authorization Error. Please Login first",
    });
  }

  const verified = verifyJWT(cookie);
  if (!verified) {
    return res.status(401).json({
      code: 401,
      message: "401 Authorization Error. Invalid Session. Please relogin",
    });
  }
  const { sortby, sortorder }: any = req.body;
  var sorter = "ASC";
  if (sortorder == "ASC") {
    sorter = "ASC";
  } else if (sortorder == "DESC") {
    sorter = "DESC";
  } else {
    return res.status(400).json({
      code: 400,
      message: "400 Bad Request. Payload /JSON is invalid",
    });
  }
  const decode: any = await decodeJWT(cookie);
  const user_id = decode.user_id;
  const data = await getSortedData({ sortby, sorter, user_id });
  return res.status(200).json({ code: 200, data: data });
}

async function getSortedData({ sortby, sorter, user_id }: any) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql = `SELECT cage_id,cage_name,cage_capacity FROM tbl_cage WHERE is_exist='true' and is_full='false'  ORDER BY ${conn.escapeId(
        sortby
      )} ${sorter}`;
      conn.query(sql, [user_id], (error, result, feilds) => {
        if (error) reject(error);
        resolve(result);
        conn.release();
      });
    });
  });
}
