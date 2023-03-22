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
      console.log(data);
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
    const sql = `SELECT COUNT(DISTINCT tbl_stock_card.stock_id) AS \`item_count\`, tbl_inventory.*,tbl_stock.*
    FROM tbl_stock_card
    INNER JOIN tbl_stock ON tbl_stock_card.stock_id = tbl_stock.stock_id
    INNER JOIN tbl_inventory ON tbl_stock.item_id = tbl_inventory.item_id where and tbl_stock_card.is_exist='true' ORDER BY ${conn.escapeId(
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
    const sql = `SELECT COUNT(DISTINCT tbl_stock_card.stock_id) AS \`item_count\`, tbl_inventory.*,tbl_stock.*
    FROM tbl_stock_card
    INNER JOIN tbl_stock ON tbl_stock_card.stock_id = tbl_stock.stock_id
    INNER JOIN tbl_inventory ON tbl_stock.item_id = tbl_inventory.item_id where (item_name LIKE ? or item_description like ? ) and tbl_stock_card.is_exist='true'  HAVING COUNT(DISTINCT tbl_stock_card.stock_id) > 0 ORDER BY ${conn.escapeId(
      sortby
    )} ${sortorder} LIMIT ${limit} OFFSET ${offset};`;

    const [result] = await conn.query(sql, [
      keyword,
      keyword,
      keyword,
      keyword,
      user_id,
    ]);
    conn.release();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
