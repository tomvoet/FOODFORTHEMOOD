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

    const postList = await prisma.restaurant.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            posts: {
                ...params,
                select: {
                    id: true,
                    title: true,
                    text: true,
                    rating: true,
                    chosenFood: true,
                    createdAt: true,
                    restaurantId: true,
                    authorId: true,
                    updatedAt: true,
                    favorites: {
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
                    author: {
                        select: {
                            username: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    })

    if (!postList) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "No posts found",
            })
        )
    }

    const posts = postList?.posts

    return { status: 200, posts }
})
