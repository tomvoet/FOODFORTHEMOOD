import { useUserStore } from "~~/stores/userStore"

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
