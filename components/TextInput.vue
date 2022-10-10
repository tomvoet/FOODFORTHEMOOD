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
        <label :for="field" class="block text-sm font-medium text-gray-700">{{
            field
        }}</label>
        <div class="relative mt-1 rounded-md shadow-sm">
            <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2"
            >
                <IconWrapper
                    v-if="icon"
                    :icon="icon"
                    :classes="'text-gray-500 h-4 w-4'"
                />
            </div>
            <input
                :name="field"
                :type="type || 'text'"
                :placeholder="placeholder"
                class="block w-full border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="icon ? 'pl-7' : ''"
                :value="modelValue"
                @input="updateModel"
            />
        </div>
    </div>
</template>
