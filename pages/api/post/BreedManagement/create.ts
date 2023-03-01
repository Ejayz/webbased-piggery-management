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
  const { breed_name } = req.body;

  const dups: any = await checkDups(breed_name);
  if (dups.length != 0) {
    return res
      .status(409)
      .json({ code: 409, message: "Breed name already exist" });
  }

  const data: any = await CreateBreed(breed_name);
  if (data.affectedRows != 0) {
    return res.status(200).json({ code: 200, message: "New breed created" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error ,Something went wrong." });
  }
}

async function CreateBreed(breed_name: string) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql = "insert into tbl_breed  (`breed_name`) values (?)";
      conn.query(sql, [breed_name], (err, result, feilds) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
async function checkDups(breed_name: string) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "select * from tbl_breed where breed_name=? and is_exist='true'";
      conn.query(sql, [breed_name], (err, result, fields) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
