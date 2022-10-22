<script lang="ts" setup>
const props = defineProps<{
    modelValue: string
    placeholder: string
    field: string
}>()

const textArea = ref(null as HTMLTextAreaElement | null)

const modelEmits = defineEmits<{
    (e: "update:modelValue", value: string): void
}>()

const updateModel = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement
    modelEmits("update:modelValue", textarea.value)

    textarea.style.height = textarea.scrollHeight + "px"
}

onMounted(() => {
    if (textArea.value && !props.modelValue) {
        textArea.value.style.height = textArea.value.scrollHeight + "px"
    }
})
</script>

<template>
    <div class="w-full">
        <label :for="field" class="block font-medium text-gray-700">{{
            field
        }}</label>
        <textarea
            ref="textArea"
            rows="1"
            :name="field"
            :placeholder="placeholder"
            class="block border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none w-full h-auto overflow-hidden"
            :value="modelValue"
            @input="updateModel"
        />
    </div>
</template>
