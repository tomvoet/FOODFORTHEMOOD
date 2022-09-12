import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

    const postList = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            posts: {
                select: {
                    id: true,
                    authorId: true,
                    title: true,
                    content: true,
                    createdAt: true,
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
