import prisma from "@/server/services/dbManager"
import { Post } from "@prisma/client"

export default defineEventHandler(async (event) => {
    const query = useQuery(event)

    if (query.author !== undefined && query.author !== null) {
        const username: string = query.author.toString()

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
                        published: true,
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
        const posts: Post[] = postList?.posts

        return { status: 200, posts }
    } else {
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

        posts[0].author

        return { status: 200, posts: posts }
    }
})
