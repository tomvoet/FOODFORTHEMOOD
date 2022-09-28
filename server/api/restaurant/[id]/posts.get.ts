import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const query = useQuery(event)

    const limit = query.limit
    const offset = query.offset

    const params = {
        take: Number(limit) || 10,
        skip: Number(offset) || 0,
    }

    const postList = await prisma.restaurant.findUnique({
        where: {
            id: Number(id)
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
