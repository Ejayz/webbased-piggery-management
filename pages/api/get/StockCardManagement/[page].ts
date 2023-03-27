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
    data = await GetUsersWithSearch(
      limit,
      offset,
      user_id,
      sortby,
      sortorder,
      keyword
    );
    if (data.length == 0) {
      return res.status(404).json({ code: 404, message: "No data found" });
    }
    return res.status(200).json({ code: 200, data: data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
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
    const sql = `SELECT *,COUNT( tbl_stock_card.item_id) AS item_count, tbl_inventory.* FROM tbl_stock_card  INNER JOIN tbl_inventory ON tbl_stock_card.item_id = tbl_inventory.item_id WHERE (item_name LIKE ? or item_description like ? ) AND tbl_stock_card.is_exist = 'true' GROUP BY tbl_inventory.item_id ORDER BY ${conn.escapeId(
      sortby
    )} ${sortorder} LIMIT ${limit} OFFSET ${offset};`;

    console.log(
      `SELECT COUNT( tbl_stock_card.item_id) AS item_count, tbl_inventory.*,* FROM tbl_stock_card  INNER JOIN tbl_inventory ON tbl_stock_card.item_id = tbl_inventory.item_id WHERE (item_name LIKE ${keyword} or item_description like ${keyword} ) AND tbl_stock_card.is_exist = 'true' GROUP BY tbl_inventory.item_id ORDER BY ${conn.escapeId(
        sortby
      )} ${sortorder} LIMIT ${limit} OFFSET ${offset};`
    );
    const [result] = await conn.query(sql, [keyword, keyword, user_id]);
    conn.release();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
