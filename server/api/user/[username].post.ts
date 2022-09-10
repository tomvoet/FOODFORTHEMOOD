import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const user = await prisma.user.create({
        data: {
            email: event.context.params.username,
            username: event.context.params.username,
            password_hash: event.context.params.username,
        }
    })
    return user
})