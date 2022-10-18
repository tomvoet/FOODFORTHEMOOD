import { FullPost } from "~~/customTypes"
/**
 * synchronously returns all posts
 * @function getAllPosts
 * @author Tom Voet
 * @returns {{ posts: FullPost[], status: { code: number, message: string } }}
 */
export const getAllPosts = async (opts: { cursor?: number }) => {
    try {
        const posts = await $fetch<FullPost[]>(
            `/api/post${opts.cursor ? "?cursorId=" + opts.cursor : ""}`,
            {
                method: "GET",
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
