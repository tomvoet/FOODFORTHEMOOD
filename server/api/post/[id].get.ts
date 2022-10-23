import { prisma } from "../../services/dbManager"
import { reducePosts } from "../../services/reducePost"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const { user }: { user?: { username: string } } = event.context

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id),
        },
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
    })

    if (!post) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "Post not found",
            })
        )
    }

    const reducedPosts = reducePosts([post])

    return reducedPosts[0]
})
