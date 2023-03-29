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
  const { operation_type_id, operation_date, pig_id, item_list } = req.body;
  console.log(item_list);
  const conn = await connection.getConnection();
  try {
    conn.beginTransaction();
    const data: any = await UpdateCage(
      conn,
      operation_type_id,
      operation_date,
      pig_id
    );
    if (data != "") {
      const data2: any = await InsertOperationItemDetail(conn, data, item_list);
      if (data2 == 200) {
        conn.commit();
        return res.status(200).json({ code: 200, message: "Success" });
      } else {
        conn.rollback();
        return res.status(404).json({ code: 404, message: "Failed" });
      }
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
  operation_date: any,
  pig_id: any
) {
  try {
    const insertOperation =
      "insert into tbl_operation (operation_type_id,operation_date,pig_id) values (?,?,?)";
    const [sqlInsertResult]: any = await conn.query(insertOperation, [
      operation_type_id,
      operation_date,
      pig_id,
    ]);
    return sqlInsertResult.insertId;
  } catch (error) {
    console.log(error);
    return error;
  }
}
async function InsertOperationItemDetail(
  conn: any,
  operation_id: any,
  item_list: any
) {
  try {
    await Promise.all(
      item_list.map(async (item: any) => {
        const insertOperationItemDetail =
          "insert into tbl_operation_item_details (operation_id,item_id,quantity) values (?,?,?)";
        const [sqlInsertResult]: any = await conn.query(
          insertOperationItemDetail,
          [operation_id, item.item_id, item.item_quantity]
        );
      })
    );
    return 200;
  } catch (error) {
    console.log(error);
    return error;
  }
}
