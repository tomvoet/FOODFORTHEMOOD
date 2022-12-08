import { prisma } from "../../services/dbManager"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../services/jwt"
import { readBody } from "h3"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, password } = body

    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    })

    if (!user) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
                message: "Invalid username or password",
            })
        )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
                message: "Invalid username or password",
            })
        )
    }

    const access_token = generateAccessToken(user.username)
    const refresh_token = generateRefreshToken(user.username)

    const returnUser = {
        username: user.username,
    }

    setCookie(event, "refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        secure: true,
        path: "/api/auth/refresh_token",
    })

    return { user: returnUser, access_token }
})
