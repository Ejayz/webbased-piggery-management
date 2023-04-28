import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandlerFormData";
import { connection } from "pages/api/mysql";
import { DateTime } from "luxon";
import fildeHandler from "../../fileHandler";
import { fileURLToPath } from "url";
import { getUsers } from "pages/api/getUserDetails";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const conn = await connection.getConnection();

  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }

  const users = await getUsers(authorized.cookie);
  const user_id = users.user_id;

  try {
    const data: any = await fildeHandler(req);

    const filePath = data.filePath;
    const fields = JSON.parse(data.fields.fields);
    const insertRestocks = await insertRestock(conn, filePath, user_id);
    const insertOps = await Ops(conn, filePath, fields, user_id);
    if (insertOps == 200) {
      const insertDetails = await insertStockCardDetails(
        conn,
        filePath,
        fields,
        user_id,
        insertRestocks
      );
      if (insertDetails == 200) {
        return res.status(200).json({
          code: 200,
          message: "Stock card was successfully created",
        });
      } else {
        return res.status(500).json({
          code: 500,
          message: "Error inserting stock card details",
        });
      }
    } else {
      return res.status(500).json({
        code: 500,
        message: "Error Creating stock card",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: "500 Server Error . Something went wrong.",
    });
  } finally {
    conn.release();
  }
}

async function insertRestock(conn: any, filePath: any, user_id: any) {
  const restockDate = DateTime.now().setZone("Asia/Manila").toISODate();
  const insertRestock =
    "INSERT INTO tbl_restock (restock_date,attachment,user_id) VALUES (?,?,?)";
  const [insertRestockResult]: any = await conn.query(insertRestock, [
    restockDate,
    filePath,
    user_id,
  ]);
  return insertRestockResult.insertId;
}
//Create stock card
async function Ops(conn: any, filePath: any, fields: any, user_id: any) {
  const date = DateTime.now().setZone("Asia/Manila").toISODate();
  console.log(date);
  await conn.beginTransaction();
  try {
    await Promise.all(
      fields.map(async (field: any, key: number) => {
        const getOpeningQuantity =
          "select * from tbl_stock_card where item_id=?  and is_exist='true' and status='Active' order by stock_card_id desc limit 1";
        const [openingQuantityResult]: any = await conn.query(
          getOpeningQuantity,
          [field.item_id]
        );
        const openingQuantity = openingQuantityResult[0].closing_quantity;
        const checkStockCard =
          "SELECT * FROM tbl_stock_card WHERE item_id=? AND transaction_date=? AND is_exist='true'";
        const [stockCardResult]: any = await conn.query(checkStockCard, [
          field.item_id,
          date,
        ]);
        console.log(stockCardResult);
        if (stockCardResult.length <= 0) {
          const createStockCard =
            "INSERT INTO tbl_stock_card (transaction_date,opening_quantity,closing_quantity,item_id,user_id) VALUES (?,?,?,?,?)";
          const [createStackCardResult]: any = await conn.query(
            createStockCard,
            [date, openingQuantity, openingQuantity, field.item_id, user_id]
          );
        }
      })
    );
    await conn.commit();
    return 200;
  } catch (error) {
    console.log(error);
    conn.rollback(); // Release row-level locks by rolling back the transaction
    return error;
  }
}

//Insert stock card details
async function insertStockCardDetails(
  conn: any,
  filePath: any,
  fields: any,
  user_id: any,
  restock_id: any
) {
  await conn.beginTransaction();
  const date = DateTime.now().setZone("Asia/Manila").toISODate();
  try {
    await Promise.all(
      fields.map(async (field: any, key: number) => {
        const getStockCardId =
          "SELECT * FROM tbl_stock_card WHERE item_id=? AND transaction_date=? AND is_exist='true'";
        const [stockCardIdResult]: any = await conn.query(getStockCardId, [
          field.item_id,
          date,
        ]);
        console.log(stockCardIdResult);
        const stockCard_id = stockCardIdResult[0].stock_card_id;
        const closingQuantity = stockCardIdResult[0].closing_quantity;
        const createStockCardDetails =
          "INSERT INTO tbl_stock_card_details (stock_card_id,transaction_quantity,total_quantity,type,expiration_date,attachment) VALUES (?,?,?,?,?,?)";
        const createRestockDetails =
          "insert into tbl_restock_details (restock_id,item_id,quantity) values (?,?,?)";
        const [createRestockDetailsResult]: any = await conn.query(
          createRestockDetails,
          [restock_id, field.item_id, field.quantity]
        );
        let calculated_quantity: number =
          parseInt(field.quantity) * parseInt(field.item_net_weight);
        const total_quantity = calculated_quantity + parseInt(closingQuantity);
        const [createStockCardDetailsResult]: any = await conn.query(
          createStockCardDetails,
          [
            stockCard_id,
            calculated_quantity,
            total_quantity,
            "IN",
            field.expiration_date == "" ? null : field.expiration_date,
            filePath,
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
    await conn.commit();
    return 200;
  } catch (error) {
    conn.rollback();
    console.log(error);
    return error;
  }
}
