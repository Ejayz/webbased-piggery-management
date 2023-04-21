import { DateTime } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

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
    "SELECT COUNT(pig_id) AS total_pig FROM tbl_pig WHERE pig_type='Sow' AND is_exist = 'true'";
  const getBoars =
    "SELECT COUNT(pig_id) AS total_pig FROM tbl_pig WHERE pig_type='Boar' AND is_exist = 'true'";
  const getPiglets =
    "SELECT COUNT(pig_id) AS total_pig FROM tbl_pig WHERE pig_type='Piglet' AND is_exist = 'true'";
  const getTotalFeeds =
    "SELECT *, MAX(tbl_stock_card.stock_card_id) FROM tbl_inventory INNER JOIN tbl_stock_card ON tbl_inventory.item_id = tbl_stock_card.item_id WHERE tbl_inventory.category_id='1' GROUP BY tbl_stock_card.item_id";
  const TotalOperation =
    "SELECT COUNT(operation_id) AS total_operation FROM tbl_operation WHERE is_exist = 'true'";
  const TotalQuarantine =
    "SELECT COUNT(quarantine_id) AS total_quarantine FROM tbl_quarantine WHERE is_exist = 'true'";
  const getTotalPendingOperation = `SELECT COUNT(operation_id) AS totalPendingOperation FROM tbl_operation WHERE tbl_operation.operation_date='2023-04-19' AND tbl_operation.\`status\`='pending'`;
  const TotalUser = "select max(user_id) as total_user from tbl_users where is_exist='true'";
  const getTotalLowLvl="SELECT COUNT(*) AS totalLowLvl, s.*, i.*, (s.closing_quantity / i.item_net_weight) AS stock_density FROM tbl_stock_card s INNER JOIN tbl_inventory i ON s.item_id = i.item_id WHERE i.is_exist='true' and (s.closing_quantity / i.item_net_weight) <= 5 AND s.transaction_date = ( SELECT MAX(transaction_date) FROM tbl_stock_card WHERE item_id = s.item_id )  GROUP BY s.item_id ORDER BY s.stock_card_id DESC LIMIT 1000 OFFSET 0"
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
console.log(totalLowLvl)
  const data = {
    sows: sows[0].total_pig,
    boars: boars[0].total_pig,
    piglets: piglets[0].total_pig,
    totalFeed: totalFeed,
    totalOperation: totalOperation[0].total_operation,
    totalQuarantine: totalQuarantine[0].total_quarantine,
    totalUser: totalUser[0].total_user,
    totalPendingOperation: totalPendingOperation[0].totalPendingOperation,
    totalLowLvl: totalLowLvl[0].totalLowLvl,
  };
  return data;
}
