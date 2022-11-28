import { createZodError } from "../../services/createZodError"
import { postSchema } from "../../../utils/validation_schemas"
import { prisma } from "../../services/dbManager"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { user } = event.context

    const { authorId, title, text, rating, chosenFood, restaurantId } = body

    if (authorId === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "authorId is required",
            })
        )
    }

    if (title === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "title is required",
            })
        )
    }

    if (text === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "text is required",
            })
        )
    }

    if (rating === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "rating is required",
            })
        )
    }

    if (chosenFood === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "chosenFood is required",
            })
        )
    }

    if (restaurantId === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "restaurantId is required",
            })
        )
    }

    if (authorId !== user.username) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
                message: "You are not authorized to create a post",
            })
        )
    }

    const data = {
        authorId,
        title,
        text,
        rating,
        chosenFood,
        restaurantId,
    }

    try {
        postSchema.parse(data)
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

    const post = await prisma.post.create({
        data: data,
        select: {
            id: true,
            authorId: true,
            title: true,
            rating: true,
            text: true,
            createdAt: true,
            chosenFood: true,
            updatedAt: true,
            restaurantId: true,
            author: {
                select: {
                    username: true,
                },
            },
            restaurant: {
                select: {
                    name: true,
                },
            },
            favorites: {
                where: {
                    username: user?.username || "",
                },
                select: {
                    username: true,
                },
            },
            _count: {
                select: {
                    favorites: true,
                    comments: true,
                },
            },
        },
    })

    if (post === null)
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal server error",
                message: "Something went wrong",
            })
        )

    return post
})
