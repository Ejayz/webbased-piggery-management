import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const { breed_id } = req.body;
  const data: any = await RemoveCage(breed_id);
  if (data.affectedRows != 0) {
    return res
      .status(200)
      .json({ code: 200, message: "Breed Removed Successfully" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error,Something went wrong." });
  }
}

async function RemoveCage(breed_id: any) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "update tbl_breed set is_exist='false' where is_exist='true' and breed_id=?";
      conn.query(sql, [breed_id], (err, result, feilds) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
