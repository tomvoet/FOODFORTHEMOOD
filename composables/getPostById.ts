import { FullPost } from "@/customTypes"

export const getPostById = async (id: string) => {
    try {
        const post = await $fetch<FullPost>(`/api/post/${id}`, {
            method: "GET",
        })

        return { post: post, status: { code: 200, message: "OK" } }
    } catch (error) {
        return { post: null, status: getErrorStatus(error) }
    }
}
