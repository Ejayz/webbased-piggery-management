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
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }

  const data: any = await fildeHandler(req);
  try {
    if (data !== false) {
      const filePath: any = data.filePath;
      const fields = JSON.parse(data.fields.fields);
      const returned = await Ops(filePath, fields);
      console.log(returned);
      if (returned == 200) {
        return res.status(200).json({
          code: 200,
          message: "Stock card was successfully created",
        });
      } else {
        return res.status(500).json({
          code: 500,
          message: "500 Server Error . Something went wrong.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: "500 Server Error . Something went wrong.",
    });
  }
}

async function Ops(filePath: any, fields: any) {
  const date = DateTime.now().toISODate();
  const conn = await connection.getConnection();
  await conn.beginTransaction();
  try {
    // Lock the rows that will be updated
    const getItems =
      "SELECT * FROM tbl_inventory WHERE is_exist='true' FOR UPDATE";
    const [itemResult]: any = await conn.query(getItems);
    await Promise.all(
      fields.map(async (field: any, key: number) => {
        let stockCard_id = "";
        const getOpeningQuantity =
          "SELECT * FROM tbl_stock WHERE stock_id=? AND is_exist='true'";
        const [openingQuantityResult]: any = await conn.query(
          getOpeningQuantity,
          [field.stock_id]
        );
        const openingQuantity = openingQuantityResult[0].total_stocks;
        console.log(openingQuantity);
        const checkStockCard =
          "SELECT * FROM tbl_stock_card WHERE stock_id=? AND transaction_date=? AND is_exist='true'";
        const [stockCardResult]: any = await conn.query(checkStockCard, [
          field.stock_id,
          date,
        ]);
        if (stockCardResult.length > 0) {
          stockCard_id = stockCardResult[0].stock_card_id;
        } else {
          const createStockCard =
            "INSERT INTO tbl_stock_card (transaction_date,opening_quantity,closing_quantity,stock_id,status) VALUES (?,?,?,?,?) FOR UPDATE";
          const [createStackCardResult]: any = await conn.query(
            createStockCard,
            [date, openingQuantity, openingQuantity, field.stock_id, "Active"]
          );
          stockCard_id = createStackCardResult.insertId;
        }
        const createStockCardDetails =
          "INSERT INTO tbl_stock_card_details (stock_card_id,transaction_quantity,total_quantity,type,expiration_date,attachment) VALUES (?,?,?,?,?,?)";
        let calculated_quantity: number =
          parseInt(field.quantity) * parseInt(field.item_net_weight);
        const total_quantity = calculated_quantity + parseInt(openingQuantity);
        console.log(total_quantity);
        const [createStockCardDetailsResult]: any = await conn.query(
          createStockCardDetails,
          [
            stockCard_id,
            calculated_quantity,
            total_quantity,
            "IN",
            field.expiration_date,
            filePath,
          ]
        );

        const updateStockCard =
          "UPDATE tbl_stock_card SET closing_quantity=? WHERE stock_card_id=? AND is_exist='true'";
        const [updateStockCardResult]: any = await conn.query(updateStockCard, [
          total_quantity,
          stockCard_id,
        ]);
        const updateStock =
          "UPDATE tbl_stock SET total_stocks=? WHERE stock_id=? AND is_exist='true'";
        const [updateStockResult]: any = await conn.query(updateStock, [
          total_quantity,
          field.stock_id,
        ]);
      })
    );
    await conn.commit(); // Release row-level locks by committing the transaction
    return 200;
  } catch (error) {
    console.log(error);
    conn.rollback(); // Release row-level locks by rolling back the transaction
    return error;
  } finally {
    conn.release(); // Release the connection to the connection pool
  }
}
