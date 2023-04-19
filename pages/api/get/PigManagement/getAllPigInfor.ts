import { DateTime } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

interface date_range {
  from: Date;
  to: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
  try {
    const { pig_id }: any = req.query;

    const rows = await UpdateCage(pig_id);

    res.status(200).json({ code: 200, data: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function UpdateCage(pig_id: any) {
  const conn = await connection.getConnection();
  try {
    let datas: any = {
      pig_history: [],
      individual: [],
      cage: [],
      batch: [],
    };

    const [rows, fields]: any = await conn.query(
      `SELECT * FROM tbl_pig INNER JOIN tbl_pig_history ON tbl_pig.pig_id=tbl_pig_history.pig_id INNER JOIN tbl_breed ON tbl_breed.breed_id=tbl_pig.breed_id INNER JOIN tbl_cage ON tbl_cage.cage_id = tbl_pig_history.cage_id INNER JOIN tbl_batch ON tbl_batch.batch_id = tbl_pig.batch_id WHERE tbl_pig.pig_id=? ORDER BY tbl_pig_history.pig_history_id DESC `,
      [pig_id]
    );
    const [rows2] = await conn.query(
      "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id = tbl_operation_item_details.operation_id INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id = tbl_operation.operation_type_id WHERE tbl_operation.pig_id=?",
      [pig_id]
    );

    const rangeofdate = getRanges(rows);
    let getCage =
      "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id = tbl_operation_item_details.operation_id INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id = tbl_operation.operation_type_id INNER JOIN tbl_cage ON tbl_cage.cage_id =tbl_operation.cage_id WHERE ";

    rangeofdate.map((data: date_range, index: number) => {
      if (index != rangeofdate.length - 1) {
        getCage =
          getCage +
          "(tbl_operation.operation_date BETWEEN '" +
          DateTime.fromJSDate(data.from).toISO() +
          "' AND '" +
          DateTime.fromJSDate(data.to).toISO() +
          "') OR ";
      } else {
        getCage =
          getCage +
          "(tbl_operation.operation_date BETWEEN '" +
          DateTime.fromJSDate(data.from).toISO() +
          "' AND '" +
          DateTime.fromJSDate(data.to).toISO() +
          "')  ";
      }
    });

    console.log(getCage);
    const [rows3] = await conn.query(getCage);

    const [rows4] = await conn.query(
      "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id = tbl_operation_item_details.operation_id INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id = tbl_operation.operation_type_id INNER JOIN tbl_batch ON tbl_batch.batch_id =tbl_operation.batch_id WHERE  tbl_batch.batch_id=?",
      [rows[0].batch_id]
    );

    datas = {
      pig_history: rows,
      individual: rows2,
      cage: rows3,
      batch: rows4,
    };

    return datas;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}

function getRanges(data: any) {
  let ranges: date_range[] = [];

  let prev: Date = DateTime.now().toJSDate();
  const baseDate = DateTime.now().toJSDate();
  data.map((datas: any, index: any) => {
    if (prev == baseDate) {
      prev = datas.created_at;
    } else if (index == data.length - 1) {
      ranges.push({
        from: datas.created_at,
        to: DateTime.now().toJSDate(),
      });
    } else {
      ranges.push({
        from: datas.created_at,
        to: prev,
      });
      prev = datas.created_at;
    }
  });

  return ranges;
}
