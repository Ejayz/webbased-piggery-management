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
  const { operation_type_id, cage_id, item_list } = req.body;
  console.log(item_list);
  const conn = await connection.getConnection();
  try {
    conn.beginTransaction();
    const data: any = await UpdateCage(
      conn,
      operation_type_id,
      cage_id,
      item_list
    );
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
  operation_type_id: any,
  pig_id: any,
  item_list: any
) {
  try {
    await Promise.all(
      item_list.map(async (item: any) => {
        if (item.operation_id == 1) {
          const insertOperation =
            "insert into tbl_operation (operation_type_id,operation_date,batch_id,am_pm) values (?,?,?,'AM') ";
          const [sqlInsertResult]: any = await conn.query(insertOperation, [
            item.operation_id,
            item.operation_date,
            pig_id,
          ]);
          const lastInsertedData = sqlInsertResult.insertId;
          const data2: any = await InsertOperationItemDetail(
            conn,

            item.item_id,
            item.operation_id,
            lastInsertedData
          );

          const insertOperationPM =
            "insert into tbl_operation (operation_type_id,operation_date,batch_id,am_pm) values (?,?,?,'PM') ";
          const [sqlInsertResultPM]: any = await conn.query(insertOperationPM, [
            item.operation_id,
            item.operation_date,
            pig_id,
          ]);
          const lastInsertedDataPM = sqlInsertResultPM.insertId;
          const data2PM: any = await InsertOperationItemDetail(
            conn,
            item.item_id,
            item.operation_id,
            lastInsertedDataPM
          );
        } else {
          const insertOperation =
            "insert into tbl_operation (operation_type_id,operation_date,batch_id) values (?,?,?) ";
          const [sqlInsertResult]: any = await conn.query(insertOperation, [
            item.operation_id,
            item.operation_date,
            pig_id,
          ]);
          const lastInsertedData = sqlInsertResult.insertId;
          const data2: any = await InsertOperationItemDetail(
            conn,
            item.item_id,
            item.operation_id,
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
async function InsertOperationItemDetail(
  conn: any,
  item_id: any,
  item_quantity: any,
  operation_id: any
) {
  try {
    const insertOperationItemDetail =
      "insert into tbl_operation_item_details (operation_id,item_id) values (?,?)";
    const [sqlInsertResult]: any = await conn.query(insertOperationItemDetail, [
      operation_id,
      item_id,
      item_quantity,
    ]);
    return 200;
  } catch (error) {
    console.log(error);
    return error;
  }
}
