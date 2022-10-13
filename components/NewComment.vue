<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

const props = defineProps<{
    postId: number
}>()

const emits = defineEmits<{
    (e: "newComment"): void
}>()

const userStore = useUserStore()

const onInput = () => {
    const textarea = document.getElementById(
        "newComment"
    ) as HTMLTextAreaElement
    textarea.style.height = "3em"
    if (textarea.scrollHeight > 3 * 16) {
        textarea.style.height = textarea.scrollHeight + "px"
    }
}

const reset = () => {
    const textarea = document.getElementById(
        "newComment"
    ) as HTMLTextAreaElement
    textarea.value = ""
    textarea.style.height = "3em"
}

const submit = () => {
    if (userStore.loggedIn && userStore.user && userStore.token) {
        const textarea = document.getElementById(
            "newComment"
        ) as HTMLTextAreaElement
        const comment = textarea.value
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
    <form>
        <textarea
            id="newComment"
            :disabled="!userStore.loggedIn"
            :placeholder="
                userStore.loggedIn
                    ? 'Enter a comment...'
                    : 'Please log in to comment'
            "
            @input="onInput()"
        ></textarea>
        <div class="buttonRow">
            <button
                :disabled="!userStore.loggedIn"
                class="disabled:opacity-50"
                @click.prevent="reset()"
            >
                Cancel
            </button>
            <button
                :disabled="!userStore.loggedIn"
                class="disabled:opacity-50 rounded-br-md"
                @click.prevent="submit()"
            >
                Submit
            </button>
        </div>
    </form>
</template>

<style scoped>
#newComment {
    width: 100%;
    padding: 0.2em 0.2em 2em 0.2em;
    border: none;
    border-radius: 5px;
    resize: none;
    font-size: 1em;
    overflow: hidden;
    height: 3em;
    outline: none;
}

form {
    border: 1px solid black;
    border-radius: 5px;
    position: relative;
}

button {
    background-color: transparent;
    border: none;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    font-size: 1em;
    padding: 0.2em 0.5em;
    cursor: pointer;
}

button:hover {
    background-color: #e6e6e6;
}

button:disabled:hover {
    background-color: transparent;
    cursor: default;
}

.buttonRow {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
</style>
