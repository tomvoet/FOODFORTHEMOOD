import { useUserStore } from "~~/stores/userStore"

/**
 * asynchronously gets a favorites of a user
 * @param username username of the user
 * @param cursorObj cursor object
 * @returns {Promise<{status: {code: number, message: string}, favorites: Favorite[]}>} status and favorites
 * @async
 */
export const getUserFavoritesLazy = (
    username: string,
    cursorObj: { cursor: number }
) => {
    const userStore = useUserStore()
    const headers: { Authorization?: string } = {}

    if (userStore.loggedIn) {
        headers.Authorization = `Bearer ${userStore.token}`
    }

    return useLazyFetch(
        `/api/user/${username}/favorites${
            cursorObj.cursor ? `?cursor=${cursorObj.cursor}` : ""
        }`,
        {
            key: `user/${username}/favorites${
                cursorObj.cursor ? `?cursor=${cursorObj.cursor}` : ""
            }`,
            headers,
        }
    )
}
