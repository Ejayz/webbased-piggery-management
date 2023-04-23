import { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandlerFormData";
import connection from "pages/api/mysql";
import fs from "fs";
const Importer = require("mysql-import");

const host = process.env.HOST;
const port = process.env.PORT;
const user = process.env.USERS;
const password = process.env.PASSWORD;

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
  try {
    const conn = await connection.getConnection();
    const [result] = await conn.query("DROP DATABASE `piggery_management`;");
    console.log(result);
    conn.release();
    const exc = await UpdateCage(data.files.sql_file.filepath);
    console.log(exc);
    if (exc) {
      fs.unlink("./pages/api/post/sql_dump.sql", (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      return res
        .status(200)
        .json({ code: 200, message: "Successfully restored database" });
    } else {
      return res
        .status(500)
        .json({ code: 500, message: "Something went wrong" });
    }
  } catch (error: any) {
    console.log(error);
    const exc = await UpdateCage(data.files.sql_file.filepath);
    if (exc) {
      fs.unlink("./pages/api/post/sql_dump.sql", (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      return res
        .status(200)
        .json({ code: 200, message: "Successfully restored database" });
    } else {
      return res
        .status(500)
        .json({ code: 500, message: "Something went wrong" });
    }
  }
}

async function UpdateCage(file: any) {
  return new Promise((resolve, reject) => {
    const importer = new Importer({
      host: host,
      user: user,
      password: password,
      port: port,
    });

    importer.onProgress((progress: any) => {
      var percent =
        Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) /
        100;
      console.log(`${percent}% Completed`);
    });

    importer
      .import("./pages/api/post/sql_dump.sql")
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
