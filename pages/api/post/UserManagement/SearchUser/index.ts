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
  const { keyword, sortby, sortorder, page }: any = req.body;
  const limit: number = 5;
  const offset: number = limit * (parseInt(page) - 1);

  const data: any = await SearchUser({
    keyword,
    user_id,
    sortby,
    sortorder,
    limit,
    offset,
  });
  if (data.length >= 1) {
    return res.status(200).json({ code: 200, data: data });
  } else {
    return res.status(404).json({
      code: 404,
      message: `No data found related to keyword `,
    });
  }
}

async function SearchUser({
  keyword,
  user_id,
  sortby,
  sortorder,
  limit,
  offset,
}: any) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      keyword = `%${keyword}%`;
      const sql = `SELECT user_id, username, first_name, middle_name, last_name, phone,CONCAT(first_name,' ',middle_name,' ',last_name) AS name, job FROM tbl_users WHERE ( username LIKE ? OR CONCAT(first_name,' ',middle_name,' ',last_name) LIKE ? OR phone LIKE ? OR job LIKE ? ) AND is_exist = 'true'   AND user_id != ? ORDER BY ${conn.escapeId(
        sortby
      )} ${sortorder} LIMIT ${limit} OFFSET ${offset};`;

      conn.query(
        sql,
        [keyword, keyword, keyword, keyword, user_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  });
}
