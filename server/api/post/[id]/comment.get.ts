import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const query = getQuery(event)

    const { limit, offset, cursor } = query

    const params: {
        take: number
        skip: number
        cursor?: {
            id: number
        }
    } = {
        take: Number(limit) || 10,
        skip: !Number(cursor) ? Number(offset) || 0 : 1,
    }

    if (Number(cursor)) {
        params.cursor = {
            id: Number(cursor),
        }
    }

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            comments: {
                select: {
                    id: true,
                    authorId: true,
                    createdAt: true,
                    text: true,
                },
                ...params,
            },
        },
    })

    if (!post) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Not found",
                message: "Post not found",
            })
        )
    }

    return post.comments
})
