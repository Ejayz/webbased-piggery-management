import { ResultSetHeader } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";
import { resolve } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authrization = await authorizationHandler(req, res, "POST");
  if (!authrization) {
    return false;
  }
  const { cage_name, cage_capacity, cage_type } = req.body;
  const data: any = await AddCage(cage_name, cage_capacity, cage_type);
  if (data.affectedRows != 0) {
    return res
      .status(200)
      .json({ code: 200, message: "Cage added successfully" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong" });
  }
}
async function AddCage(
  cage_name: string,
  cage_capacity: Number,
  cage_type: String
) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO `tbl_cage` ( `cage_name`, `cage_type`, `cage_capacity`) VALUES ( ?, ?, ?);";
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const data = conn.query(
        sql,
        [cage_name, cage_type, cage_capacity],
        (err, result, feild) => {
          if (err) reject(err);
          resolve(result);
          conn.release();
        }
      );
      console.log(data);
    });
  });
}
