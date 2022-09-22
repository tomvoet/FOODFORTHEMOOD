<script lang="ts" setup>
import type { Ref } from "vue"
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const username: Ref<string> = ref("")
const password: Ref<string> = ref("")

const login = async () => {
    await userStore.login(username.value, password.value)
    console.log(userStore.token)
    /*
    const user = await useFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    })

    if (user) {
        console.log(user)
        //const router = useRouter()
        //router.push("/")
    }
    */
}
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
