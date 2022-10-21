import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

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

    const userObj = await prisma.user.findUnique({
        where: {
            username,
        },
        select: {
            username: true,
            email: true,
            bio: true,
            image: true,
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
