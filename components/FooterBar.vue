<script lang="ts" setup></script>

<template>
    <footer>
        <NuxtLink to="/about">About</NuxtLink>
    </footer>
</template>

<style scoped>
footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    background-color: #fff;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 200ms linear;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
}
</style>
