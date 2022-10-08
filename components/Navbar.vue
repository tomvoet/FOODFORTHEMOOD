<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"
import log from "~~/server/middleware/log"

const userStore = useUserStore()

const userMenuOpen = ref(false)

const logout = () => {
    const router = useRouter()
    userStore.logout()
    router.push("/")
}

const goToLogin = () => {
    const router = useRouter()
    router.push("/login")
}

const goToRegister = () => {
    const router = useRouter()
    router.push("/register")
}

const userPath = computed(() => {
    if (userStore.user) {
        return `/user/${userStore.user.username}`
    }
    return "/login"
})

const profilePicture = ref("img/blankpicture.png")

const getProfilePicture = async () => {
    const res = await $fetch(
        `/api/user/${userStore.user?.username}/profilepicture`
    )
    if (res.status === 200) {
        if (
            res?.image !== null &&
            res?.image !== "" &&
            res?.image !== undefined
        ) {
            profilePicture.value = res.image
        }
    }
}

onMounted(() => {
    document.addEventListener("click", (event) => {
        if (userMenuOpen.value) {
            if (
                event
                    .composedPath()
                    .includes(
                        document.getElementById("user-menu") as HTMLDivElement
                    )
            ) {
                return
            } else {
                userMenuOpen.value = false
            }
        }
    })
    if (userStore.loggedIn) getProfilePicture()
})
</script>

<template>
    <nav class="bg-primary">
        <NuxtLink id="logo" to="/"><h1>F4TM</h1></NuxtLink>
        <ModalTest />
        <NuxtLink to="/test">Test</NuxtLink>
        <ClientOnly>
            <div v-if="userStore.loggedIn" class="flex flex-row">
                <div id="user-menu" class="relative">
                    <button @click="userMenuOpen = !userMenuOpen">
                        <NuxtImg
                            :src="profilePicture"
                            :alt="userStore.user?.username"
                            class="rounded-full w-10 h-10"
                            width="40"
                            height="40"
                        />
                    </button>
                    <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                    >
                        <ul
                            v-show="userMenuOpen"
                            class="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <li class="px-4 py-3 hover:bg-gray-100" role="none">
                                <NuxtLink
                                    :to="userPath"
                                    class="block text-sm text-gray-700 user-menu-button"
                                    role="menuitem"
                                    @click="userMenuOpen = false"
                                >
                                    Your Profile
                                </NuxtLink>
                            </li>
                            <li class="px-4 py-3 hover:bg-gray-100" role="none">
                                <NuxtLink
                                    to="/settings"
                                    class="block text-sm text-gray-700 user-menu-button"
                                    role="menuitem"
                                    @click="userMenuOpen = false"
                                >
                                    Settings
                                </NuxtLink>
                            </li>
                            <li
                                class="px-4 py-3 hover:bg-gray-100 w-full"
                                role="none"
                            >
                                <a
                                    class="block text-sm text-gray-700 cursor-pointer user-menu-button"
                                    role="menuitem"
                                    @click="
                                        () => {
                                            logout()
                                            userMenuOpen = false
                                        }
                                    "
                                >
                                    Sign out
                                </a>
                            </li>
                            <li class="px-4 py-3" role="none">
                                <div
                                    class="block text-sm text-gray-700 user-menu-button"
                                    role="menuitem"
                                >
                                    logged in as {{ userStore.user?.username }}
                                </div>
                            </li>
                        </ul>
                    </transition>
                </div>
            </div>
            <div v-else>
                <!--differently colored sign in and sign up button-->
                <button
                    class="bg-red-300 rounded-md px-4 py-2 m-2 text-white font-semibold hover:bg-red-400"
                    @click="goToLogin"
                >
                    Login
                </button>
                <button
                    class="bg-green-300 rounded-md px-4 py-2 m-2 text-white font-semibold hover:bg-green-400"
                    @click="goToRegister"
                >
                    Sign Up
                </button>
            </div>
        </ClientOnly>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: 4rem;
    /*
  background-color: #fff;
  */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 200ms linear;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
}

.scrolled {
    background-color: #fff;
    color: #050505;
}

#logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    text-decoration: none;
}
</style>
