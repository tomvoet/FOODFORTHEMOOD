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

    if (user) {
        navigateTo("/login")
    }

    console.log(user)
}

const validate = () => {
    var check = true

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
        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
    )

    return regexp.test(password.value)
}

/* explanation of used regex in validatePassword(), if changes are supposed to be made
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
    <form class="registerContainer">
        <h1>Register</h1>
        <div>
            <p v-show="!usernameValid" id="usernameCheck">
                Username must be at least 3 characters
            </p>
            <label for="username">Username</label>
            <input id="username" v-model="username" type="text" />
        </div>
        <div>
            <p v-show="!emailValid" id="emailCheck">Invalid email</p>
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" />
        </div>
        <div>
            <p v-show="!passwordValid" id="passwordCheck">
                Password must be at least 8 characters, contain multiple
                uppercase and lowercase letters, multiple digits and a special
                case letter (!@#$&*)
            </p>
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" />
        </div>
        <div>
            <p v-show="!passwordConfValid" id="passwordConfCheck">
                Passwords do not match
            </p>
            <label for="passwordConfirmation">Confirm Password</label>
            <input
                id="passwordConfirmation"
                v-model="passwordConfirmation"
                type="password"
            />
        </div>
        <button type="submit" @click.prevent="submit">Submit</button>
    </form>
</template>

<style scoped>
.registerContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.registerContainer > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
}

.registerContainer > div > label {
    margin-bottom: 0.5rem;
}

.registerContainer > div > input {
    width: 20rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
}
</style>
