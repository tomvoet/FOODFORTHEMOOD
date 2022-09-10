import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })

    return post
})