import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandlerFormData";
import connection from "pages/api/mysql";
import { DateTime } from "luxon";
import fildeHandler from "../../fileHandler";
import { fileURLToPath } from "url";

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
  try {
    const data: any = await fildeHandler(req);

    const filePath = data.filePath;
    const fields = JSON.parse(data.fields.fields);

    console.log(fields);
    const insertOps = await Ops(conn, filePath, fields);
    if (insertOps == 200) {
      const insertDetails = await insertStockCardDetails(
        conn,
        filePath,
        fields
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

async function Ops(conn: any, filePath: any, fields: any) {
  const date = DateTime.now().setZone("Asia/Manila").toISODate();
  await conn.beginTransaction();
  try {
    await Promise.all(
      fields.map(async (field: any, key: number) => {
        let stockCard_id = "";
        const getOpeningQuantity =
          "select * from tbl_stock_card where item_id=? and is_exist='true' and status='Active' order by stock_card_id desc limit 1";
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
        if (stockCardResult.length < 0) {
          const createStockCard =
            "INSERT INTO tbl_stock_card (transaction_date,opening_quantity,closing_quantity,item__id) VALUES (?,?,?,?)";
          const [createStackCardResult]: any = await conn.query(
            createStockCard,
            [date, openingQuantity, openingQuantity, field.item_id]
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

async function insertStockCardDetails(conn: any, filePath: any, fields: any) {
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
        const stockCard_id = stockCardIdResult[0].stock_card_id;
        const closingQuantity = stockCardIdResult[0].closing_quantity;
        const createStockCardDetails =
          "INSERT INTO tbl_stock_card_details (stock_card_id,transaction_quantity,total_quantity,type,expiration_date,attachment) VALUES (?,?,?,?,?,?)";
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
