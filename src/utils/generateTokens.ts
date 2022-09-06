import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "uv23adfn!$*fds8";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "afbd732NDOs234";


export const createAccessToken = (id: string) => {
    return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
        expiresIn: '30m',
    })
}

export const createRefreshToken = (id: string) => {
    return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
        expiresIn: '30d',
    })
}
