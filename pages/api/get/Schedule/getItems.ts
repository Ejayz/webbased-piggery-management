import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import {connection} from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
  const { keyword, category } = req.query;
  console.log(category);
  const real_category =
    category == "1" ? "1" : category == "2" ? "2" : category == "3" ? "2" : "2";

  try {
    const result = await Ops(keyword, real_category);
    return res.status(200).json({ code: 200, data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Something went wrong" });
  }
}

async function Ops(keyword: any, category: any) {
  const conn = await connection.getConnection();
  keyword = `%${keyword}%`;
  const getFeedingItems = `SELECT * FROM tbl_inventory WHERE (item_name LIKE ? OR item_description LIKE ?) AND category_id IN (?, '4') AND is_exist='true'`;
  try {
    const [result] = await conn.query(getFeedingItems, [
      keyword,
      keyword,
      category,
    ]);

    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
