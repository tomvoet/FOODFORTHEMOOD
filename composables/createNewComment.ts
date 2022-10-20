import type { Comment } from "@prisma/client"

/**
 * synchronously create a new comment
 * @function getAllPosts
 * @param {string} authorId username of the author
 * @param {number} postId id of the post
 * @param {string} text content of the comment
 * @param {string} token token of the user
 * @author Tom Voet
 */
export const createNewComment = async (
    text: string,
    authorId: string,
    postId: number,
    token: string
) => {
    const { data } = await useFetch<{ status: 200; comment: Comment }>(
        `/api/post/${postId}/comment`,
        {
            method: "POST",
            body: JSON.stringify({ text, authorId, postId }),
            headers: {
                Authorization: `Bearer ${token}`,
            },
            initialCache: false,
        }
    )

    const status = data.value?.status
    const comment = data.value?.comment

    return { status, comment }
}
