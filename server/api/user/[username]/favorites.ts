import { prisma } from "@/server/services/dbManager"
import type { Post } from "@prisma/client"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

    const query = useQuery(event)

    const limit = query.limit
    const offset = query.offset

    const params = {
        take: Number(limit) || 10,
        skip: Number(offset) || 0,
    }

    const favorites = await prisma.favorites.findMany({
        where: {
            username: username,
        },
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
        ...params,
    })

    if (!favorites) {
        return {
            status: 404,
            favorites: null,
        }
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
