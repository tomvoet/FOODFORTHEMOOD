<script lang="ts" setup>
const route = useRoute()
const token = route.query.token
const password = ref("")
const passwordConfirmation = ref("")

const passwordValid = ref(true)
const passwordConfValid = ref(true)

const resetPassword = async () => {
    const user = await useFetch("/api/auth/change_password", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: {
            password: password.value,
        },
    })

    if (user) {
        navigateTo("/login")
    }

    console.log(user)
    console.log("testreset")
}

const validate = () => {
    var check = true

    if (!validatePassword()) {
        passwordValid.value = false
        check = false
    }

    if (password.value !== passwordConfirmation.value) {
        passwordConfValid.value = false
        check = false
    }

    if (check) {
        resetPassword()
    }
}

function validatePassword(): boolean {
    const regexp = new RegExp(
        /^(?=.*[A-Z])(?=.*[#?!@$%^&*-])(?=.*[0-9])(?=.*[a-z]).{8,}$/
    )

    return regexp.test(password.value)
}
</script>

<template>
    <form class="max-w-max p-3">
        <h1 class="text-2xl font-bold">Reset Password</h1>
        <p v-show="!passwordValid" id="passwordCheck">
            Password must be at least 8 characters, contain multiple uppercase
            and lowercase letters, multiple digits and a special case letter
            (!@#$&*)
        </p>
        <TextInput
            v-model="password"
            placeholder="Enter new password"
            icon="lockClosedSolid"
            field="Password"
            type="password"
        ></TextInput>
        <p v-show="!passwordConfValid" id="passwordConfCheck">
            Passwords do not match
        </p>
        <TextInput
            v-model="passwordConfirmation"
            placeholder="Confirm new password"
            icon="lockClosedSolid"
            field="Confirm Password"
            type="password"
        ></TextInput>
        <button
            type="submit"
            class="border p-1 float-right rounded-[.35em] hover:bg-blue-500 hover:text-white"
            @click.prevent="validate"
        >
            Submit
        </button>
    </form>
    <!--zwei inputs pw pwconf, submit button, überschrift-->
</template>

<style scoped></style>
