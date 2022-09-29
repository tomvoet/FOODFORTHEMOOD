<script lang="ts" setup>
const { data } = await useFetch(`/api/user`)

const status = data.value?.status
const users = data.value?.users

setMetadata("Users", "List of all users.")
</script>

<template>
    <div v-if="status == 200">
        <div v-for="user of users" :key="user.username">
            <NuxtLink :to="'/user/' + user.username">{{ user }}</NuxtLink>
        </div>
    </div>
    <div v-else-if="status == 404">404</div>
    <div v-else>Loading...</div>
</template>

<style scoped></style>
