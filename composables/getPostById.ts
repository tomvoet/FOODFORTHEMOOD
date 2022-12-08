import { useUserStore } from "~~/stores/userStore"

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
