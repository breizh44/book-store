<script setup lang="ts">
import type { Book } from '@/types/book.type'

const { book } = defineProps<{ book: Book }>() //en faisant ca on perd la reactivité sur book
// const props = defineProps<{ book: Book }>()
// const book = props.book
</script>

<template>
  <div
    class="bg-gray-200 border border-gray-800 rounded-lg p-4 space-y-2 hover:scale-105 transition-all duration-100"
  >
    <h2 class="text-xl font-bold">{{ book.title }}</h2>
    <p>{{ book.author }}</p>
    <p>{{ book.year }}</p>
    <div>
      <p class="inline rounded-full bg-blue-200 px-4 py-1">{{ book.genre }}</p>
    </div>
  </div>
</template>
