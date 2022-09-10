<script lang="ts" setup>
import { User } from '.prisma/client';

const route = useRoute()

const { data } = await useAsyncData(() =>
  $fetch<User>(`/api/user/${route.params.username}`)
)

const user = data.value
</script>

<template>
  <div>
    <div v-if="user">
      {{ user }}
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<style scoped>

</style>
