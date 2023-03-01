import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = [1, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30];
  let newDate = new Date();
  let exported: any = [];
  data.map((days: any, key: number) => {
    let addedDate = moment(newDate).add(days, "days").format("MMMM Do YYYY");
    exported.push(addedDate);
  });
  return res.send(exported);
}
