<script lang="ts" setup>
import type { Post } from "@prisma/client"
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const postMenuOpen = ref(false)

const menuContainer = ref(null as HTMLElement | null)

const props = defineProps<{
    post: Post
    author?: {
        username: string
    }
    restaurant?: {
        name: string
        id: number
    }
    comments?: boolean
    stats: {
        isFavorite: boolean
        favoriteAmount: number
        commentAmount: number
    }
}>()

const emits = defineEmits<{
    (e: "deletePost", id: number): void
    (e: "favorite"): void
    (e: "unfavorite"): void
}>()

const reloadPosts = () => {
    emits("deletePost", props.post.id)
}

const submitDeletePost = async (id: number) => {
    if (userStore.loggedIn && userStore.user?.username) {
        if (confirm("Are you sure you want to delete this post?")) {
            const res = await deletePost(id)
            if (res.status.code === 204) {
                reloadPosts()
            } else {
                alert("Something went wrong")
            }
        }
    } else {
        alert("You must be logged in to delete a post")
    }
}

onMounted(() => {
    document.addEventListener("click", (e) => {
        if (
            menuContainer.value &&
            !menuContainer.value.contains(e.target as Node)
        ) {
            postMenuOpen.value = false
        }
    })
})

const report = (id: number) => {
    alert("Reported " + id)
}
</script>

<template>
    <article class="relative m-4 border w-3/4 md:w-1/2 rounded-lg">
        <div class="p-3">
            <h3 class="font-bold text-3xl break-words mr-6">
                <NuxtLink :to="'/posts/' + post.id">{{
                    comments
                        ? post.title
                        : post.title.length > 150
                        ? post.title.substring(0, 150) + "..."
                        : post.title
                }}</NuxtLink>
            </h3>
            <div ref="menuContainer" class="absolute top-3 right-3">
                <button
                    aria-label="Post menu"
                    class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-md leading-1"
                    @click="postMenuOpen = !postMenuOpen"
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
                        v-show="postMenuOpen"
                        class="absolute right-0 w-max mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm text-right"
                    >
                        <li
                            class="px-3 py-2 hover:bg-gray-100 rounded-t-md cursor-pointer"
                            :class="{
                                'rounded-b-md': !(
                                    userStore.loggedIn &&
                                    userStore.user?.username ===
                                        author?.username
                                ),
                            }"
                            @click="report(post.id)"
                        >
                            Report
                        </li>
                        <li
                            v-if="
                                userStore.loggedIn &&
                                userStore.user?.username === author?.username
                            "
                            class="px-3 py-2 hover:bg-gray-100 rounded-b-md flex flex-row justify-end items-center text-red-500 cursor-pointer"
                            @click="submitDeletePost(post.id)"
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
            <div class="flex flex-row items-center">
                <StarRating :rating="post.rating" />
            </div>
            <div class="font-bold">
                <NuxtLink :to="'/restaurants/' + post.restaurantId">
                    {{ restaurant?.name }}
                </NuxtLink>
            </div>
            <p class="chosenFood">
                {{ post.chosenFood }}
            </p>
            <p class="mt-4 break-words">
                {{ post.text }}
            </p>
            <div class="flex space-between w-full flex-row">
                <div v-if="author !== undefined" class="w-max">
                    <NuxtLink
                        :to="'/user/' + author.username"
                        class="italic font-bold"
                        >{{ author.username }}</NuxtLink
                    >
                </div>
                <div class="text-gray-700 mt-1 text-sm w-max ml-auto">
                    {{
                        post.updatedAt == post.createdAt
                            ? "created: "
                            : "updated: " +
                              `${new Date(post.createdAt).toLocaleTimeString(
                                  "de-DE",
                                  {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  }
                              )} | ${new Date(
                                  post.createdAt
                              ).toLocaleDateString("de-DE")}`
                    }}
                </div>
            </div>
        </div>
        <div class="w-full flex flex-row divide-x divide-gray-200 select-none">
            <NuxtLink
                :to="'/posts/' + post.id"
                class="text-center inline-flex flex-row w-1/2 justify-center items-center p-3 bg-gray-50 hover:text-black hover:bg-gray-100 shadow-inner"
            >
                <IconWrapper icon="commentOutline" classes="h-5 w-5 mr-1" />
                {{ stats.commentAmount }}
            </NuxtLink>
            <FavoritesComp
                :is-favorite="stats.isFavorite"
                :amount="stats.favoriteAmount"
                :post-id="post.id"
                @favorite="emits('favorite')"
                @unfavorite="emits('unfavorite')"
            />
        </div>
        <template v-if="comments">
            <Suspense>
                <CommentSection :post-id="post.id" />
            </Suspense>
        </template>
    </article>
</template>
