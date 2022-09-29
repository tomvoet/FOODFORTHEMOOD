/**
 * synchronously create a new comment
 * @function getAllPosts
 * @param {string} authorId username of the author
 * @param {number} postId id of the post
 * @param {string} content content of the comment
 * @author Tom Voet
 */

export const createNewComment = async (text: string, authorId: string, postId: number, token: string) => {
    const { data } = await useFetch(`/api/post/${postId}/comment`, {
        method: "POST",
        body: JSON.stringify({ text, authorId, postId }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const status = data.value?.status
    const comment = data.value?.comment

    return { status, comment }
}
