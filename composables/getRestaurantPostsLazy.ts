import { useUserStore } from "~~/stores/userStore"

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
