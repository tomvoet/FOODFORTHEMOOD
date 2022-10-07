import { useUserStore } from "@/stores/userStore"

export const deletePost = async (postId: number) => {
    const userStore = await useUserStore()

    if (!userStore.token) {
        return {
            status: {
                code: 401,
                message: "Unauthorized",
            },
        }
    }

    try {
        const res = await $fetch<{ deleted: boolean }>("/api/post/" + postId, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${userStore.token}`,
            },
            body: {
                authorId: userStore.user?.username,
            },
        })
        if (res.deleted == true) {
            return {
                deleted: true,
                status: {
                    code: 204,
                    message: "OK",
                },
            }
        } else {
            return {
                status: {
                    code: 400,
                    message: "Bad Request",
                },
            }
        }
    } catch (error) {
        return { deleted: false, status: getErrorStatus(error) }
    }
}
