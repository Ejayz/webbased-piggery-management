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
    item_unit,
    item_net_weight,
  } = req.body;

  const dups: any = await checkDups(item_name);

  if (dups.length !== 0) {
    return res
      .status(409)
      .json({ code: 409, message: "Item name already exist" });
  }

  const data: any = await CreateInventory(
    item_name,
    category_id,
    item_description,
    item_unit,
    item_net_weight
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
  }
}

async function CreateInventory(
  item_name: string,
  category_id: any,
  item_description: string,
  item_unit: any,
  item_net_weight: any
) {
  const conn = await connection.getConnection();
  await conn.beginTransaction();
  try {
    const sql =
      "INSERT INTO `piggery_management`.`tbl_inventory` (`item_name`, `category_id`, `item_description`, `item_unit`,`item_net_weight`) VALUES (?, ?, ?, ?,?);";
    const [result]: any = await conn.query(sql, [
      item_name,
      category_id,
      item_description,
      item_unit,
      item_net_weight,
    ]);
    if (result.affectedRows != 0) {
      const createStocks =
        "INSERT INTO `piggery_management`.`tbl_stock` (`item_id`, `total_stocks`) VALUES (?, ?);";
      const [createStocksR]: any = await conn.query(createStocks, [
        result.insertId,
        0,
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
    return error;
  } finally {
    conn.release();
  }
}

async function checkDups(item_name: string) {
  const conn = await connection.getConnection();
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
  } finally {
    conn.release();
  }
}
