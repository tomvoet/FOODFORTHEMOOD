<script lang="ts" setup>
const username = ref("")
const email = ref("")
const password = ref("")
const passwordConfirmation = ref("")

const register = async () => {
    const user = await useFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
        }),
    })

    if (user) {
        const router = useRouter()
        router.push("/")
    }

    console.log(user)
}

const validate = () => {
    if (password.value !== passwordConfirmation.value) {
        console.log("Passwords do not match")
    } else {
        register()
    }
}

const validateEmail = () => {
    if (!email.value.includes("@")) {
        console.log("Invalid email")
    } else {
        validate()
    }
}

const validatePassword = () => {
    if (password.value.length < 8) {
        console.log("Password must be at least 8 characters")
    } else {
        validateEmail()
    }
}

const validateUsername = () => {
    if (username.value.length < 3) {
        console.log("Username must be at least 3 characters")
    } else {
        validatePassword()
    }
}

const submit = () => {
    validateUsername()
}

setMetadata("Register", "Register for an account.")
</script>

<template>
    <form class="registerContainer">
        <h1>Register</h1>
        <div>
            <label for="username">Username</label>
            <input id="username" v-model="username" type="text" />
        </div>
        <div>
            <label for="email">Email</label>
            <input id="email" v-model="email" type="text" />
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" />
        </div>
        <div>
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
