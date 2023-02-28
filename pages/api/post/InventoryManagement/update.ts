import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";
import { json } from "stream/consumers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const { item_id, item_name, category_id, item_description } = req.body;
  const dups: any = await checkDups(item_name, item_id);

  if (dups.length !== 0) {
    return res
      .status(409)
      .json({ code: 409, message: "Item name already exist" });
  }

  const data: any = await Update(
    item_id,
    item_name,
    category_id,
    item_description
  );
  if (data.affectedRows != 0) {
    return res.status(200).json({ code: 200, message: "Updated Successfully" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function Update(
  item_id: any,
  item_name: string,
  category_id: any,
  item_description: string
) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "update tbl_inventory set item_name=?, category_id=? , item_description=? where item_id=? and is_exist='true'";
      conn.query(
        sql,
        [item_name, category_id, item_description, item_id],
        (err, result, feilds) => {
          if (err) reject(err);
          resolve(result);
          conn.release();
        }
      );
    });
  });
}

async function checkDups(item_name: string, item_id: any) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "select * from tbl_inventory where item_name=? and  item_id!=? and is_exist='true'";
      conn.query(sql, [item_name, item_id], (err, result, field) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
