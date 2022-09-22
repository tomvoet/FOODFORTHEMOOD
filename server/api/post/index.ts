import prisma from "@/server/services/dbManager"

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
            reviewStars: true,
            reviewText: true,
            createdAt: true,
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
        },
        orderBy: {
            createdAt: "desc",
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
