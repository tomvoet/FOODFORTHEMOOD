import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const query = useQuery(event)

    const limit = query.limit
    const offset = query.offset

    const params = {
        take: Number(limit) || 10,
        skip: Number(offset) || 0,
    }

    const users = await prisma.user.findMany({
        ...params,
    })

    if (!users) {
        return {
            status: 404,
            users: null,
        }
    }

    return { status: 200, users: users }
})
