import { useUserStore } from "~~/stores/userStore"
/*
export const useCustomFetch = async (
    url: string,
    options?: {
        method?: string
        headers?: Record<string, string>
        body?: Record<string, unknown>
        initialCache?: boolean
        auth?: boolean
    }
) => {
    if (options && options.auth) {
        const userStore = await useUserStore()
        if (options.headers) {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${userStore.token}`,
            }
        }
    }
    return $fetch(url, options || {})
}*/

export const useCustomFetch = async (
    url: string,
    options: Record<string, unknown> = {}
) => {
    return $fetch(url, {
        ...options,
    })
}
