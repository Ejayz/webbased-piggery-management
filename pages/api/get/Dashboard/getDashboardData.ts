import { DateTime } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { connection } from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
  const data = await UpdateCage();
  res.status(200).json({ code: 200, data: data });
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  const getSows =
    "SELECT COUNT(pig_id) AS total_pig FROM tbl_pig_history WHERE pig_type='Sow' AND pig_history_status = 'active'";
  const getBoars =
    "SELECT COUNT(pig_id) AS total_pig FROM tbl_pig_history WHERE pig_type='Boar' AND pig_history_status = 'active'";
  const getPiglets =
    "SELECT COUNT(pig_id) AS total_pig FROM tbl_pig_history WHERE pig_type='Piglet' AND pig_history_status = 'active'";
  const getTotalFeeds =
    "SELECT *, MAX(tbl_stock_card.stock_card_id) FROM tbl_inventory INNER JOIN tbl_stock_card ON tbl_inventory.item_id = tbl_stock_card.item_id WHERE tbl_inventory.category_id='1' GROUP BY tbl_stock_card.item_id";
  const TotalOperation =
    "SELECT COUNT(operation_id) AS total_operation FROM tbl_operation WHERE is_exist = 'true'";
  const TotalQuarantine =
    "SELECT COUNT(quarantine_id) AS total_quarantine FROM tbl_quarantine WHERE is_exist = 'true'";
  const getTotalPendingOperation = `SELECT COUNT(operation_id) AS totalPendingOperation FROM tbl_operation WHERE tbl_operation.operation_date=CURDATE() AND tbl_operation.\`status\`='pending'`;
  const TotalUser = "select * from tbl_users where is_exist='true'";
  const getTotalLowLvl =
    "SELECT tbl_category.*,tbl_inventory.*, tbl_stock_card.*,FORMAT((tbl_stock_card.closing_quantity / tbl_inventory.item_net_weight), 2) AS item_left FROM tbl_inventory   INNER JOIN tbl_category ON tbl_inventory.category_id=tbl_category.category_id   INNER JOIN (        SELECT item_id, MAX(transaction_date) AS max_date        FROM tbl_stock_card        GROUP BY item_id      ) AS latest ON tbl_inventory.item_id = latest.item_id INNER JOIN tbl_stock_card ON tbl_stock_card.item_id = latest.item_id AND tbl_stock_card.transaction_date = latest.max_date  WHERE tbl_inventory.is_exist = 'true' AND  FORMAT((tbl_stock_card.closing_quantity / tbl_inventory.item_net_weight), 2)<=5";
  const ExpiredItem = "select * from tbl_stock_card where closing_quantity=0";
  const getExpiredItem =
    "SELECT * FROM tbl_stock_card_details WHERE expiration_date=CURDATE() AND is_exist='true'";
  const [expiredItem]: any = await conn.query(getExpiredItem);
  const [sows]: any = await conn.query(getSows);
  const [boars]: any = await conn.query(getBoars);
  const [piglets]: any = await conn.query(getPiglets);
  const [totalFeeds]: any = await conn.query(getTotalFeeds);
  const [totalPendingOperation]: any = await conn.query(
    getTotalPendingOperation,
    [DateTime.now().toISODate()]
  );
  console.log(DateTime.now().toISODate());
  let totalFeed = 0;
  totalFeeds.forEach((feed: any) => {
    totalFeed = feed.closing_quantity + totalFeed;
  });
  const [totalOperation]: any = await conn.query(TotalOperation);
  const [totalQuarantine]: any = await conn.query(TotalQuarantine);
  const [totalUser]: any = await conn.query(TotalUser);
  const [totalLowLvl]: any = await conn.query(getTotalLowLvl);

  const data = {
    sows: sows[0].total_pig,
    boars: boars[0].total_pig,
    piglets: piglets[0].total_pig,
    totalFeed: totalFeed,
    totalOperation: totalOperation[0].total_operation,
    totalQuarantine: totalQuarantine[0].total_quarantine,
    totalUser: totalUser.length,
    totalPendingOperation: totalPendingOperation[0].totalPendingOperation,
    totalLowLvl: totalLowLvl.length,
    expiredItem: expiredItem.length,
  };
  return data;
}
