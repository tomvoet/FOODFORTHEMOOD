import { useUserStore } from "~~/stores/userStore"

/**
 * asynchronously gets a posts of a restaurant
 * @param restaurant id of the restaurant
 * @param cursorObj cursor object
 * @returns {Promise<{status: {code: number, message: string}, posts: Post[]}>} status and posts
 * @async
 */
export const getRestaurantPostsLazy = (
    restaurant: string,
    cursorObj: { cursor: number }
) => {
    const userStore = useUserStore()
    const headers: { Authorization?: string } = {}

    if (userStore.loggedIn) {
        headers.Authorization = `Bearer ${userStore.token}`
    }

    return useLazyFetch(
        `/api/restaurant/${restaurant}/posts${
            cursorObj.cursor ? `?cursor=${cursorObj.cursor}` : ""
        }`,
        {
            key: `restaurant/${restaurant}/posts${
                cursorObj.cursor ? `?cursor=${cursorObj.cursor}` : ""
            }`,
            headers,
        }
    )
}
