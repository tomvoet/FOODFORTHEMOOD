import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    const { authorId, title, text, rating, chosenFood, restaurantId } = body

    if (authorId === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                message: "authorId is required",
            })
        )
    }

    if (title === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                message: "title is required",
            })
        )
    }

    if (text === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                message: "text is required",
            })
        )
    }

    if (rating === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                message: "rating is required",
            })
        )
    }

    if (chosenFood === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                message: "chosenFood is required",
            })
        )
    }

    if (restaurantId === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                message: "restaurantId is required",
            })
        )
    }

    const post = await prisma.post.create({
        data: {
            authorId,
            title,
            text,
            rating,
            chosenFood,
            restaurantId,
        },
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
        },
    })

    if (post === null)
        return sendError(
            event,
            createError({
                statusCode: 404,
                message: "Post not found",
            })
        )

    return post
})
