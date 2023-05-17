import { DateTime } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { signJWT, verifyJWT } from "pages/api/jwtProcessor";
import {connection} from "pages/api/mysql";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twillioPhone = process.env.TWILIO_PHONE_NUMBER;
import * as twilio from "twilio";
import * as dotenv from "dotenv";
dotenv.config();
const client = new twilio.Twilio(accountSid, authToken);
const jwt_secret: any = process.env.JWT_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.authorization == undefined) {
    return res.status(401).send("Unauthorized");
  }
  const Bearer = req.headers.authorization?.split(" ")[1];
  const token: string | boolean = await verifyJWT(Bearer);
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  const rows = await UpdateCage();
  await Promise.all(
    rows.map(async (row: any) => {
      const data = await NotifySchedule(
        row.phone,
        row.username,
        row.formatted_date,
        row.cage_name
      );
      console.log(data);
    })
  );
  return res.send("ok");
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  try {
    const now = DateTime.now().setZone("Asia/Manila").toJSDate();
    const threeDays = DateTime.now().setZone("Asia/Manila").plus({ days: 3 }).toJSDate();
    const data =
      "SELECT * ,DATE_FORMAT(tbl_operation.operation_date, '%W %M %e %Y') AS 'formatted_date' FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id = tbl_operation_item_details.operation_id INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id = tbl_operation.operation_type_id INNER JOIN tbl_users ON tbl_users.user_id=tbl_operation.user_id INNER JOIN tbl_cage ON tbl_cage.cage_id =tbl_operation.cage_id WHERE (operation_date=DATE(?) OR operation_date=date(?)) and status='today' GROUP BY tbl_operation.user_id";
    const [rows]: any = await conn.query(data, [now, threeDays]);
    return rows;
  } catch (error) {
    return error;
  } finally {
    conn.release();
  }
}
async function NotifySchedule(
  phone: any,
  username: any,
  schedule: any,
  patient: any
) {
  let sms = {};
  let completePhone = `+63${phone}`;
  const data = await client.messages.create({
    body: `Hi ${username},This is scheduled operation notification alert! You have a schedule on ${schedule} with  ${patient}. Make sure to check other scheduled operations. Thank you!`,
    from: twillioPhone,
    to: completePhone,
  });

  // const data = { status: "sent" };
  if (data.status === "queued" || data.status === "sent") {
    return {
      status: 200,
      data: data,
    };
  } else {
    return {
      status: data.status,
      data: data,
    };
  }
}
