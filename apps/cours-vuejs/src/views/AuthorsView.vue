<script setup lang="ts">
import type { Author } from '@/types/author.type'
import AuthorList from '@/components/organisms/AuthorList.vue'
import axios from 'axios'
import { ref } from 'vue'

const authorList = ref<Author[]>([])
const authors = await axios.get('http://localhost:4000/authors')
authorList.value = authors.data
console.log(authorList.value)
</script>
<template>
  <div class="about">
    <h1>This is an Authors page</h1>
    <AuthorList :author-list="authorList" />
  </div>
</template>
