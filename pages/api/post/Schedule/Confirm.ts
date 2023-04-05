import { DateTime } from "luxon";
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
  const { operation_id, quantity } = req.body;
  console.log(operation_id, quantity);
  const conn = await connection.getConnection();
  try {
    conn.beginTransaction();
    await Ops(conn, operation_id, quantity);
    await insertStockCardDetails(conn, operation_id, quantity);
    await updateItem(operation_id, quantity);
    const result = await updateOperation(conn, operation_id);
    console.log(result);

    conn.commit();
    return res.status(200).json({ code: 200, message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    conn.rollback();
    return res.status(500).json({ code: 500, message: "Something went wrong" });
  } finally {
    conn.release();
  }
}

async function updateItem(operation_id: any, quantity: any) {
  const sql =
    "UPDATE tbl_operation_item_details SET quantity=? WHERE operation_id=?";
  const conn = await connection.getConnection();
  try {
    const [result] = await conn.query(sql, [quantity, operation_id]);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}

async function Ops(conn: any, operation_id: any, quantity: any) {
  const date = DateTime.now().setZone("Asia/Manila").toISODate();
  console.log(date);
  try {
    const getAllItemFromOperation =
      "select * from tbl_operation_item_details INNER JOIN tbl_inventory ON tbl_inventory.item_id = tbl_operation_item_details.item_id where operation_id=? and tbl_operation_item_details.is_exist='true'";
    const [getOperationItemResult] = await conn.query(getAllItemFromOperation, [
      operation_id,
    ]);

    await Promise.all(
      getOperationItemResult.map(async (items: any) => {
        const getOpeningQuantity =
          "select * from tbl_stock_card where item_id=?  and is_exist='true' and status='Active' order by stock_card_id desc limit 1";
        const [openingQuantityResult]: any = await conn.query(
          getOpeningQuantity,
          [items.item_id]
        );
        const openingQuantity = openingQuantityResult[0].closing_quantity;
        const checkStockCard =
          "SELECT * FROM tbl_stock_card WHERE item_id=? AND transaction_date=? AND is_exist='true'";
        const [stockCardResult]: any = await conn.query(checkStockCard, [
          items.item_id,
          date,
        ]);
        if (stockCardResult.length <= 0) {
          const createStockCard =
            "INSERT INTO tbl_stock_card (transaction_date,opening_quantity,closing_quantity,item_id) VALUES (?,?,?,?)";
          const [createStackCardResult]: any = await conn.query(
            createStockCard,
            [date, openingQuantity, openingQuantity, items.item_id]
          );
        }
      })
    );

    return 200;
  } catch (error) {
    console.log(error);
    conn.rollback(); // Release row-level locks by rolling back the transaction
    return error;
  }
}

async function insertStockCardDetails(
  conn: any,
  operation_id: any,
  quantity: any
) {
  const date = DateTime.now().setZone("Asia/Manila").toISODate();
  try {
    const getAllItemFromOperation =
      "select * from tbl_operation_item_details INNER JOIN tbl_inventory ON tbl_inventory.item_id = tbl_operation_item_details.item_id where operation_id=? and tbl_operation_item_details.is_exist='true'";
    const [getOperationItemResult] = await conn.query(getAllItemFromOperation, [
      operation_id,
    ]);
    await Promise.all(
      getOperationItemResult.map(async (items: any) => {
        const getStockCardId =
          "SELECT * FROM tbl_stock_card WHERE item_id=? AND transaction_date=? AND is_exist='true'";
        const [stockCardIdResult]: any = await conn.query(getStockCardId, [
          items.item_id,
          date,
        ]);
        const stockCard_id = stockCardIdResult[0].stock_card_id;
        const closingQuantity = stockCardIdResult[0].closing_quantity;
        const createStockCardDetails =
          "INSERT INTO tbl_stock_card_details (stock_card_id,transaction_quantity,total_quantity,type,remark) VALUES (?,?,?,?,?)";
        let calculated_quantity: number =
          parseFloat(quantity) * parseFloat(items.item_net_weight);
        const total_quantity =
          parseFloat(closingQuantity) - calculated_quantity;
        console.log(calculated_quantity, total_quantity);
        const [createStockCardDetailsResult]: any = await conn.query(
          createStockCardDetails,
          [
            stockCard_id,
            calculated_quantity,
            total_quantity,
            "OUT",
            "Scheduled Activity",
          ]
        );
        console.log(createStockCardDetailsResult);
        const updateStockCard =
          "UPDATE tbl_stock_card SET closing_quantity=? WHERE stock_card_id=? AND is_exist='true'";
        const [updateStockCardResult]: any = await conn.query(updateStockCard, [
          total_quantity,
          stockCard_id,
        ]);
      })
    );

    return 200;
  } catch (error) {
    conn.rollback();
    console.log(error);
    return error;
  }
}

async function updateOperation(conn: any, operation_id: any) {
  const update =
    "update tbl_operation set status='confirmed' where operation_id=? and is_exist='true'";
  const updateResult = await conn.query(update, [operation_id]);
  return updateResult;
}
