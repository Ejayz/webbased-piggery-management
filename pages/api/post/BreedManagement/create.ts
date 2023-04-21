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
  const { breed_name } = req.body;
  const users = await getUsers(authorized.cookie);
  const user_id = users.user_id;

  const dups: any = await checkDups(breed_name);
  if (dups.length != 0) {
    return res
      .status(409)
      .json({ code: 409, message: "Breed name already exist" });
  }

  const data: any = await CreateBreed(breed_name, user_id);
  if (data.affectedRows != 0) {
    return res.status(200).json({ code: 200, message: "New breed created" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error ,Something went wrong." });
  }
}

async function CreateBreed(breed_name: string, user_id: any) {
  const conn = await connection.getConnection();
  try {
    const sql = "insert into tbl_breed  (`breed_name`,user_id) values (?,?)";
    const [err, result] = await conn.query(sql, [breed_name, user_id]);
    conn.release();
    if (err) return err;
    return err;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
async function checkDups(breed_name: string) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "select * from tbl_breed where breed_name=? and is_exist='true'";
    const [err, result] = await conn.query(sql, [breed_name]);
    conn.release();
    if (err) return err;
    return err;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
