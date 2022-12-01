<script setup lang="ts">
import { useUserStore } from "~~/stores/userStore"

const route = useRoute()

const userStore = useUserStore()

const fabOpen = ref(false)

const showFAB = computed(() => {
    return (
        route.path !== "/login" &&
        route.path !== "/register" &&
        route.path !== "/reset_password" &&
        route.path !== "/settings" &&
        route.path !== "/about" &&
        userStore.loggedIn
    )
})
</script>

<template>
    <div v-if="showFAB" class="fixed bottom-3 right-3 z-50">
        <Teleport to="body"
            ><div
                v-if="fabOpen"
                class="fixed top-0 left-0 h-screen w-screen bg-gray-500 bg-opacity-50 z-40"
                @click="fabOpen = false"
            ></div
        ></Teleport>
        <div class="flex flex-col-reverse items-end gap-y-4 md:gap-y-2">
            <button
                class="h-16 w-16 md:h-10 md:w-10 md:text-2xl bg-green-400 rounded-full flex items-center justify-center text-5xl text-white transition-transform"
                :class="{
                    'rotate-45': fabOpen,
                    'rotate-0': !fabOpen,
                    'bg-gray-300': fabOpen,
                }"
                @click="fabOpen = !fabOpen"
            >
                <span class="mb-1 md:mb-0">+</span>
            </button>
            <ModalComp>
                <template #button
                    ><div
                        class="bg-green-400 rounded-full flex items-center justify-center text-white text-sm px-2 py-1 transition-all"
                        :class="{
                            'delay-100': !fabOpen,
                        }"
                        :style="{
                            transform:
                                'translateX(' + (fabOpen ? '0' : '200%') + ')',
                        }"
                        @click="fabOpen = false"
                    >
                        <span>Create Post</span>
                    </div></template
                ><template #modalContent><NewPostForm /></template></ModalComp
            ><ModalComp>
                <template #button
                    ><div
                        class="bg-green-400 rounded-full flex items-center justify-center text-white text-sm px-2 py-1 transition-all"
                        :class="{
                            'delay-100': fabOpen,
                        }"
                        :style="{
                            transform:
                                'translateX(' + (fabOpen ? '0' : '200%') + ')',
                        }"
                        @click="fabOpen = false"
                    >
                        <span>Create Restaurant</span>
                    </div></template
                ><template #modalContent><NewRestaurantForm /></template
            ></ModalComp>
        </div>
    </div>
</template>
