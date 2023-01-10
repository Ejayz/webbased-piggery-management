import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, username, password }: any = req.body;
  console.log({ phone, username, password });
  generateHased(password).then((hashedPass) => {
    resetPassword(phone, username, hashedPass).then((result: any) => {
      const affectedRow = result.update_piggery_tbl_users.affected_rows;
      if (affectedRow == 1) {
        return res.status(200).json({
          code: 200,
          message: "Password was reset successfully .Login now!",
        });
      } else {
        return res
          .status(500)
          .json({ code: 500, message: "Server error.Something went wrong." });
      }
    });
  });
}

async function resetPassword(
  phone: string,
  username: string,
  password: string
) {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "x-hasura-admin-secret": "randomDdos1.com",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    username: username,
    phone: phone,
    password: password,
  });

  let response = await fetch("http://localhost:8080/api/rest/resetpassword", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  return JSON.parse(data);
}

async function generateHased(password: string) {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
