import prisma from "@/server/services/dbManager"
import bcrypt from "bcrypt"

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
            statusCode: 401,
            message: "Invalid credentials",
        }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
        return {
            statusCode: 401,
            message: "Invalid credentials",
        }
    }

    const returnUser = {
        id: user.id,
        username: user.username,
        email: user.email,
    }

    return { status: 200, user: returnUser }
})
