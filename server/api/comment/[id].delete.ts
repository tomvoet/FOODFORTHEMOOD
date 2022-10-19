import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const { user } = event.context

    const comment = await prisma.comment.findUnique({
        where: {
            id: Number(id),
        },
    })

    if (comment?.authorId !== user.username) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
                message: "You are not authorized to delete this comment",
            })
        )
    }

    await prisma.comment.delete({
        where: {
            id: Number(id),
        },
    })

    return {
        status: 200,
        message: "Comment deleted",
    }
})
