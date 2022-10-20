<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

const props = defineProps<{
    postId: number
}>()

const emits = defineEmits<{
    (e: "newComment"): void
}>()

const textArea = ref(null as HTMLTextAreaElement | null)

const userStore = useUserStore()

const onInput = () => {
    if (textArea.value) {
        textArea.value.style.height = "3em"
        if (textArea.value.scrollHeight > 3 * 16) {
            textArea.value.style.height = textArea.value.scrollHeight + "px"
        }
    }
}

const reset = () => {
    if (textArea.value) {
        textArea.value.value = ""
        textArea.value.style.height = "3em"
    }
}

const submit = () => {
    if (
        textArea.value &&
        userStore.loggedIn &&
        userStore.user &&
        userStore.token
    ) {
        const comment = textArea.value.value
        if (comment.length > 0) {
            createNewComment(
                comment,
                userStore.user?.username,
                props.postId,
                userStore.token
            )
            reset()
            emits("newComment")
        }
    }
}
</script>

<template>
    <form class="border border-gray-300 rounded-md relative">
        <textarea
            ref="textArea"
            class="w-full p-1 rounded-md resize-none overflow-hidden h-[3em] outline-none"
            :disabled="!userStore.loggedIn"
            :placeholder="
                userStore.loggedIn
                    ? 'Enter a comment...'
                    : 'Please log in to comment'
            "
            @input="onInput()"
        ></textarea>
        <div class="absolute bottom-0 right-0 w-full flex justify-end">
            <button
                :disabled="!userStore.loggedIn"
                class="border-l border-t border-gray-300 py-1 px-2 cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-default"
                @click.prevent="reset()"
            >
                Cancel
            </button>
            <button
                :disabled="!userStore.loggedIn"
                class="border-l border-t border-gray-300 py-1 px-2 cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor- rounded-br-md"
                @click.prevent="submit()"
            >
                Submit
            </button>
        </div>
    </form>
</template>
