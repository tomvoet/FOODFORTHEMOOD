<template>
    <span class="text-3xl font-bold">
        <nuxt-picture
            :src="'img/nudel.webp'"
            alt="Loading..."
            class="w-50 h-50 mr-3 animate-spin float-left"
            sizes="sm:80vw md:7vw"
        />
        <!--
    <svg
        class="animate-spin h-9 w-9 mr-3 float-left"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
    >
        <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#ff7d7d"
            stroke-width="10"
            r="35"
            stroke-dasharray="164.93361431346415 56.97787143782138"
            transform="matrix(1,0,0,1,0,0)"
        ></circle></svg
    >-->Loading...<nuxt-picture
            :src="'img/nudel.webp'"
            alt="Loading..."
            class="w-50 h-50 mr-3 animate-spin float-right"
            sizes="sm:80vw md:7vw"
        />
    </span>
</template>
