import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })

    if(!post) {
        return {
            status: 404,
            body: {
                post: null
            }
        }
    }

    return {status: 200, post}
})