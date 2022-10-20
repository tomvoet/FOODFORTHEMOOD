import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    const { id } = event.context.params

    const { user } = event.context

    const { authorId } = body

    if (authorId === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "authorId is required",
            })
        )
    }

    if (user.username !== authorId)
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
                message: "You are not authorized to delete this post",
            })
        )

    const post = await prisma.post.delete({
        where: {
            id: Number(id),
        },
    })

    if (!post)
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "Post not found",
            })
        )

    return { deleted: true }
})
