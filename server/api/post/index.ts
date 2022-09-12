import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const query = useQuery(event) // vielleicht für index oder so oder erste 100

    const posts = await prisma.post.findMany({
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

    if (!posts) {
        return {
            status: 404,
            posts: null,
        }
    }

    return { status: 200, posts: posts }
})
