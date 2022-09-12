import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
            username: true,
            bio: true,
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
