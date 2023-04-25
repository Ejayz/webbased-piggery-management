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
  const { page, filters }: any = req.query;
  const { sortby, sortorder, keyword }: any = JSON.parse(filters);
  if (page == "0") {
    return res
      .status(404)
      .json({ code: 404, message: "Page 0 data cannot be found" });
  }
  const limit: number = 10;
  const offset: number = limit * (parseInt(page) - 1);

  try {
    let data: any;
    if (sortby == "" && sortorder == "" && keyword == "") {
      data = await getPig(limit, offset);
    } else if (keyword == undefined) {
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

async function getPig(limit: any, offset: any) {
  const conn = await connection.getConnection();

  try {
    const sql = `SELECT *
    FROM tbl_batch LEFT JOIN tbl_pig ON tbl_batch.pig_id = tbl_pig.pig_id
   WHERE (batch_name LIKE ?) AND is_exist='true'   LIMIT ${limit} OFFSET ${offset} ;`;
    const result = await conn.query(sql);
    conn.release();
    return result[0];
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}

async function GetCage(
  offset: number,
  limit: number,
  sortorder: any,
  sortby: any
) {
  const conn = await connection.getConnection();

  try {
    const sql = `SELECT *
    FROM tbl_batch LEFT JOIN tbl_pig ON tbl_batch.pig_id = tbl_pig.pig_id
   WHERE (batch_name LIKE ?) AND is_exist='true' 
     ORDER BY ${conn.escapeId(
       sortby
     )} ${sortorder}  LIMIT ${limit} OFFSET ${offset} ;`;
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
  sortorder: any,
  sortby: any,
  keyword: string
) {
  const conn = await connection.getConnection();
  try {
    keyword = `%${keyword}%`;
    const sql = `SELECT *
    FROM tbl_batch LEFT JOIN tbl_pig ON tbl_batch.sow_id = tbl_pig.pig_id AND tbl_batch.boar_id = tbl_pig.pig_id
   WHERE (batch_name LIKE ? OR sow_id like ? or boar_id like ? or batch_capacity like ? ) AND tbl_batch.is_exist='true' 
     ORDER BY ${conn.escapeId(
       sortby
     )} ${sortorder}  LIMIT ${limit} OFFSET ${offset} ;`;
    const [result] = await conn.query(sql, [
      keyword,
      keyword,
      keyword,
      keyword,
      keyword,
      keyword,
    ]);
    conn.release();
    return [result];
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
