import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

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
        skip: !Number(cursor) ? Number(offset) || 0 : 1,
    }

    if (Number(cursor)) {
        params.cursor = {
            username_postId: {
                username: username,
                postId: Number(cursor),
            },
        }
    }

    const favorites = await prisma.favorites.findMany({
        where: {
            username: username,
        },
        ...params,
        select: {
            postId: true,
            post: {
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
                },
            },
        },
    })

    if (!favorites) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "Favorites not found",
            })
        )
    }

    const favPosts: {
        restaurant: { name: string }
        favorites: { username: string }[]
        id: number
        title: string
        text: string | null
        rating: number
        chosenFood: string | null
        createdAt: Date
        restaurantId: number
        authorId: string
        updatedAt: Date
        comments: {
            id: number
            text: string
            createdAt: Date
            authorId: string
        }[]
    }[] = []

    favorites.forEach((fav) => {
        favPosts.push(fav.post)
    })

    return {
        status: 200,
        favorites: favPosts,
    }
})
