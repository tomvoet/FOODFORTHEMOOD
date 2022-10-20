<script lang="ts" setup>
const username = ref("")
const email = ref("")
const password = ref("")
const passwordConfirmation = ref("")

const usernameValid = ref(true)
const emailValid = ref(true)
const passwordValid = ref(true)
const passwordConfValid = ref(true)

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

    console.log(user)
}

const validate = () => {
    let check = true

    if (username.value.length < 3) {
        usernameValid.value = false
        check = false
    }

    if (!validateEmail()) {
        emailValid.value = false
        check = false
    }

    if (!validatePassword()) {
        passwordValid.value = false
        check = false
    }

    if (password.value !== passwordConfirmation.value) {
        passwordConfValid.value = false
        check = false
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
        <div class="flex flex-col items-center my-4 w-full md:w-auto">
            <p v-show="!usernameValid" id="usernameCheck">
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
        <div class="flex flex-col items-center my-4 w-full md:w-auto">
            <p v-show="!emailValid" id="emailCheck">Invalid email</p>
            <TextInputPrimary
                v-model="email"
                field="email"
                placeholder="Email"
                type="email"
                icon="envelopeSolid"
            />
        </div>
        <div class="flex flex-col items-center my-4 w-full md:w-auto">
            <p v-show="!passwordValid" id="passwordCheck">
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
        <div class="flex flex-col items-center my-4 w-full md:w-auto">
            <p v-show="!passwordConfValid" id="passwordConfCheck">
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
