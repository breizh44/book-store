<script setup lang="ts">
//const emit = defineEmits<{ onInput: [text: string] }>()
const searchText = defineModel<string>('')
</script>
<template>
  <input
    type="text"
    v-model="searchText"
    placeholder="saisir le filtre"
    class="bg-gray-200 rounded-lg border border-gray-300 my-2"
  />
</template>
