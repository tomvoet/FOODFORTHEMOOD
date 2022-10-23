import { prisma } from "../../services/dbManager"
import { reducePosts } from "../../services/reducePost"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const { user }: { user?: { username: string } } = event.context

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

    const reducedPosts = reducePosts(posts)

    return reducedPosts
})
