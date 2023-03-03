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
    const data: any = await GetCategory();
    if (data.length != 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      return res
        .status(500)
        .json({ code: 500, message: "500 Server Error.Something went wrong" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function GetCategory() {
  const conn = await connection.getConnection();
  const sql = "select * from tbl_category where is_exist='true'";
  const [err, result] = await conn.query(sql, []);
  conn.release();
  if (err) return err;
  return result;
}
