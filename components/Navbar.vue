<script lang="ts" setup></script>

<template>
    <nav class="mainbg">
        <NuxtLink id="logo" to="/"><h1>Welcome</h1></NuxtLink>
        Testss
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: 4rem;
    /*
  background-color: #fff;
  */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 200ms linear;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
}

.scrolled {
    background-color: #fff;
    color: #050505;
}

#logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
}
</style>
