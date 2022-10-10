<script lang="ts" setup>
const text = ref("")
const pw = ref("")

const printText = () => {
    console.log(text.value)
}
</script>

<template>
    <div class="p-6 w-1/2">
        <TextInput
            v-model="text"
            type="text"
            placeholder="Enter username here"
            icon="userSolid"
            field="Username"
        /><TextInput
            v-model="pw"
            type="password"
            placeholder="Enter password here"
            icon="lockClosedSolid"
            field="Password"
        /><TextInput
            v-model="text"
            type="text"
            placeholder="KEINE ICONS"
            field="Password"
        /><button class="shadow-sm" @click="printText">test</button>
    </div>
</template>
