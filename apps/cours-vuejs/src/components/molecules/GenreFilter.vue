<script lang="ts" setup>
const { genreList } = defineProps<{ genreList: string[] }>()

const genre = defineModel<string>('genre')
// const emits = defineEmits<{
//   onSelect: [genre: string]
// }>()
</script>

<template>
  <select v-model="genre" class="px-3 py-2 rounded-lg my-2">
    <option v-for="genre in genreList" :key="genre" :value="genre">
      {{ genre }}
    </option>
  </select>
</template>
