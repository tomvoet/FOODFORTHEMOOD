import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "../../services/jwt"

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event)

    const token = cookies.refresh_token

    console.log(token)

    if (!token) {
        return {
            statusCode: 401,
            message: "Unauthorized",
        }
    }

    try {
        const decoded = jwt.verify(
            token,
            "testhilfeichwillkeinscretschreibenwassolldasrefresh"
        )

        if (typeof decoded === "object") {
            const user = decoded.data as { username: string }

            setCookie(
                event,
                "refresh_token",
                generateRefreshToken(user.username),
                {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24,
                    sameSite: "strict",
                    secure: true,
                    path: "/api/auth/refresh_token",
                }
            )

            return {
                user: user,
                access_token: generateAccessToken(user.username),
            }
        }
    } catch (err) {
        console.log(err)
        return sendError(
            event,
            createError({
                statusCode: 401,
                message: "Unauthorized, invalid Token",
            })
        )
    }
})
