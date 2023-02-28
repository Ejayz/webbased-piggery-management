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
  const { breed_id, breed_name } = req.body;

  const dups: any = await checkDups(breed_id, breed_name);
  if (dups.length != 0) {
    return res
      .status(409)
      .json({ code: 409, message: "Cage name already exist." });
  }

  const data: any = await Update(breed_id, breed_name);
  if (data.affectedRows == 0) {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  } else {
    return res.status(200).json({ code: 200, message: "Updated succesfully" });
  }
}

async function Update(breed_id: any, breed_name: string) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "update tbl_breed set breed_name=? where breed_id=? and is_exist='true'";
      conn.query(sql, [breed_name, breed_id], (err, result, feilds) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}

async function checkDups(breed_id: any, breed_name: any) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "select * from tbl_breed where breed_id!=? and breed_name=? and is_exist='true'";
      conn.query(sql, [breed_id, breed_name], (err, result, field) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
