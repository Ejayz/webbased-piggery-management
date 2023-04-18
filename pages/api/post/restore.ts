import { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandlerFormData";
import connection from "pages/api/mysql";
import fs from "fs";
const Importer = require("mysql-import");
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const data: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  console.log(data);
  if (data.files.sql_file.mimetype !== "application/octet-stream") {
    return res
      .status(500)
      .json({ code: 500, message: "Invalid file type .sql file only" });
  }

  fs.writeFileSync(
    "./pages/api/post/sql_dump.sql",
    fs.readFileSync(data.files.sql_file.filepath, "utf8"),
    "utf8"
  );
  const conn = await connection.getConnection();
  await conn.query(" DROP DATABASE IF EXISTS `piggery_management`;");
  conn.release();
  const exc = await UpdateCage(data.files.sql_file.filepath);
  if (exc) {
    return res
      .status(200)
      .json({ code: 200, message: "Successfully restored database" });
  } else {
    return res.status(500).json({ code: 500, message: "Something went wrong" });
  }
}

async function UpdateCage(file: any) {
  return new Promise((resolve, reject) => {
    const importer = new Importer({
      host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
      user: process.env.DB_USER ? process.env.DB_USER : "root",
      password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "",
    });

    importer.onProgress((progress: any) => {
      var percent =
        Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) /
        100;
      console.log(`${percent}% Completed`);
    });

    importer
      .import("./sql_dump.sql")
      .then(() => {
        var files_imported = importer.getImported();
        console.log(`${files_imported.length} SQL file(s) imported.`);
        resolve(true);
      })

      .catch((err: any) => {
        reject(err);
        throw err;
      });
  });
}
