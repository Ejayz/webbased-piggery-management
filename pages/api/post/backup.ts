import { DateTime } from "luxon";
import mysqldump from "mysqldump";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";
const fs = require("fs");
const AdmZip = require("adm-zip");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
  res.setHeader(`Content-Type`, `application/zip`);
  res.setHeader(
    `Content-Disposition`,
    `attachment; filename=${DateTime.now()}.zip`
  );
  const db = await UpdateCage();
  try {
    const buildDb = ` SET FOREIGN_KEY_CHECKS=0;
    SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
    START TRANSACTION;
    SET time_zone = "+00:00";
    /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
    /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
    /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
    /*!40101 SET NAMES utf8mb4 */;
    --
    -- Database: \`piggery_management\`
    --
    DROP DATABASE IF EXISTS \`piggery_management\`;
    CREATE DATABASE IF NOT EXISTS \`piggery_management\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    USE \`piggery_management\`;
     ${db.dump.schema} ${db.dump.data}`;
    const zip = new AdmZip();

    zip.addFile(`${DateTime.now()}.sql`, Buffer.from(`${buildDb}`, `utf8`), ``);
    return res.send(zip.toBuffer());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Something went wrong" });
  }
}

async function UpdateCage() {
  const result = await mysqldump({
    connection: {
      host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
      user: process.env.DB_USER ? process.env.DB_USER : "root",
      password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "randomDdos1.com",
      database: process.env.DB_DATABASE
        ? process.env.DB_DATABASE
        : "piggery_management",
    },
    dump: { schema: { table: { dropIfExist: true } } },
  });
  return result;
}
