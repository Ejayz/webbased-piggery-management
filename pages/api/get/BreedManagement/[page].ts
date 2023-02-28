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
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql = `select * from tbl_breed where is_exist='true' ORDER BY ${conn.escapeId(
        sortby
      )} ${SortOrder}  LIMIT ${limit} OFFSET ${offset} ;`;
      conn.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}

async function SearhGetCage(
  offset: number,
  limit: number,
  SortOrder: any,
  sortby: any,
  keyword: string
) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      keyword = `%${keyword}%`;
      if (err) reject(err);
      const sql = `select * from tbl_breed where (breed_name LIKE ? ) AND is_exist='true'  ORDER BY ${conn.escapeId(
        sortby
      )} ${SortOrder}  LIMIT ${limit} OFFSET ${offset} ;`;
      conn.query(sql, [keyword, keyword, keyword], (err, result) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
