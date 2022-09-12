import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            id: true,
            authorId: true,
            title: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    })

    if (!post) {
        return {
            status: 404,
            body: {
                post: null,
            },
        }
    }

    return { status: 200, post }
})
