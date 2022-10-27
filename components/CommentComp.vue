<script lang="ts" setup>
import type { Comment } from "@prisma/client"
import type { PartialBy } from "~~/utils/customTypes"
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const commentMenuOpen = ref(false)

const menuContainer = ref(null as HTMLElement | null)

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
            useToasts().value.push({
                message: "Error deleting comment",
                type: "error",
                start: new Date(),
            })
        }
    }
}

const report = () => {
    useToasts().value.push({
        message: "Reported comment " + props.comment.id,
        type: "info",
        start: new Date(),
    })
}

onMounted(() => {
    document.addEventListener("click", (e) => {
        if (
            menuContainer.value &&
            !menuContainer.value.contains(e.target as Node)
        ) {
            commentMenuOpen.value = false
        }
    })
})
</script>

<template>
    <div class="relative p-3 border rounded-lg mt-4">
        <div>
            <NuxtLink :to="'/user/' + comment.authorId" class="font-semibold">
                {{ comment.authorId }}
            </NuxtLink>
        </div>
        <div class="commentText">
            {{ comment.text }}
        </div>
        <div ref="menuContainer" class="absolute top-3 right-3">
            <button
                aria-label="Post menu"
                class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-md leading-1"
                @click="commentMenuOpen = !commentMenuOpen"
            >
                <IconWrapper
                    icon="ellipsisVertical"
                    classes="h-6 w-6"
                /></button
            ><transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <ul
                    v-show="commentMenuOpen"
                    class="absolute right-0 w-max mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm text-right z-10"
                >
                    <li
                        class="px-3 py-2 hover:bg-gray-100 rounded-t-md cursor-pointer"
                        :class="{
                            'rounded-b-md': !(
                                comment.authorId == userStore.user?.username
                            ),
                        }"
                        @click="report"
                    >
                        Report
                    </li>
                    <li
                        v-if="comment.authorId == userStore.user?.username"
                        class="px-3 py-2 hover:bg-gray-100 rounded-b-md flex flex-row justify-end items-center text-red-500 cursor-pointer"
                        @click="pressDelete"
                    >
                        <IconWrapper
                            :icon="'deleteOutline'"
                            classes="h-4 w-4 mr-1"
                        />
                        <span>Delete Post</span>
                    </li>
                </ul>
            </transition>
        </div>
        <span class="italic text-sm">{{ getTimeAgo(comment.createdAt) }}</span>
    </div>
</template>
