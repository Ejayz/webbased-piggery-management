import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import {connection} from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorization = await authorizationHandler(req, res, "GET");
  if (!authorization) {
    return false;
  }
  const { page, sortby, sortorder, keyword }: any = req.query;
  if (page == "0") {
    return res
      .status(404)
      .json({ code: 404, message: "Page 0 data cannot be found" });
  }

  const limit: number = 5;
  const offset: number = limit * (parseInt(page) - 1);

  try {
    let data: any;
    console.log(data);
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
    const sql = `SELECT r.reorder_id, r.reorder_date, r.status, COUNT(d.reorder_details_id) AS total_reorder
  FROM tbl_reorder r
  LEFT JOIN tbl_reorder_details d
  ON r.reorder_id = d.reorder_id WHERE r.is_exist='true' and r.status!='confirmed'
  GROUP BY r.reorder_id, r.reorder_date, r.status
 ORDER BY ${conn.escapeId(
   sortby
 )} ${SortOrder}  LIMIT ${limit} OFFSET ${offset} ;`;
    const [err, result] = await conn.query(sql);
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
    const sql = `SELECT r.reorder_id, r.reorder_date, r.status, COUNT(d.reorder_details_id) AS total_reorder
  FROM tbl_reorder r
  LEFT JOIN tbl_reorder_details d
  ON r.reorder_id = d.reorder_id WHERE r.is_exist='true' and r.status!='confirmed'
  GROUP BY r.reorder_id, r.reorder_date, r.status  ORDER BY ${conn.escapeId(
    sortby
  )} ${SortOrder}  LIMIT ${limit} OFFSET ${offset} ;`;
    const [err, result] = await conn.query(sql, [keyword, keyword, keyword]);
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
