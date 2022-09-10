import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const users = await prisma.user.findMany()
    return `users: ${users}`
})