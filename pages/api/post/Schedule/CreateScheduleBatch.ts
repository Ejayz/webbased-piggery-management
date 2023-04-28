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
  const { cage_id, item_list } = req.body;
  console.log(item_list);
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
  try {
    await Promise.all(
      item_list.map(async (item: any) => {
        const selectData = "select * from tbl_batch where batch_id=?";
        const [sqlSelectResult]: any = await conn.query(selectData, [pig_id]);
        const getBatchCapacity = sqlSelectResult[0].batch_capacity;
        const insertOperation =
          "insert into tbl_operation (operation_type_id,operation_date,batch_id,am_pm,total_patient,user_id,description) values (?,?,?,?,?,?,?) ";
        const [sqlInsertResult]: any = await conn.query(insertOperation, [
          item.activity,
          item.start,
          pig_id,
          item.data_time,
          getBatchCapacity,
          user_id,
          item.description,
        ]);
        const lastInsertedData = sqlInsertResult.insertId;
        if (item.items !== undefined) {
          const data2: any = await InsertOperationItemDetails(
            conn,
            item.items,
            lastInsertedData
          );
        } else {
          const data2: any = await InsertOperationItemDetail(
            conn,
            item.item_id,
            lastInsertedData
          );
        }
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

async function InsertOperationItemDetails(
  conn: any,
  items: any,
  operation_id: any
) {
  try {
    await Promise.all(
      items.map(async (item: any) => {
        const insertOperationItemDetail =
          "insert into tbl_operation_item_details (operation_id,item_id) values (?,?)";
        const [sqlInsertResult]: any = await conn.query(
          insertOperationItemDetail,
          [operation_id, item.item_id]
        );
      })
    );

    return 200;
  } catch (error) {
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
