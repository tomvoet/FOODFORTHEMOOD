<script lang="ts" setup>
import { User } from ".prisma/client"

const { data } = await useFetch<{ status: number; users: User[] }>(`/api/user`)

const status = data.value?.status
const users = data.value?.users
</script>

<template>
    <div v-if="status == 200">
        <div v-for="user of users" :key="user.id">
            <NuxtLink :to="'/user/' + user.username">{{ user }}</NuxtLink>
        </div>
    </div>
    <div v-else-if="status == 404">404</div>
    <div v-else>Loading...</div>
</template>

<style scoped></style>
