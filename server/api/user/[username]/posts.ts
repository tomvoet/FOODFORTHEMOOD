import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

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

    const postList = await prisma.user.findUnique({
        where: {
            username: username,
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
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    })

    if (!postList) {
        return {
            status: 404,
            posts: null,
        }
    }

    const posts = postList?.posts

    return { status: 200, posts }
})
