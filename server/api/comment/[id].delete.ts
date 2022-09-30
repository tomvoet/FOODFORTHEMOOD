import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const { user } = event.context

    const comment = await prisma.comment.findUnique({
        where: {
            id: Number(id),
        },
    })

    console.log(comment)

    if (comment?.authorId !== user.username) {
        return {
            status: 401,
            message: "Unauthorized",
        }
    }

    await prisma.comment.delete({
        where: {
            id: Number(id),
        },
    })

    return {
        status: 200,
        message: "Comment deleted",
    }
})
