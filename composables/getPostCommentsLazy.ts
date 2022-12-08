import { useUserStore } from "~~/stores/userStore"

/**
 * asynchronously gets a comments of a post
 * @param post id of the post
 * @param cursorObj cursor object
 * @returns {Promise<{status: {code: number, message: string}, comments: Comment[]}>} status and comments
 * @async
 */
export const getPostCommentsLazy = (
    post: number,
    cursorObj: { cursor: number }
) => {
    const userStore = useUserStore()
    const headers: { Authorization?: string } = {}

    if (userStore.loggedIn) {
        headers.Authorization = `Bearer ${userStore.token}`
    }

    return useLazyFetch(
        `/api/post/${post}/comment${
            cursorObj.cursor ? `?cursor=${cursorObj.cursor}` : ""
        }`,
        {
            key: `post/${post}/comment${
                cursorObj.cursor ? `?cursor=${cursorObj.cursor}` : ""
            }`,
            headers,
        }
    )
}
