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
                message: "authorId is required",
            })
        )
    }

    if (user.username !== authorId)
        return sendError(
            event,
            createError({
                statusCode: 401,
                message: "You can only delete your own posts",
            })
        )

    const post = await prisma.post.delete({
        where: {
            id: Number(id),
        },
    })

    console.log("POSTxd", post)

    if (!post)
        return sendError(
            event,
            createError({ statusCode: 400, message: "Post not found" })
        )

    return { deleted: true }
})
