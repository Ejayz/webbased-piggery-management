import { DateTime } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import {connection} from "pages/api/mysql";

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
  const getTotalPendingOperation = `SELECT COUNT(operation_id) AS totalPendingOperation FROM tbl_operation WHERE tbl_operation.operation_date='2023-04-19' AND tbl_operation.\`status\`='pending'`;
  const TotalUser = "select * from tbl_users where is_exist='true'";
  const getTotalLowLvl =
    "SELECT MAX(transaction_date),tbl_stock_card.*,(tbl_stock_card.closing_quantity / tbl_inventory.item_net_weight) AS stock_density FROM tbl_stock_card INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_stock_card.item_id WHERE (tbl_stock_card.closing_quantity / tbl_inventory.item_net_weight) <=5 GROUP BY tbl_inventory.item_id and tbl_inventory.is_exist='true'";
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
  console.log(totalLowLvl);
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
  };
  return data;
}
