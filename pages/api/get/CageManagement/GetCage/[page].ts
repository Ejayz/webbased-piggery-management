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
    if (keyword == "undefined") {
      data = await GetCage(offset, limit, sortorder, sortby);
    } else {
      data = await SearhGetCage(offset, limit, sortorder, sortby, keyword);
    }
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

async function GetCage(
  offset: number,
  limit: number,
  SortOrder: any,
  sortby: any
) {
  const conn = await connection.getConnection();
  try {
    const sql = `select cage_id,cage_name,cage_capacity,cage_type from tbl_cage where is_exist='true' and is_full='false' ORDER BY ${conn.escapeId(
      sortby
    )} ${SortOrder}  LIMIT ${limit} OFFSET ${offset} ;`;
    const [result] = await conn.query(sql, []);
    conn.release();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
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
    const sql = `select cage_id,cage_name,cage_capacity,cage_type from tbl_cage where (cage_name LIKE ? OR cage_type LIKE ? OR cage_capacity LIKE ? ) AND is_exist='true' AND is_full='false' ORDER BY ${conn.escapeId(
      sortby
    )} ${SortOrder}  LIMIT ${limit} OFFSET ${offset} ;`;
    const [result] = await conn.query(sql, [keyword, keyword, keyword]);
    conn.release();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
