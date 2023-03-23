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
  const { stock_id, item_id, quantity, remarks, item_net_weight } = req.body;
  try {
    const data = await Ops(
      stock_id,
      item_id,
      quantity,
      remarks,
      item_net_weight
    );
    if (data == 200) {
      return res
        .status(200)
        .json({ code: 200, message: "Stock card was destocked successfully" });
    } else {
      return res.status(500).json({
        code: 500,
        message: "500 Server Error . Something went wrong.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error . Something went wrong." });
  }
}

async function Ops(
  stock_id: any,
  item_id: any,
  quantity: any,
  remarks: any,
  item_net_weight: any
) {
  const conn = await connection.getConnection();
  await conn.beginTransaction();
  try {
    const date = DateTime.now().toISODate();
    let stockCardId;

    const getOpeningQuantity =
      "SELECT * FROM tbl_stock WHERE stock_id=? AND is_exist='true'";
    const [openingQuantityResult]: any = await conn.query(getOpeningQuantity, [
      stock_id,
    ]);
    const openingQuantity = openingQuantityResult[0].total_stocks;
    const checkStockCard =
      "SELECT * FROM tbl_Stock_card WHERE stock_id = ? and transaction_date = ? and is_exist='true'";
    const [stockCardResult]: any = await conn.query(checkStockCard, [
      stock_id,
      date,
    ]);

    console.log(date);
    console.log(stockCardResult);

    if (stockCardResult.length > 0) {
      stockCardId = stockCardResult[0].stock_card_id;
    } else {
      const createStockCard =
        "INSERT INTO tbl_stock_card (transaction_date,opening_quantity,closing_quantity,stock_id,status) VALUES (?,?,?,?,?) FOR UPDATE";
      const [createStackCardResult]: any = await conn.query(createStockCard, [
        date,
        openingQuantity,
        openingQuantity,
        stock_id,
        "Active",
      ]);
      stockCardId = createStackCardResult.insertId;
    }
    const createStockCardDetails =
      "INSERT INTO tbl_stock_card_details (stock_card_id,transaction_quantity,total_quantity,type,remark) VALUES (?,?,?,?,?)";
    let calculated_quantity: number =
      parseInt(quantity) * parseInt(item_net_weight);
    const total_quantity = parseInt(openingQuantity) - calculated_quantity;
    const [createStockCardDetailsResult]: any = await conn.query(
      createStockCardDetails,
      [stockCardId, calculated_quantity, total_quantity, "OUT", remarks]
    );

    const updateStockCard =
      "UPDATE tbl_stock_card SET closing_quantity=? WHERE stock_card_id=? AND is_exist='true'";
    const [updateStockCardResult]: any = await conn.query(updateStockCard, [
      total_quantity,
      stockCardId,
    ]);
    const updateStock =
      "UPDATE tbl_stock SET total_stocks=? WHERE stock_id=? AND is_exist='true'";
    const [updateStockResult]: any = await conn.query(updateStock, [
      total_quantity,
      stock_id,
    ]);
    await conn.commit();
    return 200;
  } catch (error) {
    console.log(error);
    await conn.rollback();
    return error;
  } finally {
    conn.release();
  }
}
