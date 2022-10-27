<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

import type { Comment } from "@prisma/client"
import type { PartialBy } from "~~/customTypes"
import { commentSchema } from "~~/utils/validation_schemas"

type ReducedComment = PartialBy<Comment, "postId">

const props = defineProps<{
    postId: number
}>()

const emits = defineEmits<{
    (e: "newComment", comment: ReducedComment): void
}>()

const textArea = ref(null as HTMLTextAreaElement | null)

const userStore = useUserStore()

const onInput = () => {
    if (textArea.value) {
        textArea.value.style.height = "6em"
        if (textArea.value.scrollHeight > 6 * 16 - 3) {
            textArea.value.style.height = textArea.value.scrollHeight + "px"
        }
    }
}

const reset = () => {
    if (textArea.value) {
        textArea.value.value = ""
        textArea.value.style.height = "6em"
    }
}

const submit = async () => {
    if (
        textArea.value &&
        userStore.loggedIn &&
        userStore.user &&
        userStore.token
    ) {
        const comment = textArea.value.value

        try {
            commentSchema.partial().parse({ text: comment })
        } catch (e) {
            displayValidationErrors(e)
            return
        }

        const data = await createNewComment(
            comment,
            userStore.user?.username,
            props.postId,
            userStore.token
        )
        if (data?.status == 200 && data?.comment) {
            reset()
            const newComment = data.comment as ReducedComment
            emits("newComment", newComment)
            useToasts().value.push({
                message: "Created Comment",
                type: "success",
                start: new Date(),
            })
        } else {
            useToasts().value.push({
                message: "Error creating comment",
                type: "error",
                start: new Date(),
            })
        }
    }
}
</script>

<template>
    <form class="border rounded-md relative h-min flex">
        <textarea
            ref="textArea"
            class="w-full p-1 pb-8 rounded-md resize-none overflow-hidden h-[6em] outline-none focus:ring focus:ring-primary"
            :disabled="!userStore.loggedIn"
            :placeholder="
                userStore.loggedIn
                    ? 'Enter a comment...'
                    : 'Please log in to comment'
            "
            @input="onInput()"
            @keydown.enter.prevent="submit()"
        ></textarea>
        <div class="absolute bottom-0 right-0 w-full flex justify-end">
            <button
                :disabled="!userStore.loggedIn"
                class="border-l border-t border-gray-300 py-1 px-2 cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-default rounded-tl-md"
                @click.prevent="reset()"
            >
                Cancel
            </button>
            <button
                :disabled="!userStore.loggedIn"
                class="border-l border-t border-gray-300 py-1 px-2 cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor- rounded-br-md"
                type="submit"
                @click.prevent="submit()"
            >
                Submit
            </button>
        </div>
    </form>
</template>
