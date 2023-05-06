import { DateTime } from "luxon";
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
  const { cage_id, pig_id, remarks } = req.body;
  console.log(cage_id, pig_id, remarks);
  const users = await getUsers(authorized.cookie);
  const user_id = users.user_id;
  try {
    const data: any = await UpdateCage(cage_id, pig_id, remarks, user_id);
    if (data) {
      return res
        .status(200)
        .json({ code: 200, message: "Successfully quarantined." });
    } else {
      return res.status(404).json({ code: 404, message: "Create pig first." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: error });
  }
}

async function UpdateCage(
  cage_id: any,
  pig_id: any,
  remarks: any,
  user_id: any
) {
  const conn = await connection.getConnection();
  conn.beginTransaction();
  try {
    const getPigInfo =
      "select * from tbl_pig_history where pig_id=? and is_exist='true' and pig_history_status='active'";
    const [pigInfo]: any = await conn.query(getPigInfo, [pig_id]);
    const pig_tag = pigInfo[0].pig_tag;
    const weight = pigInfo[0].weight;
    const pig_old_cage = pigInfo[0].cage_id;
    const history_id = pigInfo[0].pig_history_id;
    const pig_type = pigInfo[0].pig_type;
    const insertPigHistory =
      "insert into tbl_pig_history (pig_id,cage_id,pig_tag,weight,pig_status,remarks,user_id,pig_type) values (?,?,?,?,?,?,?,?)";
    const [insertPigHistoryResult]: any = await conn.query(insertPigHistory, [
      pig_id,
      cage_id,
      pig_tag,
      weight,
      "Quarantined",
      remarks,
      user_id,
      pig_type,
    ]);

    const updateOldPigHistory =
      "update tbl_pig_history set pig_history_status='inactive' where pig_history_id=?";
    const [updateOldPigHistoryResult]: any = await conn.query(
      updateOldPigHistory,
      [history_id]
    );
    UpdateNewCage(conn, cage_id);
    UpdateOldCage(conn, pig_old_cage);
    InsertQuarantine(conn, pig_id, remarks, user_id, cage_id);

    conn.commit();
    return true;
  } catch (error) {
    console.log(error);
    conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

const UpdateNewCage = async (conn: any, cage_id: any) => {
  try {
    const selectCage = "select * from tbl_cage where cage_id=?";
    const [cage]: any = await conn.query(selectCage, [cage_id]);
    const cage_capacity = cage[0].cage_capacity;
    const current_caged = cage[0].current_caged;
    const updatedCurrentCaged = parseInt(current_caged) + 1;
    if (updatedCurrentCaged <= cage_capacity) {
      const updateCage =
        "update tbl_cage set current_caged=?,is_full='false' where cage_id=?";
      const [updateCageResult]: any = await conn.query(updateCage, [
        updatedCurrentCaged,
        cage_id,
      ]);
    } else if (updatedCurrentCaged >= cage_capacity) {
      const updateCage =
        "update tbl_cage set current_caged=?,is_full='true' where cage_id=?";
      const [updateCageResult]: any = await conn.query(updateCage, [
        updatedCurrentCaged,
        cage_id,
      ]);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const UpdateOldCage = async (conn: any, cage_id: any) => {
  try {
    const updateCage =
      "update tbl_cage set current_caged=`current_caged`-1,is_full='false' where cage_id=?";
    const [updateCageResult]: any = await conn.query(updateCage, [cage_id]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const InsertQuarantine = async (
  conn: any,
  pig_id: any,
  remarks: any,
  user_id: any,
  cage_id: any
) => {
  const Date = DateTime.now().toJSDate();
  const insertQuarantine =
    "insert into tbl_quarantine (remarks,quarantine_date,user_id) values (?,?,?)";
  const [result] = await conn.query(insertQuarantine, [remarks, Date, user_id]);
  const quarantine_id = result.insertId;
  const insertInfo =
    "insert into tbl_quarantine_details (quarantine_id,pig_id,cage_id) values (?,?,?)";
  const [result2] = await conn.query(insertInfo, [
    quarantine_id,
    pig_id,
    cage_id,
  ]);
  return true;
};
