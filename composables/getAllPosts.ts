import { FullPost } from "~~/customTypes"
/**
 * synchronously returns all posts
 * @function getAllPosts
 * @author Tom Voet
 * @returns {Post[]}
 */
export const getAllPosts = async () => {
    try {
        const posts = await $fetch<FullPost[]>("/api/post", {
            method: "GET",
        })
        return { posts: posts, status: { code: 200, message: "OK" } }
    } catch (error) {
        return { posts: null, status: getErrorStatus(error) }
    }
}
