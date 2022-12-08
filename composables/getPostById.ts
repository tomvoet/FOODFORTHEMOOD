import { useUserStore } from "~~/stores/userStore"

/**
 * asynchronously gets a post by id
 * @param id id of the post
 * @returns {Promise<{status: {code: number, message: string}, post: FullPost}>} status and post
 * @async
 */
export const getPostById = async (id: string) => {
    const userStore = useUserStore()

    const headers: { Authorization?: string } = {}

    if (userStore.loggedIn) {
        headers.Authorization = `Bearer ${userStore.token}`
    }
    try {
        const post = await $fetch(`/api/post/${id}`, {
            method: "GET",
            headers,
        })

        return { post: post, status: { code: 200, message: "OK" } }
    } catch (error) {
        return { post: null, status: getErrorStatus(error) }
    }
}
