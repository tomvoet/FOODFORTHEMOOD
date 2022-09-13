export const getAllPosts = async () => {
    const { data } = await useFetch("/api/post")

    const status = data.value?.status
    const posts = data.value?.posts

    return { status, posts }
}
