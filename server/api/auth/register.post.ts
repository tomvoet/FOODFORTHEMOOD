import { prisma } from "@/server/services/dbManager"
import bcrypt from "bcrypt"

const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const { username, email, password } = body

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
