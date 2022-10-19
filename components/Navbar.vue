<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const userMenuOpen = ref(false)

const mobileMenuOpen = ref(false)

const scrolled = ref(false)

const logout = () => {
    userStore.logout()
    navigateTo("/")
}

const goToLogin = () => navigateTo("/login")

const goToRegister = () => navigateTo("/register")

const userPath = computed(() => {
    if (userStore.user) {
        return `/user/${userStore.user.username}`
    }
    return "/login"
})

const profilePicture = ref("img/blankpicture.png")

const getProfilePicture = async () => {
    try {
        const res = await $fetch(
            `/api/user/${userStore.user?.username}/profilepicture`
        )
        if (res !== null && res !== "" && res !== undefined) {
            profilePicture.value = res
        }
    } catch (err) {
        console.log(err)
    }
}

userStore.$subscribe(() => {
    if (userStore.loggedIn) {
        getProfilePicture()
    }
})

onMounted(() => {
    document.onscroll = () => {
        const nav = document.getElementById("nav")
        if (nav) {
            if (window.scrollY > 0) {
                scrolled.value = true
            } else {
                scrolled.value = false
            }
        }
    }

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
        if (mobileMenuOpen.value) {
            console.log(document.querySelectorAll("nav button"))
            if (
                event
                    .composedPath()
                    .includes(
                        document.getElementById("nav") as HTMLDivElement
                    ) ||
                event
                    .composedPath()
                    .includes(
                        document.getElementById("hamburger") as HTMLDivElement
                    )
            ) {
                return
            } else {
                mobileMenuOpen.value = false
            }
        }
    })

    if (userStore.loggedIn) getProfilePicture()
})

const pathContainsNavButton = (path: EventTarget[]) => {
    const help = path.some((element) => {
        if (element instanceof HTMLButtonElement) {
            return true
        }
    })

    console.log(help)

    return help
}
</script>

<template>
    <header
        id="header"
        class="sticky top-0 w-full z-50 shadow-md flex justify-between items-center p-4 md:py-0 md:pl-6 transition duration-300"
        :class="{
            'shadow-md': scrolled,
            'bg-white': scrolled,
            'bg-primary': !scrolled,
        }"
    >
        <div class="md:hidden">mobile</div>
        <NuxtLink to="/"
            ><h1 class="group text-3xl font-semibold hover:text-black md:mr-16">
                F4TM
                <span
                    class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black -mt-1"
                ></span></h1
        ></NuxtLink>
        <div
            class="fixed top-0 left-0 w-screen h-screen md:hidden transition duration-300 opacity-40"
            :class="{
                hidden: !mobileMenuOpen,
                'bg-white': !mobileMenuOpen,
                'bg-black': mobileMenuOpen,
                fadeIn: mobileMenuOpen,
            }"
        ></div>
        <button
            id="hamburger"
            class="md:hidden"
            @click="mobileMenuOpen = !mobileMenuOpen"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-10 w-10"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
            </svg>
        </button>
        <nav
            id="nav"
            class="flex flex-col grow fixed top-0 right-0 min-w-[40%] md:relative md:flex-row md:justify-between md:translate-x-0 translate-x-full max-w-[80vw] md:max-w-none items-center shadow-md md:shadow-none h-screen md:h-16 py-0 px-8 transition-all ease-in duration-200 bg-primary md:bg-transparent"
            :class="{
                '-translate-x-0': mobileMenuOpen,
            }"
        >
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
                                <li
                                    class="px-4 py-3 hover:bg-gray-100 rounded-t-md"
                                    role="none"
                                >
                                    <NuxtLink
                                        :to="userPath"
                                        class="block text-sm text-gray-700 user-menu-button"
                                        role="menuitem"
                                        @click="userMenuOpen = false"
                                    >
                                        Your Profile
                                    </NuxtLink>
                                </li>
                                <li
                                    class="px-4 py-3 hover:bg-gray-100"
                                    role="none"
                                >
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
                                        logged in as
                                        {{ userStore.user?.username }}
                                    </div>
                                </li>
                            </ul>
                        </transition>
                    </div>
                </div>
                <div v-else class="flex flex-row">
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
    </header>
</template>

<style scoped>
.fadeIn {
    animation: fadeIn ease 0.3s;
    -webkit-animation: fadeIn ease 0.3s;
    -moz-animation: fadeIn ease 0.3s;
    -o-animation: fadeIn ease 0.3s;
    -ms-animation: fadeIn ease 0.3s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 0.4;
    }
}
</style>
