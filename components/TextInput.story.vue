<script lang="ts" setup>
const propsVariants = [
    {
        modelValue: "",
        placeholder: "Enter your name",
        icon: "userSolid",
        field: "name",
        type: "text",
    },
    {
        modelValue: "",
        placeholder: "Enter your password",
        icon: "lockClosedSolid",
        field: "password",
        type: "password",
    },
    {
        modelValue: "",
        placeholder: "Enter your name",
        field: "name",
        type: "text",
    },
]
</script>

<template>
    <Story :title="'TextInput'" :layout="{ type: 'grid', width: '300px' }">
        <Variant
            v-for="(props, key) of propsVariants"
            :key="key"
            :title="'TextInput ' + key"
        >
            <div class="p-3">
                <TextInput
                    v-model="props.modelValue"
                    :placeholder="props.placeholder"
                    :icon="props.icon"
                    :field="props.field"
                    :type="props.type"
                />
            </div>
        </Variant>
    </Story>
</template>
