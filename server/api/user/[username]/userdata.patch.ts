import { prisma } from "@/server/services/dbManager"
import bcrypt from "bcrypt"

const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

    const { email, bio, password, image } = await useBody(event)

    const { user }: { user?: { username: string } } = event.context

    if (!user || user.username !== username) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                message: "Unauthorized",
                statusMessage: "Unauthorized",
            })
        )
    }

    const params: {
        email?: string
        bio?: string
        password_hash?: string
        image?: string
    } = {}

    if (email) {
        params.email = email
    }

    if (bio) {
        params.bio = bio
    }

    if (password) {
        params.password_hash = await hashPassword(password)
    }

    if (image) {
        params.image = image
    }

    const userObj = await prisma.user.update({
        where: {
            username,
        },
        data: {
            ...params,
        },
        select: {
            username: true,
            email: true,
            bio: true,
        },
    })

    if (!userObj) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                message: "User not found",
                statusMessage: "User not found",
            })
        )
    }

    return userObj
})
