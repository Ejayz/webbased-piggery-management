import { rejects } from "assert";
import { NextApiRequest, NextApiResponse } from "next";
import connection from "../mysql";
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        res.status(405).json({ code: 405, message: "Post Method not allowed" })
        return 0
    }
    const data = await getUsers(1)
}

async function getUsers(USER_ID: any) {
    return new Promise((resolve, rejects) => {
        const sql = "select * from tbl_users where is_exist='true' and user_id !=?"
        connection.getConnection((err, conn) => {
            if (err) rejects(err)
            conn.query(sql, [USER_ID], (err, result, feilds) => {
                if (err) rejects(err)
                resolve(result)
            })
        })
    })
}

