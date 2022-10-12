<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const username = ref("")
const password = ref("")
const emailInput = ref("")

const errorMessage = ref(false)

const modalOpen = ref(false)

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

const openModal = () => {
    modalOpen.value = true
}

const closeModal = () => {
    modalOpen.value = false
}

//email checken, obs ne email ist, request an backend schicken
const sendMail = () => {
    console.log("test")
    if (emailInput.value != "test") {
        console.log("testinput")
    }
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
        <button
            type="submit"
            class="p-1 float-right hover:underline"
            @click.prevent="openModal"
        >
            Forgot Password?
        </button>
    </form>
    <ModalComp>
        <div
            v-if="modalOpen"
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center z-50"
        @click.self="closeModal"
    >
        <aside class="bg-white rounded-lg p-6 relative">
            <button
                class="absolute top-3 right-3 leading-3 h-6 w-6 text-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md"
                @click="closeModal()"
            >
                &times;
            </button>
            <p class="test">
                Did you forget your password?<br />Please enter your E-Mail
                address below.<br />We will send you an email to reset your
                password.
            </p>
            <div class="p-3">
                <label for="email" class="block">Email</label>
                <input
                v-model="emailInput"
                    id="emailInput"
                    class="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                />
            </div>
            <button
                class="absolute leading-5 h-12 w-24 text-l text-black-500 hover:underline hover:bg-gray-100 rounded-md shadow"
                @click="sendMail()"
            >
                Send Mail
            </button>
            <slot></slot>
        </aside>
    </div></ModalComp>
    
</template>

<style scoped></style>
