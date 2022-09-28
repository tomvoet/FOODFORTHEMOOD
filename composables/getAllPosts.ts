/**
 * synchronously returns all posts
 * @function getAllPosts
 * @returns {Post[]}
 */

export const getAllPosts = async () => {
    const { data } = await useFetch(
        "/api/post" /*, {
        initialCache: {
            data: [],
        },
    }*/
    )

    const status = data.value?.status
    const posts = data.value?.posts

    return { status, posts }
}
