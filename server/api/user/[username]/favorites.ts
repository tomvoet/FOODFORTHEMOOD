import { prisma } from "@/server/services/dbManager"
import { reducePosts } from "~~/server/services/reducePost"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

    const { user }: { user?: { username: string } } = event.context

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
            },
        },
        orderBy: {
            postId: "desc",
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
        author: { username: string }
        _count: { favorites: number; comments: number }
        id: number
        title: string
        text: string | null
        rating: number
        chosenFood: string | null
        createdAt: Date
        restaurantId: number
        authorId: string
        updatedAt: Date
    }[] = []

    favorites.forEach((fav) => {
        favPosts.push(fav.post)
    })

    const posts = reducePosts(favPosts)

    return posts
})
