import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const aggrObj = await prisma.post.aggregate({
        where: {
            restaurantId: Number(id),
        },
        _avg: {
            rating: true,
        },
        _count: {
            rating: true,
        },
    })

    if (!aggrObj) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "No restaurant found",
            })
        )
    }

    return { rating: aggrObj._avg.rating, count: aggrObj._count.rating }
})
