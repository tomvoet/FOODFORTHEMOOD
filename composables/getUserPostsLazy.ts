import { useUserStore } from "~~/stores/userStore"

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
