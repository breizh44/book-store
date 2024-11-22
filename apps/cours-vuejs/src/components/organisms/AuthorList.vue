<script setup lang="ts">
import type { Author } from '@/types/author.type'
import SearchBar from '@/components/molecules/SearchBar.vue'
import AuthorCard from '../molecules/AuthorCard.vue'
import { computed, ref } from 'vue'
const { authorList } = defineProps<{ authorList: Author[] }>()
const searchText = ref<string>('')

const sortedFilteredAuthors = computed(() => {
  let filtered: Author[] = []
  if (searchText.value !== '') {
    filtered = authorList.filter((author) => {
      return author.name.toLowerCase().includes(searchText.value.toLowerCase())
    })
  } else {
    filtered = authorList
  }
  console.log(filtered)
  return filtered
})
</script>
<template>
  <div>
    <!-- Recherche -->
    <SearchBar v-model="searchText" />
  </div>
  <!-- Liste Auteurs -->
  <div class="grid grid-cols-3 gap-4 mx-8 my-4">
    <!--grille de 3 colonnes avec un espace entre les colonnes-->
    <AuthorCard v-for="author in sortedFilteredAuthors" :key="author.id" :author="author" />
  </div>
</template>
