import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

    const query = useQuery(event)

    const limit = query.limit
    const offset = query.offset

    const params = {
        take: Number(limit) || 10,
        skip: Number(offset) || 0,
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
