import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            username: true,
            bio: true,
            favorites: {
                select: {
                    postId: true,
                },
            },
        },
    })

    if (!user) {
        return {
            status: 404,
            user: null,
        }
    }

    return { status: 200, user }
})
