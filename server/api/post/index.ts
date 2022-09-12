import prisma from "@/server/services/dbManager"
import { Post } from "@prisma/client"

export default defineEventHandler(async (event) => {
    const query = useQuery(event)

    const posts = await prisma.post.findMany({
        select: {
            id: true,
            authorId: true,
            title: true,
            content: true,
            createdAt: true,
            published: true,
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
