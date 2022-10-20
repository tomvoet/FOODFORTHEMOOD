<script lang="ts" setup>
defineProps<{
    modelValue: string
    placeholder: string
    icon?: string
    field: string
    type?: string
}>()

const modelEmits = defineEmits<{
    (e: "update:modelValue", value: string): void
}>()

const updateModel = (event: Event) => {
    const textfield = event.target as HTMLInputElement
    modelEmits("update:modelValue", textfield.value)
}
</script>

<template>
    <div class="w-full">
        <div class="relative mt-1 rounded-md shadow-sm w-full">
            <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2"
            >
                <IconWrapper
                    v-if="icon"
                    :icon="icon"
                    :classes="'text-gray-500 h-6 w-6'"
                />
            </div>
            <input
                :name="field"
                :type="type || 'text'"
                :placeholder="placeholder"
                class="block w-full md:w-96 border rounded-md p-2 pl-9 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                :value="modelValue"
                @input="updateModel"
            />
        </div>
    </div>
</template>
