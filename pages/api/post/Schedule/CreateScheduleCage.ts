import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { getUsers } from "pages/api/getUserDetails";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const { cage_id, item_list } = req.body;
  const users = await getUsers(authorized.cookie);
  const user_id = users.user_id;
  const conn = await connection.getConnection();
  try {
    conn.beginTransaction();
    const data: any = await UpdateCage(conn, cage_id, item_list, user_id);
    if (data != "") {
      return res.status(200).json({ code: 200, message: "Success" });
    } else {
      conn.rollback();
      return res.status(404).json({ code: 404, message: "Failed" });
    }
  } catch (error) {
    conn.rollback();
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function UpdateCage(
  conn: any,
  pig_id: any,
  item_list: any,
  user_id: any
) {
  console.log(pig_id);
  try {
    await Promise.all(
      item_list.map(async (item: any) => {
        const selectCageData = "select * from tbl_cage where cage_id=?";
        const [sqlSelectCageResult]: any = await conn.query(selectCageData, [
          pig_id,
        ]);
        const getCageCapacity = sqlSelectCageResult[0].cage_capacity;
        const insertOperation =
          "insert into tbl_operation (operation_type_id,operation_date,cage_id,am_pm,total_patient,user_id) values (?,?,?,?,?,?) ";
        const [sqlInsertResult]: any = await conn.query(insertOperation, [
          item.activity,
          item.start,
          pig_id,
          item.data_time,
          getCageCapacity,
          user_id,
        ]);
        const lastInsertedData = sqlInsertResult.insertId;
        const data2: any = await InsertOperationItemDetail(
          conn,
          item.item_id,
          lastInsertedData
        );
      })
    );
    conn.commit();
    return "something";
  } catch (error) {
    conn.rollback();
    console.log(error);
    return error;
  }
}

async function InsertOperationItemDetail(
  conn: any,
  item_id: any,
  operation_id: any
) {
  try {
    const insertOperationItemDetail =
      "insert into tbl_operation_item_details (operation_id,item_id) values (?,?)";
    const [sqlInsertResult]: any = await conn.query(insertOperationItemDetail, [
      operation_id,
      item_id,
    ]);
    return 200;
  } catch (error) {
    console.log(error);
    return error;
  }
}
