import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            username: true,
            bio: true,
        },
    })

    if (!user) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "User not found",
            })
        )
    }

    return user
})
