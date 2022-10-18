<script lang="ts" setup>
const modalOpen = ref(false)

const openModal = () => {
    modalOpen.value = true
}

const closeModal = () => {
    modalOpen.value = false
}
</script>

<template>
    <button @click.prevent="openModal">
        <slot name="button" class="test" @click="openModal" />
    </button>
    <Teleport to="body">
        <div
            v-if="modalOpen"
            class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center z-50"
            @click.self="closeModal"
        >
            <aside class="bg-white rounded-lg p-6 relative">
                <button
                    class="absolute top-3 right-3 leading-3 h-6 w-6 text-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md"
                    @click="closeModal()"
                >
                    &times;
                </button>
                <slot name="modalContent" />
            </aside>
        </div>
    </Teleport>
</template>

<style scoped></style>
