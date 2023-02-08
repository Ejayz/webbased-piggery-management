import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { decodeJWT } from "pages/api/jwtProcessor";
import connection from "../../../mysql";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized: any = await authorizationHandler(req, res, "POST");

  if (!authorized) {
    return false;
  }

  const decode: any = await decodeJWT(authorized.cookie);
  const user_id = decode.user_id;
  const { keyword, sortby, sortorder }: any = req.body;
  var SortOrder = "ASC";
  if (sortorder == "DESC") {
    SortOrder = "DESC";
  } else if (sortorder == "ASC") {
    SortOrder = "ASC";
  } else {
    return res
      .status(400)
      .json({ code: 400, message: "400 Bad Request . Invalid Data passed." });
  }
  const data: any = await SearchUser({ keyword, user_id, sortby, SortOrder });
  if (data.length >= 1) {
    return res.status(200).json({ code: 200, data: data });
  } else {
    return res.status(404).json({
      code: 404,
      message: `No data found related to keyword `,
    });
  }
}

async function SearchUser({ keyword, user_id, sortby, SortOrder }: any) {
  return new Promise((resolve, reject) => {
    keyword = `%${keyword}%`;
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql = `SELECT user_id, username, first_name, middle_name, last_name, phone${
        sortby == "name"
          ? ",concat(first_name,' ',middle_name,' ',last_name) as name"
          : ""
      }, job FROM tbl_users WHERE ( username LIKE ? OR first_name LIKE ? OR middle_name LIKE ? OR last_name LIKE ? OR phone LIKE ? OR job LIKE ? ) AND is_exist = 'true'   AND user_id != ? ORDER BY ${conn.escapeId(
        sortby
      )} ${SortOrder};`;
      conn.query(
        sql,
        [keyword, keyword, keyword, keyword, keyword, keyword, user_id],
        (error, result, feilds) => {
          if (error) reject(error);
          resolve(result);
          conn.release();
        }
      );
    });
  });
}
