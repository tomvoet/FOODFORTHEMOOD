import jwt from "jsonwebtoken"
import { readBody } from "h3"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username } = body

    const token = event.req.headers["authorization"]?.split(" ")[1]
    if (!token) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                message: "Unauthorized, no token provided",
                statusMessage: "Unauthorized",
            })
        )
    }

    try {
        const decoded = jwt.verify(
            token,
            "testhilfeichwillkeinscretschreibenwassolldas"
        )

        if (typeof decoded === "object") {
            if (decoded.data.username === username) {
                deleteCookie(event, "refresh_token", {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24,
                    sameSite: "strict",
                    secure: true,
                    path: "/api/auth/refresh_token",
                })

                console.log("logout", username)

                return {
                    success: true,
                }
            } else {
                return sendError(
                    event,
                    createError({
                        statusCode: 401,
                        message: "Unauthorized, invalid Token",
                        statusMessage: "Unauthorized",
                    })
                )
            }
        }
    } catch (err) {
        console.log(err)
        return sendError(
            event,
            createError({
                statusCode: 401,
                message: "Unauthorized, invalid Token",
                statusMessage: "Unauthorized",
            })
        )
    }
})
