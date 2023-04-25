import { DateTime } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { getUsers } from "pages/api/getUserDetails";
import {connection} from "pages/api/mysql";

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
    item_unit,
    item_net_weight,
  } = req.body;


const users = await getUsers(authorized.cookie);
  const user_id = users.user_id;


  const conn = await connection.getConnection();

  const dups: any = await checkDups(conn, item_name);

  if (dups.length !== 0) {
    return res
      .status(409)
      .json({ code: 409, message: "Item name already exist" });
  }

  const data: any = await CreateInventory(
    conn,
    item_name,
    category_id,
    item_description,
    item_unit,
    item_net_weight
    ,user_id
  );
  try {
    if (data.affectedRow != 0) {
      return res.status(200).json({ code: 200, message: "New item created" });
    } else {
      return res
        .status(500)
        .json({ code: 500, message: "500 Server Error,Something went wrong." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error,Something went wrong." });
  } finally {
    conn.release();
  }
}

async function CreateInventory(
  conn: any,
  item_name: string,
  category_id: any,
  item_description: string,
  item_unit: any,
  item_net_weight: any
  ,user_id:any
) {
  await conn.beginTransaction();
  const date = DateTime.now().setZone("Asia/Manila").toISODate();
  try {
    const sql =
      "INSERT INTO `piggery_management`.`tbl_inventory` (`item_name`, `category_id`, `item_description`, `item_unit`,`item_net_weight`,user_id) VALUES (?, ?, ?, ?,?,?);";
    const [result]: any = await conn.query(sql, [
      item_name,
      category_id,
      item_description,
      item_unit,
      item_net_weight,
      user_id
    ]);
    if (result.affectedRows != 0) {
      const createStocks =
        "INSERT INTO `tbl_stock_card` (`opening_quantity`, `closing_quantity`,`item_id`,`transaction_date`,user_id) VALUES (?, ?,?,?,?);";
      const [createStocksR]: any = await conn.query(createStocks, [
        0,
        0,
        result.insertId,
        date,
        user_id
      ]);
      if (createStocksR.affectedRows != 0) {
        await conn.commit();
        return result;
      } else {
        await conn.rollback();
        return result;
      }
    } else {
      await conn.rollback();
      return result;
    }
  } catch (error) {
    console.log(error);
    await conn.rollback();
    return error;
  }
}

async function checkDups(conn: any, item_name: string) {
  try {
    const sql =
      "select * from tbl_inventory where item_name=? and is_exist='true'";
    const [err, result] = await conn.query(sql, [item_name]);

    if (err) return err;
    conn.release();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
