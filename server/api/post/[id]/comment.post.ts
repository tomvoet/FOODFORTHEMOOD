import { prisma } from "@/server/services/dbManager"
import { createZodError } from "~~/server/services/createZodError"
import { commentSchema } from "~~/utils/validation_schemas"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { authorId, postId, text } = body
    const { user } = event.context

    if (!authorId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "authorId is required",
            })
        )

    if (!postId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "postId is required",
            })
        )

    if (!text)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "text is required",
            })
        )

    if (authorId !== user.username)
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
                message: "You are not authorized to create a comment",
            })
        )

    const data = { authorId, postId, text }

    try {
        commentSchema.parse(data)
    } catch (e) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: createZodError(e),
                data: createZodError(e),
            })
        )
    }

    const comment = await prisma.comment.create({
        data: data,
    })

    if (!comment)
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal server error",
                message: "Something went wrong",
            })
        )

    return comment
})
