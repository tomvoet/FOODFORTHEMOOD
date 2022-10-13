import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const query = useQuery(event)

    const limit = query.limit
    const offset = query.offset
    const cursor = query.cursorId

    const params = {
        take: Number(limit) || 10,
        cursor: {
            id: Number(cursor),
        },
        skip: !Number(cursor) ? Number(offset) || 0 : 1,
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
                message: "Post not found",
            })
        )
    }

    return post.comments
})
