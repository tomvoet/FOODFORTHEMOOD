import type { Comment } from "@prisma/client"

/**
 * asynchronously creates a new comment
 * @function getAllPosts
 * @param {string} authorId username of the author
 * @param {number} postId id of the post
 * @param {string} text content of the comment
 * @param {string} token token of the user
 * @returns {Promise<{status: number, comment: Comment}>} status and comment
 * @async
 * @author Tom Voet
 */
export const createNewComment = async (
    text: string,
    authorId: string,
    postId: number,
    token: string
) => {
    const { data, error } = await useFetch(`/api/post/${postId}/comment`, {
        method: "POST",
        body: JSON.stringify({ text, authorId, postId }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (error.value) return { status: 400, comment: null as unknown as Comment }
    else if (data.value) return { status: 200, comment: data.value as Comment }
}
