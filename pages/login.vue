<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const username = ref("")
const password = ref("")
const emailInput = ref("")

const emailValid = ref(true)
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

const sendMail = () => {
    if (!validateEmail()) {
        emailValid.value = false
        return
    }
    $fetch("/api/auth/reset_password", {
        method: "post",
        body: {
            email: emailInput.value
        }
    })
}

function validateEmail(): boolean {
    const regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

    return regexp.test(emailInput.value)
}

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
    <ModalComp
        text="Forgot Password?"
        classes="p-1 float-right hover:underline"
    >
        <aside class="p-6 relative text-center">
            <p>
                Did you forget your password?<br />Please enter your E-Mail
                address below.<br />We will send you an email to reset your
                password.
            </p>
            <div class="p-3">
                <p v-show="!emailValid" id="emailCheck">Invalid email</p>
                <label for="email" class="block">Email</label>
                <input
                    id="emailInput"
                    v-model="emailInput"
                    class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                />
            </div>
            <button
                class="mx-auto leading-5 h-12 w-24 text-l text-black-500 bg-gray-300 bg-opacity-40 hover:underline hover:bg-gray-100 rounded-md shadow"
                @click="sendMail()"
            >
                Send Mail
            </button>
        </aside>
    </ModalComp>
</template>

<style scoped></style>
