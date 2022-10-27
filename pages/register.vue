<script lang="ts" setup>
import { Ref } from "vue"

const username = ref("")
const email = ref("")
const password = ref("")
const passwordConfirmation = ref("")

const usernameValid = ref(true)
const emailValid = ref(true)
const passwordValid = ref(true)
const passwordConfValid = ref(true)

const usernameCheck: Ref<HTMLParagraphElement | null> = ref(null)
const emailCheck: Ref<HTMLParagraphElement | null> = ref(null)
const passwordCheck: Ref<HTMLParagraphElement | null> = ref(null)
const passwordConfCheck: Ref<HTMLParagraphElement | null> = ref(null)

const register = async () => {
    const user = await useFetch("/api/auth/register", {
        method: "POST",
        body: {
            username: username.value,
            email: email.value,
            password: password.value,
        },
    })

    if (user) navigateTo("/login")
}

const validate = () => {
    let check = true

    if (username.value.length < 3) {
        usernameValid.value = false
        check = false
    } else {
        usernameValid.value = true
    }

    if (!validateEmail()) {
        emailValid.value = false
        check = false
    } else {
        emailValid.value = true
    }

    if (!validatePassword()) {
        passwordValid.value = false
        check = false
    } else {
        passwordValid.value = true
    }

    if (password.value !== passwordConfirmation.value) {
        passwordConfValid.value = false
        check = false
    } else {
        passwordConfValid.value = true
    }

    if (check) {
        register()
    }
}

function validateEmail(): boolean {
    const regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

    return regexp.test(email.value)
}

function validatePassword(): boolean {
    const regexp = new RegExp(
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/
    )

    return regexp.test(password.value)
}

/* explanation of used regex in validatePassword(), if changes are supposed to be made
example for valid password TestT!234
^                         Start anchor
(?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
(?=.*[!@#$&*])            Ensure string has one special case letter.
(?=.*[0-9].*[0-9])        Ensure string has two digits.
(?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
.{8}                      Ensure string is of length 8.
$                         End anchor. */

const submit = () => {
    validate()
}

setMetadata("Register", "Register for an account.")
</script>

<template>
    <form
        class="flex flex-col items-center justify-center h-[80vh] md:p-0 p-16"
    >
        <h2 class="text-5xl font-bold mb-4">Register</h2>
        <div class="flex flex-col items-center my-4 w-full md:w-96">
            <p
                ref="usernameCheck"
                class="text-sm text-red-400 max-h-0 overflow-hidden transition-all"
                :style="{
                    maxHeight: usernameValid
                        ? '0'
                        : usernameCheck?.scrollHeight + 'px',
                }"
            >
                Username must be at least 3 characters
            </p>
            <TextInputPrimary
                v-model="username"
                field="username"
                type="text"
                placeholder="Username"
                icon="userSolid"
            />
        </div>
        <div class="flex flex-col items-center my-4 w-full md:w-96">
            <p
                ref="emailCheck"
                class="text-sm text-red-400 max-h-0 overflow-hidden transition-all"
                :style="{
                    maxHeight: emailValid
                        ? '0'
                        : emailCheck?.scrollHeight + 'px',
                }"
            >
                Invalid email
            </p>
            <TextInputPrimary
                v-model="email"
                field="email"
                placeholder="Email"
                type="email"
                icon="envelopeSolid"
            />
        </div>
        <div class="flex flex-col items-center my-4 w-full w-full md:w-96">
            <p
                ref="passwordCheck"
                class="text-sm text-red-400 max-h-0 overflow-hidden transition-all"
                :style="{
                    maxHeight: passwordValid
                        ? '0'
                        : passwordCheck?.scrollHeight + 'px',
                }"
            >
                Password must be at least 8 characters, contain multiple
                uppercase and lowercase letters, multiple digits and a special
                case letter (!@#$&*)
            </p>
            <TextInputPrimary
                v-model="password"
                type="password"
                field="password"
                placeholder="Password"
                icon="lockClosedSolid"
            />
        </div>
        <div class="flex flex-col items-center my-4 w-full md:w-96">
            <p
                ref="passwordConfCheck"
                class="text-sm text-red-400 max-h-0 overflow-hidden transition-all"
                :style="{
                    maxHeight: passwordConfValid
                        ? '0'
                        : passwordConfCheck?.scrollHeight + 'px',
                }"
            >
                Passwords do not match
            </p>
            <TextInputPrimary
                v-model="passwordConfirmation"
                type="password"
                field="passwordConfirmation"
                placeholder="Confirm Password"
                icon="checkSolid"
            />
        </div>
        <button
            type="submit"
            class="bg-primary p-3 md:w-96 rounded-md font-bold border border-black border-2 shadow-lg my-4 w-full"
            @click.prevent="submit"
        >
            REGISTER
        </button>
        <span
            >Already Have An Account?
            <NuxtLink to="/login" class="underline">Sign In</NuxtLink></span
        >
    </form>
</template>
