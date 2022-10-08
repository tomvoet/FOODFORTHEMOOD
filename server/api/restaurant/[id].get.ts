import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            id: true,
            name: true,
            state: true,
            city: true,
            cuisines: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    })

    if (!restaurant) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                message: "Restaurant not found",
            })
        )
    }

    return {
        status: 200,
        restaurant,
    }
})
