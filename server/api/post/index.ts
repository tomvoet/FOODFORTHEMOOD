import prisma from "@/server/services/dbManager"

export default defineEventHandler(async (event) => {
    const query = useQuery(event)

    if(query.author!==undefined && query.author!==null) {
    const username: string = query.author.toString()

    const posts = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            posts: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    published: true,
                }
            }
        }     
              
    })
    

    if(!posts) {
        return {
            status: 404,
            posts: null
        }
    }

    return {status: 200, posts}
    } else {
        return {
            status: 404,
            posts: null
        }
    }

})