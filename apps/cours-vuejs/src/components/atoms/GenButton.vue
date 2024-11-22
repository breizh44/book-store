<script setup lang="ts">
const props = defineProps<{
  text: string
}>()

const emit = defineEmits<{ click: [e: MouseEvent] }>()
</script>

<template>
  <button class="bg-blue-500 text-white border rounded-lg p-2" @click="emit('click', $event)">
    {{ props.text }}
  </button>
</template>
