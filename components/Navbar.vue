<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const logout = () => {
    const router = useRouter()
    userStore.logout()
    router.push("/")
}

const goToLogin = () => {
    const router = useRouter()
    router.push("/login")
}

const userPath = computed(() => {
    if (userStore.user) {
        return `/user/${userStore.user.username}`
    }
    return "/login"
})

const profilePicture = ref("img/blankpicture.png")

const getProfilePicture = async () => {
    const { data } = await useFetch(
        `/api/user/${userStore.user?.username}/profilepicture`
    )
    if (data.value?.status === 200) {
        if (
            data.value?.image !== null &&
            data.value?.image !== "" &&
            data.value?.image !== undefined
        ) {
            profilePicture.value = data.value?.image
        }
    }
}

getProfilePicture()
</script>

<template>
    <nav class="bg-primary">
        <NuxtLink id="logo" to="/"><h1>F4TM</h1></NuxtLink>
        <ModalTest />
        <NuxtLink to="/test">Test</NuxtLink>
        <ClientOnly>
            <div v-if="userStore.loggedIn" class="flex flex-row">
                <NuxtLink :to="userPath">
                    {{ userStore.user?.username }}
                </NuxtLink>
                <button @click="logout">Logout</button>
                <NuxtImg
                    :src="profilePicture"
                    :alt="userStore.user?.username"
                    class="rounded-full"
                    sizes="md:40px"
                />
            </div>
            <button v-else @click="goToLogin">Login</button>
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
