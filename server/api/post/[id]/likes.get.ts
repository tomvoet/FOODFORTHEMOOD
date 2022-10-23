import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const query = getQuery(event)

    const { limit, offset, cursor } = query

    const params: {
        take: number
        skip: number
        cursor?: {
            username_postId: {
                username: string
                postId: number
            }
        }
    } = {
        take: Number(limit) || 10,
        skip: cursor && cursor !== "" ? Number(offset) || 0 : 1,
    }

    if (Number(cursor)) {
        params.cursor = {
            username_postId: {
                username: cursor as string,
                postId: Number(cursor),
            },
        }
    }

    const favorites = await prisma.favorites.findMany({
        where: {
            postId: Number(id),
        },
        select: {
            username: true,
        },
        ...params,
    })

    if (!favorites) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Not found",
                message: "Post not found",
            })
        )
    }

    return favorites
})
