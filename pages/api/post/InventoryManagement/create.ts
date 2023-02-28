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
  const {
    item_name,
    category_id,
    item_description,
    item_quantity,
    item_unit,
    item_net_weight,
  } = req.body;

  const dups: any = await checkDups(item_name);

  if (dups.length !== 0) {
    return res
      .status(409)
      .json({ code: 409, message: "Item name already exist" });
  }

  const finalQuantity = parseFloat(item_quantity) * parseFloat(item_net_weight);
  const data: any = await CreateInventory(
    item_name,
    category_id,
    item_description,
    finalQuantity,
    item_unit,
    item_net_weight
  );
  if (data.affectedRow != 0) {
    return res.status(200).json({ code: 200, message: "New item created" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error,Something went wrong." });
  }
}

async function CreateInventory(
  item_name: string,
  category_id: any,
  item_description: string,
  item_quantity: any,
  item_unit: any,
  item_net_weight: any
) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "INSERT INTO `piggery_management`.`tbl_inventory` (`item_name`, `category_id`, `item_description`, `item_quantity`, `item_unit`,`item_net_weight`) VALUES (?, ?, ?, ?, ?,?);";
      conn.query(
        sql,
        [
          item_name,
          category_id,
          item_description,
          item_quantity,
          item_unit,
          item_net_weight,
        ],
        (err, result, feilds) => {
          if (err) reject(err);
          resolve(result);
          conn.release();
        }
      );
    });
  });
}

async function checkDups(item_name: string) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "select * from tbl_inventory where item_name=? and is_exist='true'";
      conn.query(sql, [item_name], (err, result, field) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
