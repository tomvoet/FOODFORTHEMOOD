import { prisma } from "@/server/services/dbManager"
import { reducePosts } from "~~/server/services/reducePost"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const { user }: { user?: { username: string } } = event.context

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
                    favorites: {
                        where: {
                            username: user?.username || "",
                        },
                        select: {
                            username: true,
                        },
                    },
                    _count: {
                        select: {
                            favorites: true,
                            comments: true,
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

    const posts = reducePosts(postList.posts)

    return posts
})
