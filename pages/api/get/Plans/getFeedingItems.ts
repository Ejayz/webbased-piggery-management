import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
  const { keyword } = req.query;

  try {
    const result = await Ops(keyword);
    return res.status(200).json({ code: 200, data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Something went wrong" });
  }
}

async function Ops(keyword: any) {
  const conn = await connection.getConnection();
  keyword = `%${keyword}%`;
  const getFeedingItems = `select * from tbl_inventory where (item_name like ? or item_description like ?) AND category_id='1' and is_exist='true'   `;

  try {
    const [result] = await conn.query(getFeedingItems, [keyword, keyword]);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
