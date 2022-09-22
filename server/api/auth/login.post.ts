import prisma from "@/server/services/dbManager"
import bcrypt from "bcrypt"
import { generateAccessToken } from "@/server/services/jwt"

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const { username, password } = body

    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    })

    if (!user) {
        return {
            status: 401,
            message: "Invalid credentials",
            user: null,
        }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
        return {
            status: 401,
            message: "Invalid credentials",
            user: null,
        }
    }

    const token = generateAccessToken(user.username)

    const returnUser = {
        id: user.id,
        username: user.username,
    }

    return { status: 200, user: returnUser, token }
})
