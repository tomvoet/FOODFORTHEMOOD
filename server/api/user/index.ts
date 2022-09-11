import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const users = await prisma.user.findMany()

    if(!users) {
        return {
            status: 404,
            users: null
        }
    }

    return {status: 200, users: users}
})