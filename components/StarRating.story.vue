<script lang="ts" setup>
const value = ref(0)
</script>

<template>
    <Story>
        <input v-model="value" type="number" min="0" max="5" />
        <StarRating :rating="value" />
    </Story>
</template>
