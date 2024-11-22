<script setup lang="ts">
import type { Author } from '@/types/author.type'

const { author } = defineProps<{ author: Author }>() //en faisant ca on perd la reactivité sur book
</script>
<template>
  <div class="bg-gray-200 border border-gray-800 rounded-lg p-4 space-y-2">
    <h2 class="text-xl font-bold">{{ author.name }}</h2>
    <div></div>
  </div>
</template>
