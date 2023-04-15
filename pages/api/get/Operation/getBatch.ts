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
  try {
    const { filter }: any = req.query;
    const filters = JSON.parse(filter);
    console.log(filters);
    const sortby = filters.sortby;
    const sortorder = filters.sortorder;
    const keyword = filters.keyword;
    const data: any = await UpdateCage(sortorder, keyword);
    if (data.length != 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      return res
        .status(404)
        .json({ code: 404, message: "Create schedules first" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function UpdateCage(sortorder: any, keyword: any) {
  const conn = await connection.getConnection();
  try {
    keyword = `%${keyword}%`;
    const sql = `SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation_item_details.operation_id=tbl_operation.operation_id INNER JOIN tbl_batch  ON tbl_operation.batch_id=tbl_batch.batch_id WHERE tbl_operation.is_exist='true' AND tbl_operation.status='pending' and tbl_operation.batch_id!='Null' AND (tbl_batch.batch_name like ?) GROUP BY tbl_operation.batch_id ORDER BY tbl_batch.batch_name ${sortorder} `;
    const [result] = await conn.query(sql, [keyword]);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
