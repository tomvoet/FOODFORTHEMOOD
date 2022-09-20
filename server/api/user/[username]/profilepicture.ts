import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            image: true,
        },
    })

    return {
        status: 200,
        image: user?.image,
    }
})
