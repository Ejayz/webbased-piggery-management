import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const secret: any = process.env.JWT_KEY

async function verifyJWT(token: any) {
    if (jwt.verify(token, secret)) {
        return true
    } else {
        return false
    }
}

async function decodeJWT(token: any) {
    if (jwt.verify(token, secret)) {
        return jwt.decode(token)
    } else {
        return null
    }
}
async function signJWT(signables: Object) {
    return jwt.sign(signables, secret)
}

export {
    verifyJWT,
    decodeJWT,
    signJWT
}