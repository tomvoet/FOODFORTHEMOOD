<script lang="ts" setup>
const username = ref("")
const password = ref("")

const login = async () => {
    const user = await useFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    })

    if (user) {
        const router = useRouter()
        router.push("/")
    }

    console.log(user)
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
