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
  const data: any = await GetCategory();
  if (data.length != 0) {
    return res.status(200).json({ code: 200, data: data });
  } else {
    return res
      .status(500)
      .json({ code: 200, message: "500 Server Error.Something went wrong" });
  }
}

async function GetCategory() {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql = "select * from tbl_category where is_exist='true'";
      conn.query(sql, [], (err, result, feilds) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
