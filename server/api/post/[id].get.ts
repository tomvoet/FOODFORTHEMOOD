import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

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
                take: 10,
            },
            author: {
                select: {
                    username: true,
                },
            },
        },
    })

    if (!post) {
        return {
            status: 404,
            post: null,
        }
    }

    return { status: 200, post }
})
