import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id: postId, username } = event.context.params

    const { user } = event.context

    if (!postId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "postId is required",
            })
        )

    if (username !== user.username)
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
                message: "You are not authorized to delete a favorite",
            })
        )

    const favorite = await prisma.favorites.delete({
        where: {
            username_postId: {
                username,
                postId: Number(postId),
            },
        },
    })

    if (!favorite)
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal server error",
                message: "Something went wrong",
            })
        )

    return favorite
})
