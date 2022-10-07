import { useUserStore } from "@/stores/userStore"
import { FullPost } from "@/customTypes"

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
        const post = await $fetch<FullPost>("/api/post", {
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
