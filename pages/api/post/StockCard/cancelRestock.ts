import { DateTime } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { connection } from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const { restock_id } = req.body;
  const conn = await connection.getConnection();
  try {
    const Update = await UpdateCage(conn, restock_id);
    if (Update == 200) {
      const [updateRestock] = await conn.query(
        `UPDATE tbl_restock SET is_exist='false' WHERE restock_id=${restock_id}`
      );
      return res.status(200).json({ code: 200, message: "Restock Cancelled" });
    } else {
      return res
        .status(500)
        .json({ code: 500, message: "500 Server Error.Something went wrong." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function UpdateCage(conn: any, restock_id: any) {
  try {
    const [selectAllRestock] = await conn.query(
      `select * from tbl_restock_details INNER JOIN tbl_inventory on tbl_inventory.item_id=tbl_restock_details.item_id where restock_id=${restock_id}`
    );
    await Promise.all(
      selectAllRestock.map(async (item: any) => {
        const data = await Ops(conn, item.item_id);
        if (data == 200) {
          insertStockCardDetails(
            conn,
            item.item_id,
            item.quantity,
            "Cancel Restock",
            item.item_net_weight
          );
        } else {
          throw new Error("Error");
        }
      })
    );
    return 200;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}

async function Ops(conn: any, item_id: any) {
  const date = DateTime.now().setZone("Asia/Manila").toISODate();
  console.log(date);
  await conn.beginTransaction();
  try {
    const getOpeningQuantity =
      "select * from tbl_stock_card where item_id=?  and is_exist='true' and status='Active' order by stock_card_id desc limit 1";
    const [openingQuantityResult]: any = await conn.query(getOpeningQuantity, [
      item_id,
    ]);
    const openingQuantity = openingQuantityResult[0].closing_quantity;
    const checkStockCard =
      "SELECT * FROM tbl_stock_card WHERE item_id=? AND transaction_date=? AND is_exist='true'";
    const [stockCardResult]: any = await conn.query(checkStockCard, [
      item_id,
      date,
    ]);
    console.log(stockCardResult);
    if (stockCardResult.length <= 0) {
      const createStockCard =
        "INSERT INTO tbl_stock_card (transaction_date,opening_quantity,closing_quantity,item_id) VALUES (?,?,?,?)";
      const [createStackCardResult]: any = await conn.query(createStockCard, [
        date,
        openingQuantity,
        openingQuantity,
        item_id,
      ]);
    }

    await conn.commit();
    return 200;
  } catch (error) {
    console.log(error);
    conn.rollback(); // Release row-level locks by rolling back the transaction
    return error;
  }
}

async function insertStockCardDetails(
  conn: any,
  item_id: any,
  quantity: any,
  remarks: any,
  item_net_weight: any
) {
  await conn.beginTransaction();
  const date = DateTime.now().setZone("Asia/Manila").toISODate();
  try {
    const getStockCardId =
      "SELECT * FROM tbl_stock_card WHERE item_id=? AND transaction_date=? AND is_exist='true'";
    const [stockCardIdResult]: any = await conn.query(getStockCardId, [
      item_id,
      date,
    ]);
    console.log(stockCardIdResult);
    const stockCard_id = stockCardIdResult[0].stock_card_id;
    const closingQuantity = stockCardIdResult[0].closing_quantity;
    const createStockCardDetails =
      "INSERT INTO tbl_stock_card_details (stock_card_id,transaction_quantity,total_quantity,type,remark) VALUES (?,?,?,?,?)";
    let calculated_quantity: number =
      parseInt(quantity) * parseInt(item_net_weight);
    const total_quantity = parseInt(closingQuantity) - calculated_quantity;

    const [createStockCardDetailsResult]: any = await conn.query(
      createStockCardDetails,
      [stockCard_id, calculated_quantity, total_quantity, "OUT", remarks]
    );

    const updateStockCard =
      "UPDATE tbl_stock_card SET closing_quantity=? WHERE stock_card_id=? AND is_exist='true'";
    const [updateStockCardResult]: any = await conn.query(updateStockCard, [
      total_quantity,
      stockCard_id,
    ]);

    await conn.commit();
    return 200;
  } catch (error) {
    conn.rollback();
    console.log(error);
    return error;
  }
}
