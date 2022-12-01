import { useUserStore } from "@/stores/userStore"
import { Cuisine, Restaurant } from "@prisma/client"

/**
 *
 * @function createRestaurant
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

export const createRestaurant = async (options: {
    name: string
    cuisines: Cuisine[]
    state: string
    city: string
    zip: string
    street: string
    houseNum: string
    phone?: string
    website?: string
}) => {
    const userStore = await useUserStore()

    if (!userStore.token) {
        return {
            restaurant: null,
            status: {
                code: 401,
                message: "Unauthorized",
            },
        }
    }

    try {
        const restaurant = await $fetch<Restaurant>("/api/restaurant", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userStore.token}`,
            },
            body: options,
        })
        return {
            restaurant: restaurant,
            status: {
                code: 203,
                message: "Created",
            },
        }
    } catch (error) {
        return {
            restaurant: null,
            status: getErrorStatus(error),
        }
    }
}
