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
  const {
    batch_id,
    boar_id,
    sow_id,
    pig_type,
    birth_date,
    breed_id,
    batch_name,
    pigData,
  } = req.body;
  const data = await Ops(
    batch_id,
    boar_id,
    sow_id,
    pig_type,
    birth_date,
    breed_id,
    pigData,
    batch_name
  );
  if (data == 200) {
    return res.status(200).json({ code: 200, message: "Pigs Created" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server error.Something went wrong." });
  }
}

async function Ops(
  batch_id: any,
  boar_id: any,
  sow_id: any,
  pig_type: any,
  birth_date: any,
  breed_id: any,
  pigData: any,
  batch_name: any
) {
  const conn = await connection.getConnection();
  conn.beginTransaction();
  try {
    let batch_capacity = pigData.length;
    const insertBatch =
      "insert into tbl_batch (batch_id,batch_name,boar_id,sow_id,batch_capacity) values(?,?,?,?,?)";
    await conn.query(insertBatch, [
      batch_id,
      batch_name,
      boar_id,
      sow_id,
      batch_capacity,
    ]);
    pigData.map(async (value: any, key: number) => {
      const insertPig =
        "insert into tbl_pig (pig_id,cage_id,batch_id,breed_id,pig_tag,pig_type,birthdate,weight) values(?,?,?,?,?,?,?,?)";
      await conn.query(insertPig, [
        value.pig_id,
        value.cage_id,
        batch_id,
        breed_id,
        value.pig_tag,
        pig_type,
        birth_date,
        value.weight,
      ]);
    });
    conn.commit();
    conn.release();
    return 200;
  } catch (error) {
    console.log(error);
    conn.rollback();
    conn.release;
    return 500;
  }
}
