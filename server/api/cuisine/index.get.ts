import { prisma } from "../../services/dbManager"

export default defineEventHandler(async (event) => {
    const cuisines = await prisma.cuisine.findMany()

    if (cuisines === null)
        sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "No cuisines found",
            })
        )

    return cuisines
})
