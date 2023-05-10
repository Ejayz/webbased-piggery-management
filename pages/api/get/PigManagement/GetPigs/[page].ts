import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { connection } from "pages/api/mysql";

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
    FROM tbl_pig
    INNER JOIN tbl_cage ON tbl_pig.cage_id = tbl_cage.cage_id
    INNER JOIN tbl_batch ON tbl_pig.batch_id = tbl_batch.batch_id
    INNER JOIN tbl_breed ON tbl_pig.breed_id = tbl_breed.breed_id WHERE tbl_pig.is_exist='true' AND tbl_pig.status='active'    
 ORDER BY  tbl_pig.birthdate asc LIMIT ${limit} OFFSET ${offset} ;`;
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
  SortOrder: any,
  sortby: any
) {
  const conn = await connection.getConnection();

  try {
    const sql = `SELECT *
    FROM tbl_pig
    INNER JOIN tbl_cage ON tbl_pig.cage_id = tbl_cage.cage_id
    INNER JOIN tbl_batch ON tbl_pig.batch_id = tbl_batch.batch_id
    INNER JOIN tbl_breed ON tbl_pig.breed_id = tbl_breed.breed_id WHERE tbl_pig.is_exist='true' AND tbl_pig.status='active'    
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
  sortorder: any,
  sortby: any,
  keyword: string
) {
  let sortColumn = sortby;
  if (sortby === "pig_id") {
    sortColumn = "tbl_pig.pig_id";
  } else if (sortby === "pig_tag") {
    sortColumn = "tbl_pig_history.pig_tag";
  } else if (sortby === "weight") {
    sortColumn = "tbl_pig_history.weight";
  } else if (sortby === "cage_name") {
    sortColumn = "tbl_cage.cage_name";
  } else if (sortby === "batch_name") {
    sortColumn = "tbl_batch.batch_name";
  } else if (sortby === "breed_name") {
    sortColumn = "tbl_breed.breed_name";
  } else {
    sortColumn = "tbl_pig.pig_id";
  }

  const conn = await connection.getConnection();
  try {
    keyword = `%${keyword}%`;
    const sql = `SELECT *
    FROM tbl_pig
    INNER JOIN tbl_pig_history ON tbl_pig.pig_id = tbl_pig_history.pig_id
    INNER JOIN tbl_cage ON tbl_pig_history.cage_id = tbl_cage.cage_id
    INNER JOIN tbl_batch ON tbl_pig_history.batch_id = tbl_batch.batch_id
    INNER JOIN tbl_breed ON tbl_pig.breed_id = tbl_breed.breed_id WHERE (tbl_pig.pig_id LIKE ?  OR tbl_pig_history.pig_tag LIKE ? OR tbl_pig_history.weight LIKE ? OR tbl_cage.cage_name LIKE ? OR tbl_batch.batch_name LIKE ? OR tbl_breed.breed_name LIKE ?) AND tbl_pig.is_exist='true' AND tbl_pig_history.pig_history_status='active'  
     ORDER BY ${conn.escapeId(
       sortColumn
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
