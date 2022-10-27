<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()

const username = ref("")
const password = ref("")
const emailInput = ref("")

const emailValid = ref(true)
const usernameField = ref(null as HTMLInputElement | null)

const errorMessage = ref(false)

const invalidUser = ref(null as HTMLInputElement | null)

const login = async () => {
    const loginRes = await userStore.login(username.value, password.value)
    if (loginRes.success) {
        navigateTo("/")
    } else {
        errorMessage.value = true
    }
}

onMounted(() => {
    usernameField.value?.focus()
})

const sendMail = () => {
    if (!validateEmail()) {
        emailValid.value = false
        console.log("test")
        return
    }
    $fetch("/api/auth/reset_password", {
        method: "post",
        body: {
            email: emailInput.value,
        },
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
    <form
        class="flex flex-col items-center justify-center h-[80vh] md:p-0 p-16"
    >
        <h2 class="text-5xl font-bold mb-4">Login</h2>
        <div class="flex flex-col items-center my-4 w-full md:w-auto">
            <TextInputPrimary
                v-model="username"
                field="username"
                type="text"
                placeholder="Username"
                icon="userSolid"
            />
        </div>
        <div class="flex flex-col items-center my-4 w-full md:w-auto">
            <TextInputPrimary
                v-model="password"
                type="password"
                field="password"
                placeholder="Password"
                icon="lockClosedSolid"
            />
        </div>
        <div class="p-4">
            <p
                ref="invalidUser"
                class="text-sm text-red-400 max-h-0 overflow-hidden transition-all"
                :style="{
                    maxHeight: !errorMessage
                        ? '0'
                        : invalidUser?.scrollHeight + 'px',
                }"
            >
                Your username or password is wrong.
            </p>
        </div>
        <button
            type="submit"
            class="bg-primary p-3 md:w-96 rounded-md font-bold border border-black border-2 shadow-lg my-4 w-full"
            @click.prevent="login"
        >
            LOGIN
        </button>
        <div class="flex flex-row justify-between w-full md:w-96">
            <span class="p-1 float-right hover:underline">
                <router-link to="/register" class="hover:text-black"
                    >Not registered?</router-link
                >
            </span>
            <ModalComp>
                <template #button>
                    <span class="p-1 float-right hover:underline text-right">
                        Forgot Password?
                    </span>
                </template>
                <template #modalContent
                    ><aside class="p-6 relative text-center">
                        <p>
                            Did you forget your password?<br />Please enter your
                            E-Mail address below.<br />We will send you an email
                            to reset your password.
                        </p>
                        <div class="p-3">
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
                    </aside></template
                >
            </ModalComp>
        </div>
    </form>
</template>
