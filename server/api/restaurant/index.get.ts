import { prisma } from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const { username } = event.context.params

    const query = useQuery(event)

    const limit = query.limit
    const offset = query.offset

    const params = {
        take: Number(limit) || 10,
        skip: Number(offset) || 0,
    }

    const restaurants = await prisma.restaurant.findMany({
        ...params,
        select: {
            id: true,
            name: true,
        },
    })

    if (!restaurants) return { status: 404, restaurants: null }

    return {
        status: 200,
        restaurants,
    }
})
