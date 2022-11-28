/**
 * synchronously delete comment
 * @function getAllPosts
 * @param {number} commentId id of the post
 * @param {string} token token of the user
 * @author Tom Voet
 */
export const deleteComment = async (commentId: number, token: string) => {
    const { data } = await useFetch(`/api/comment/${commentId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const status = data.value?.status
    const message = data.value?.message

    return { status, message }
}
