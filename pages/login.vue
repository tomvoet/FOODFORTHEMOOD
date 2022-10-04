<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const username = ref("")
const password = ref("")

const login = async () => {
    const loginRes = await userStore.login(username.value, password.value)
    if (loginRes.success) {
        console.log(userStore.token)
        const router = useRouter()
        router.push("/")
    } else {
        console.log(loginRes.message)
    }
}

setMetadata("Login", "Login to your account.")
</script>

<template>
    <form class="loginContainer">
        <h1>Login</h1>
        <div>
            <label for="username">Username</label>
            <input id="username" v-model="username" type="text" />
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" />
        </div>
        <button type="button" @click="login">Login</button>
    </form>
</template>

<style scoped></style>
