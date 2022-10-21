import { useUserStore } from "~~/stores/userStore"

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
