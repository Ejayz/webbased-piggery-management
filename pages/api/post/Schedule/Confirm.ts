import { throws } from "assert";
import { DateTime } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { getUsers } from "pages/api/getUserDetails";
import { connection } from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  //Get user details
  const users = await getUsers(authorized.cookie);
  //get userid
  const user_id = users.user_id;
  //get data sent to api
  const { OpData } = req.body;
  console.log(req.body);
  const conn = await connection.getConnection();
  try {
    conn.beginTransaction();
    await Ops(conn, OpData, user_id);
    await insertStockCardDetails(conn, OpData, user_id);
    await updateItem(OpData);

    const result = await updateOperation(conn, OpData[0].operation_id);
    conn.commit();
    return res.status(200).json({ code: 200, message: "Updated successfully" });
  } catch (error) {
    console.log("From catch main", error);
    conn.rollback();
    return res.status(500).json({ code: 500, message: error });
  } finally {
    conn.release();
  }
}

async function updateItem(OpData: any) {
  const sql =
    "UPDATE tbl_operation_item_details SET quantity=? WHERE operation_item_details_id=?";
  const conn = await connection.getConnection();
  try {
    await Promise.all(
      OpData.map(async (item: any) => {
        const [result] = await conn.query(sql, [
          item.quantity,
          item.operation_item_details_id,
        ]);
      })
    );
    return true;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}

async function Ops(conn: any, OpData: any, user_id: any) {
  const date = DateTime.now().setZone("Asia/Manila").toISODate();
  console.log(date);
  try {
    await Promise.all(
      OpData.map(async (items: any) => {
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
            "INSERT INTO tbl_stock_card (transaction_date,opening_quantity,closing_quantity,item_id,user_id) VALUES (?,?,?,?,?)";
          const [createStackCardResult]: any = await conn.query(
            createStockCard,
            [date, openingQuantity, openingQuantity, items.item_id, user_id]
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

async function insertStockCardDetails(conn: any, OpData: any, user_id: any) {
  const date = DateTime.now().setZone("Asia/Manila").toISODate();
  try {
    await Promise.all(
      OpData.map(async (items: any) => {
        const getStockCardId =
          "SELECT * FROM tbl_stock_card WHERE item_id=? AND transaction_date=? AND is_exist='true'";
        const [stockCardIdResult]: any = await conn.query(getStockCardId, [
          items.item_id,
          date,
        ]);
        const stockCard_id = stockCardIdResult[0].stock_card_id;
        const closingQuantity = stockCardIdResult[0].closing_quantity;
        const createStockCardDetails =
          "INSERT INTO tbl_stock_card_details (stock_card_id,transaction_quantity,total_quantity,type,remark,user_id) VALUES (?,?,?,?,?,?)";
        console.log(parseFloat(closingQuantity), parseFloat(items.quantity));
        const total_quantity =
          parseFloat(closingQuantity) - parseFloat(items.quantity);
        console.log(items.quantity, total_quantity);
        if (total_quantity < 0) {
          throw "Current stocks for this item is not enough.";
        }

        const [createStockCardDetailsResult]: any = await conn.query(
          createStockCardDetails,
          [
            stockCard_id,
            items.quantity,
            total_quantity,
            "OUT",
            "Scheduled Activity",
            user_id,
          ]
        );
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
    console.log("Error From updating Stock Card", error);
    throw error;
  }
}

async function updateOperation(conn: any, operation_id: any) {
  const update =
    "update tbl_operation set status='confirmed' where operation_id=? and is_exist='true'";
  const updateResult = await conn.query(update, [operation_id]);
  return updateResult;
}
