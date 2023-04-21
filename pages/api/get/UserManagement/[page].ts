import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { decodeJWT } from "pages/api/jwtProcessor";
import connection from "pages/api/mysql";
import { resolve } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
  const { page, filter }: any = req.query;
  const { sortby, sortorder, keyword }: any = JSON.parse(filter);
  console.log(page, filter)
  if (page == "0") {
    return res
      .status(404)
      .json({ code: 404, message: "Page 0 data cannot be found" });
  }
  const decoded: any = await decodeJWT(authorized.cookie);
  const user_id: any = decoded.user_id;
  const limit: number = 5;
  const offset: number = limit * (parseInt(page) - 1);

  try {
    let data: any;
    if (keyword == "undefined") {
      data = await GetUsers(limit, offset, user_id, sortby, sortorder);
    } else {
      data = await GetUsersWithSearch(
        limit,
        offset,
        user_id,
        sortby,
        sortorder,
        keyword
      );
    }
    if (data.length == 0) {
      return res.status(404).json({ code: 404, message: "No data found" });
    }
    return res.status(200).json({ code: 200, data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function GetUsers(
  limit: number,
  offset: number,
  user_id: number,
  sortby: string,
  sortorder: string
) {
  const conn = await connection.getConnection();
  try {
    const sql = `SELECT user_id, username, first_name, middle_name, last_name, phone,CONCAT(first_name,' ',middle_name,' ',last_name) as name, job FROM tbl_users WHERE  is_exist = 'true'  AND user_id != ? ORDER BY ${conn.escapeId(
      sortby
    )} ${sortorder} LIMIT ${limit} OFFSET ${offset};`;
    const [err, result] = await conn.query(sql, [user_id]);
    conn.release();
    if (err) return err;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}

async function GetUsersWithSearch(
  limit: number,
  offset: number,
  user_id: number,
  sortby: string,
  sortorder: string,
  keyword: string
) {
  const conn = await connection.getConnection();
  try {
    keyword = `%${keyword}%`;
    const sql = `SELECT user_id, username, first_name, middle_name, last_name, phone,CONCAT(first_name,' ',middle_name,' ',last_name) AS name, job FROM tbl_users WHERE ( username LIKE ? OR CONCAT(first_name,' ',middle_name,' ',last_name) LIKE ? OR phone LIKE ? OR job LIKE ? ) AND is_exist = 'true'   AND user_id != ? ORDER BY ${conn.escapeId(
      sortby
    )} ${sortorder} LIMIT ${limit} OFFSET ${offset};`;

    const [ result] = await conn.query(sql, [
      keyword,
      keyword,
      keyword,
      keyword,
      user_id,
    ]);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
