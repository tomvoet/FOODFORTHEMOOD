export const useCustomFetch = async (
    url: string,
    options: Record<string, unknown> = {}
) => {
    return $fetch(url, {
        ...options,
    })
}
