import { useUserStore } from "~~/stores/userStore"

/**
 * asynchronously gets a posts of a user
 * @param username username of the user
 * @param cursorObj cursor object
 * @returns {Promise<{status: {code: number, message: string}, posts: Post[]}>} status and posts
 */
export const getUserPostsLazy = (
    username: string,
    cursorObj: { cursor: number }
) => {
    const userStore = useUserStore()
    const headers: { Authorization?: string } = {}

    if (userStore.loggedIn) {
        headers.Authorization = `Bearer ${userStore.token}`
    }

    return useLazyFetch(
        `/api/user/${username}/posts${
            cursorObj.cursor ? `?cursor=${cursorObj.cursor}` : ""
        }`,
        {
            key: `user/${username}/posts${
                cursorObj.cursor ? `?cursor=${cursorObj.cursor}` : ""
            }`,
            headers,
        }
    )
}
