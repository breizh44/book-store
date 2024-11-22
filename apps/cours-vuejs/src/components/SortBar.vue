<script setup lang="ts">
import type { Book } from '@/types/book.type'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sortBy = defineModel<keyof Book>('sortBy')
const sortDirection = defineModel<'asc' | 'desc'>('sortDirection')

const sortBooks = (sortKey: keyof Book) => {
  const newDirection = sortDirection.value === 'asc' ? 'desc' : 'asc'
  sortBy.value = sortKey
  sortDirection.value = newDirection

  //ajout des paramètres de tri dans la route
  router.push({
    path: route.path,
    query: { ...route.query, sortBy: sortKey, sortDirection: newDirection },
  })
}
</script>

<template>
  <button
    v-for="(value, key, index) in {
      title: $t(`booklist.sort.keys.title`),
      author: $t(`booklist.sort.keys.author`),
      year: $t(`booklist.sort.keys.year`),
      genre: $t(`booklist.sort.keys.genre`),
    }"
    :key="index"
    @click="sortBooks(key)"
    class="px-4 py-2 rounded-lg ml-2"
    :class="[sortBy === key ? 'bg-blue-500 text-white ' : 'bg-gray-200 text-black']"
  >
    Trier par {{ value }}
    <span v-if="sortBy === key" class="ml-1">
      {{ sortDirection === 'asc' ? '▲' : '▼' }}
    </span>
  </button>
</template>
