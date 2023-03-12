import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandlerFormData";
import connection from "pages/api/mysql";
import fileHandler from "pages/api/fileHandler";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  // const authorization = await authorizationHandler(req, res, "POST");
  // if (!authorization) {
  //   return false;
  // }
  const data: any = await fileHandler(req);

  if (data !== false) {
    const filePath: any = data.filePath;
    const details = JSON.parse(data.fields.details);
    const reorder_id = data.fields.reorder_id;
    const returned = await Confirm(reorder_id, details, filePath);
    if (returned == 200) {
      return res.status(200).json({
        code: 200,
        message: "Reorder list was successfully confirmed",
      });
    } else {
      return res.status(500).json({
        code: 500,
        message: "500 Server Error . Something went wrong.",
      });
    }
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "Error Uploading attachment." });
  }
}

async function Confirm(reorder_id: any, details: any, file_path: any) {
  const conn = await connection.getConnection();
  try {
    await conn.beginTransaction();
    const updateTblReorder =
      "update tbl_reorder set status='confirmed' , attached_docs=? where reorder_id=? and is_exist='true'";
    console.log(await conn.query(updateTblReorder, [file_path, reorder_id]));
    for (let i = 0; i < details.length; i++) {
      const sql =
        "update tbl_reorder_details set confirmed_quantity=? where is_exist='true' and reorder_details_id=?";

      await conn.query(sql, [
        details[i].confirm_reorder,
        details[i].reorder_detail_id,
      ]);

      const getCurrentStock =
        "select * from tbl_inventory where is_exist='true' and item_id=?";
      const [result]: any = await conn.query(getCurrentStock, [
        details[i].item_id,
      ]);
      let currentStocks: any = result[0].item_quantity;
      let updatedStocks =
        currentStocks + details[i].item_net_weight * details[i].confirm_reorder;

      const updateStocks =
        "update tbl_inventory set item_quantity=? where item_id=? and is_exist='true' ";
      await conn.query(updateStocks, [updatedStocks, details[i].item_id]);
      console.log(currentStocks);
      console.log(updatedStocks);
    }
    await conn.commit();
    conn.release();
    return 200;
  } catch (err) {
    console.log(err);
    await conn.rollback();
    await conn.release();
    return 500;
  }
}
