import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorization = await authorizationHandler(req, res, "GET");
  if (!authorization) {
    return false;
  }
  const { page, filter }: any = req.query;
  const { keyword, sortby, sortorder }: any = JSON.parse(filter);
  if (page == "0") {
    return res
      .status(404)
      .json({ code: 404, message: "Page 0 data cannot be found" });
  }

  const limit: number = 5;
  const offset: number = limit * (parseInt(page) - 1);

  try {
    let data: any;

    data = await SearhGetCage(offset, limit, sortorder, sortby, keyword);

    if (data.length != 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      if (keyword !== "undefined" || keyword !== "") {
        return res
          .status(404)
          .json({ code: 404, message: "No Data found realated to :" });
      } else {
        return res
          .status(404)
          .json({ code: 404, message: "This is the last page." });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function SearhGetCage(
  offset: number,
  limit: number,
  SortOrder: any,
  sortby: any,
  keyword: string
) {
  const conn = await connection.getConnection();
  try {
    keyword = `%${keyword}%`;
    const sql = `select *,(select count(*) from tbl_operation_item_details where tbl_operation_item_details.operation_id=tbl_operation.operation_id) as \`total_item\`,tbl_pig.* from tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id=tbl_operation_item_details.operation_id  INNER JOIN tbl_pig ON tbl_operation.pig_id=tbl_pig.pig_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id=tbl_operation.operation_type_id where (operation_date LIKE ? OR operation_name LIKE ? OR tbl_operation.pig_id LIKE ? ) AND tbl_operation.is_exist='true' and tbl_operation.status='pending' ORDER BY ${conn.escapeId(
      sortby
    )} ${SortOrder}  LIMIT ${limit} OFFSET ${offset} ;`;
  

    const [result] = await conn.query(sql, [
      keyword,
      keyword,
      keyword,
      keyword,
      keyword,
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
