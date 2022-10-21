import { useUserStore } from "@/stores/userStore"
import { ReducedPost } from "@/customTypes"

/**
 *
 * @function createPost
 * @param options options for the post
 * @param options.title title of the post
 * @param options.text text of the post
 * @param options.rating rating of the post
 * @param options.chosenFood chosenFood of the post
 * @param options.authorId authorId of the post
 * @param options.restaurantId restaurantId of the post
 * @returns {Promise<{status: {code: number, message: string}, post: FullPost}>} status and post
 * @async
 * @category Post
 * @example
 * const { status, post } = await createPost({
 *    title: "title",
 *    text: "text",
 *    rating: 5,
 *    chosenFood: "food",
 *    authorId: "maxMustermann",
 *    restaurantId: 4,
 * })
 */

export const createPost = async (options: {
    authorId: string
    title: string
    text: string
    rating: number
    chosenFood: string
    restaurantId: number
}) => {
    const userStore = await useUserStore()

    if (!userStore.token) {
        return {
            post: null,
            status: {
                code: 401,
                message: "Unauthorized",
            },
        }
    }

    try {
        const post = await $fetch<ReducedPost>("/api/post", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userStore.token}`,
            },
            body: options,
        })
        return {
            post: post,
            status: {
                code: 203,
                message: "Created",
            },
        }
    } catch (error) {
        return {
            post: null,
            status: getErrorStatus(error),
        }
    }
}
