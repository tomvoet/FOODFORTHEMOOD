import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const query = useQuery(event)

    const limit = query.limit
    const offset = query.offset

    const params = {
        take: Number(limit) || 10,
        skip: Number(offset) || 0,
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
