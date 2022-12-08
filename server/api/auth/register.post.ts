import { prisma } from "@/server/services/dbManager"
import bcrypt from "bcrypt"
import { createZodError } from "~~/server/services/createZodError"
import { userSchema } from "~~/utils/validation_schemas"
import { readBody } from "h3"

const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function validatePassword(password: string): boolean {
    const regexp = new RegExp(
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/
    )

    return regexp.test(password)
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, email, password } = body

    if (username === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "username is required",
            })
        )
    }

    if (email === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "email is required",
            })
        )
    }

    if (password === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "password is required",
            })
        )
    }

    try {
        userSchema.partial().parse({ username, email, password })
    } catch (e) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: createZodError(e),
                data: createZodError(e),
            })
        )
    }

    if (!validatePassword(password)) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                message:
                    "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
                data: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
            })
        )
    }

    const password_hash = await hashPassword(password)

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password_hash,
        },
    })

    if (!user) {
        return {
            statusCode: 500,
            body: "Internal Server Error",
        }
    }

    const returnUser = {
        username: user.username,
    }

    return { status: 200, user: returnUser }
})
