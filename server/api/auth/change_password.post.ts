import { prisma } from "@/server/services/dbManager"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const { password } = body
    const token = event.req.headers["authorization"]?.split(" ")[1]
    if (!token) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                message: "No token provided.",
            })
        )
    }
    const decoded = jwt.verify(
        token,
        "testhilfeichwillkeinscretschreibenwassolldascooler"
    )
    if (typeof decoded === "object") {
        const user = decoded.data as { email: string }
        const email = user.email
        const password_hash = await hashPassword(password)
        const userNew = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                password_hash: password_hash,
            },
        })
        return userNew
    } else {
        return sendError(
            event,
            createError({
                statusCode: 404,
                message: "Invalid token.",
            })
        )
    }
})
