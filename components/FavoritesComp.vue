<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const props = defineProps<{
    amount: number
    isFavorite: boolean
    postId: number
}>()

const emits = defineEmits<{
    (event: "favorite"): void
    (event: "unfavorite"): void
}>()

const onLike = async () => {
    if (userStore.loggedIn) {
        if (props.isFavorite) {
            emits("unfavorite")
            $fetch(
                `/api/post/${props.postId}/favorites/${userStore.user?.username}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${userStore.token}`,
                    },
                }
            ).catch((err) => {
                console.log(err)
                emits("favorite")
            })
        } else {
            emits("favorite")
            $fetch(`/api/post/${props.postId}/favorites`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                body: {
                    username: userStore.user?.username,
                },
            }).catch((err) => {
                console.log(err)
                emits("unfavorite")
            })
        }
    } else {
        useToasts().value.push({
            message: "You have to be logged in to favorite a post",
            type: "error",
            start: new Date(),
        })
    }
}
</script>

<template>
    <div
        class="w-1/2 inline-flex flex-row justify-center items-center shadow-inner p-3 bg-gray-50 hover:text-black hover:bg-gray-100 cursor-pointer"
        @click.self="onLike"
    >
        <svg
            v-if="isFavorite"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-red-500"
            @click.self="onLike"
        >
            <path
                d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
            />
        </svg>

        <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-65 h-6"
            @click.self="onLike"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
        </svg>
        <ModalComp v-if="amount > 0">
            <template #button>
                <span class="ml-1">{{ amount }}</span>
            </template>
            <template #modalContent>
                <h4 class="text-xl font-bold">People who like this</h4>
                <Suspense>
                    <LikedBy :post-id="postId" />
                </Suspense>
            </template>
        </ModalComp>
        <span v-else class="ml-1">{{ amount }}</span>
    </div>
</template>
