<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const username = ref("")
const password = ref("")

const errorMessage = ref(false)

const login = async () => {
    const loginRes = await userStore.login(username.value, password.value)
    if (loginRes.success) {
        console.log(userStore.token)
        const router = useRouter()
        router.push("/")
    } else {
        errorMessage.value = true
        console.log(loginRes.message)
    }
}

onMounted(() => {
    setTimeout(() => {
        document.getElementById("username")?.focus()
    }, 100)
})

setMetadata("Login", "Login to your account.")
</script>

<template>
    <form class="max-w-max">
        <h1 class="text-2xl font-bold">Login</h1>
        <div class="p-3">
            <label for="username" class="block">Username</label>
            <input
                id="username"
                v-model="username"
                type="text"
                class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="p-3">
            <label for="password" class="block">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="p-4">
            <p v-show="errorMessage" id="errorMessage">
                Your username or password is wrong.
            </p>
        </div>
        <button
            type="submit"
            class="border p-1 float-right rounded-[.35em] hover:bg-blue-500 hover:text-white"
            @click.prevent="login"
        >
            Login
        </button>
    </form>
</template>

<style scoped></style>
