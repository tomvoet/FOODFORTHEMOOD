<script lang="ts" setup>
import type { Comment } from "@prisma/client"
import type { PartialBy } from "~~/customTypes"
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const props = defineProps<{
    comment: PartialBy<Comment, "postId">
}>()

const emits = defineEmits<{
    (e: "deletedComment", id: number): void
}>()

const pressDelete = async () => {
    if (userStore.loggedIn && userStore.user && userStore.token) {
        const response = await deleteComment(props.comment.id, userStore.token)
        if (response.status == 200) {
            emits("deletedComment", props.comment.id)
        } else {
            alert("Error deleting comment")
        }
    }
}
</script>

<template>
    <div class="comment relative">
        <div>
            <NuxtLink :to="'/user/' + comment.authorId">
                {{ comment.authorId }}
            </NuxtLink>
            -
            {{
                `${new Date(comment.createdAt).toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                })} | ${new Date(comment.createdAt).toLocaleDateString(
                    "de-DE"
                )}`
            }}
        </div>
        <div class="commentText">
            {{ comment.text }}
        </div>
        <button
            v-if="comment.authorId == userStore.user?.username"
            aria-label="Delete comment"
            class="absolute top-0 right-0"
            @click="pressDelete()"
        >
            Delete
        </button>
    </div>
</template>
