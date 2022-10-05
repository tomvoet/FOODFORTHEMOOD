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
    var check = 0;

    var emailCheck = validateEmail()

    var passwordCheck = validatePassword()

    if (password.value !== passwordConfirmation.value) {
        document.getElementById("passwordConfCheck")!.innerText = "Passwords do not match";
        check = 1;
    }
    if (!emailCheck){
        document.getElementById("emailCheck")!.innerText = "Invalid email";
        check = 1;
    }
    if(!passwordCheck) {
        document.getElementById("passwordCheck")!.innerText = "Password must be at least 8 characters, contain multiple uppercase and lowercase letters, multiple digits and a special case letter (!@#$&*)";
        check = 1;
    }
    if(username.value.length < 3) {
        document.getElementById("usernameCheck")!.innerText = "Username must be at least 3 characters";
        check = 1;
    }
    if(check == 0) {
        register()
    } 
}

function validateEmail(): boolean {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return regexp.test(email.value)
}

function validatePassword(): boolean {
    const regexp = new RegExp(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/);

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
    document.getElementById("usernameCheck")!.innerText = "";
    document.getElementById("passwordConfCheck")!.innerText = "";
    document.getElementById("passwordCheck")!.innerText = "";
    document.getElementById("emailCheck")!.innerText = "";
    validate()
}

setMetadata("Register", "Register for an account.")
</script>

<template>
    <form class="registerContainer">
        <h1>Register</h1>
        <div>
            <p id="usernameCheck"></p>
            <label for="username">Username</label>
            <input id="username" v-model="username" type="text" />
        </div>
        <div>
            <p id="emailCheck"></p>
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" />
        </div>
        <div>
            <p id="passwordCheck"></p>
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" />
        </div>
        <div>
            <p id="passwordConfCheck"></p>
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
