import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const limit = query.limit
    const offset = query.offset
    const cursor = query.cursorId

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

    const posts = await prisma.post.findMany({
        ...params,
        select: {
            id: true,
            authorId: true,
            title: true,
            rating: true,
            text: true,
            createdAt: true,
            chosenFood: true,
            updatedAt: true,
            restaurantId: true,
            author: {
                select: {
                    username: true,
                },
            },
            restaurant: {
                select: {
                    name: true,
                },
            },
            comments: {
                select: {
                    id: true,
                    authorId: true,
                    createdAt: true,
                    text: true,
                },
                take: 3,
            },
            favorites: {
                select: {
                    username: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    if (posts === null)
        sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "No posts found",
            })
        )

    return posts
})
