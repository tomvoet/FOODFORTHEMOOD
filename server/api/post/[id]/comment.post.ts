import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const { user, authorId, postId, text } = body

    console.log(user)

    if (!authorId && !postId && !text) return { status: 400, comment: null }

    if (authorId !== user.username) return { status: 401, comment: null } //prevent commenting under wrong username

    const comment = await prisma.comment.create({
        data: {
            authorId,
            postId,
            text,
        },
    })

    if (!comment) return { status: 400, comment: null }

    return { status: 200, comment }
})
