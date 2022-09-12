<script lang="ts">
const modalOpen = useState("modalOpen", () => false)

function openModal() {
    modalOpen.value = true
}

function closeModal() {
    modalOpen.value = false
}

export default defineNuxtComponent({
    name: "ModalTest",
    setup() {
        return {
            modalOpen,
            openModal,
            closeModal,
        }
    },
})
</script>

<template>
    <button @click="openModal">Open Modal</button>
    <Teleport to="body">
        <div v-if="modalOpen" class="modal">
            <p>Hello from the modal!</p>
            <button @click="closeModal()">Close</button>
        </div>
    </Teleport>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
