<script lang="ts" setup>
//import Toast from "~~/utils/toast"

type Toast = {
    message: string
    type: "success" | "error" | "info"
    start: Date
}

const duration = 3000

const toasts = computed(() => useToasts().value) //doesnt update otherwise

watch(
    toasts,
    () => {
        //remove all toasts that are older than 3 seconds
        if (toasts.value.length === 0) return
        setTimeout(() => {
            useToasts().value = useToasts().value.filter((toast) => {
                return toast.start.getTime() + duration > new Date().getTime()
            })
        }, duration)
    },
    {
        deep: true,
    }
)

const removeToast = (toast: Toast) => {
    useToasts().value = useToasts().value.filter((t) => t !== toast)
}
</script>

<template>
    <Teleport to="body">
        <div
            class="fixed bottom-0 left-0 w-full flex flex-col z-50 items-center"
        >
            <TransitionGroup
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <div
                    v-for="toast in toasts"
                    :key="toast.message"
                    class="flex flex-row justify-between p-3 my-1 w-10/12 md:w-1/3 rounded-lg shadow-md border-2 text-white font-semibold"
                    :class="{
                        'bg-green-500': toast.type === 'success',
                        'border-green-400': toast.type === 'success',
                        'bg-red-500': toast.type === 'error',
                        'border-red-400': toast.type === 'error',
                        'bg-blue-500': toast.type === 'info',
                        'border-blue-400': toast.type === 'info',
                    }"
                >
                    <div>
                        {{ toast.message }}
                    </div>
                    <div class="cursor-pointer" @click="removeToast(toast)">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div></div
            ></TransitionGroup></div
    ></Teleport>
</template>
