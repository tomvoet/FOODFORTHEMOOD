/**
 * custom wrapper for fetch to add default options
 * @param url url to fetch
 * @param options options for fetch
 * @returns {Promise<unknown>} response
 */
export const useCustomFetch = async (
    url: string,
    options: Record<string, unknown> = {}
) => {
    return $fetch(url, {
        ...options,
    })
}
