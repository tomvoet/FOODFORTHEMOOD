import { ReducedPost } from "~~/customTypes"
import { useUserStore } from "~~/stores/userStore"
/**
 * synchronously returns all posts
 * @function getAllPosts
 * @author Tom Voet
 * @returns {{ posts: FullPost[], status: { code: number, message: string } }}
 */
export const getAllPosts = async (opts: { cursor?: number }) => {
    const userStore = useUserStore()
    const headers: { Authorization?: string } = {}

    if (userStore.loggedIn) {
        headers.Authorization = `Bearer ${userStore.token}`
    }

    try {
        const posts = await $fetch<ReducedPost[]>(
            `/api/post${opts.cursor ? "?cursor=" + opts.cursor : ""}`,
            {
                method: "GET",
                headers,
            }
        )
        return {
            posts,
            status: {
                code: 200,
                message: "OK",
            },
        }
    } catch (error) {
        return {
            posts: [],
            status: getErrorStatus(error),
        }
    }
    /*

    const status = {
        code: 0,
        message: "",
    }

    const { data, error } = await useFetch<FullPost[]>("/api/post", {
        method: "GET",
        async onResponseError({ response }) {
            status.code = response.status
            status.message = response.statusText
        },
    })

    if (error) {
        return {
            posts: [],
            status,
        }
    }

    return {
        posts: data.value,
        status,
    }*/
}
