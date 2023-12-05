import jwt from "jsonwebtoken"

const DEFAULT_SIGN_OPTION = {
    expiresIn: "1h"
}

const secret_key = process.env.NEXTAUTH_SECRET

export function signJwtAccessToken(payload, options = DEFAULT_SIGN_OPTION) {
    const token = jwt.sign(payload, secret_key, options)
    return token
}

export function verifyJwt(token) {
    try {
        const decoded = jwt.verify(token, secret_key)
        return decoded
    }
    catch(err) {
        console.log(err)
        return null
    }
}