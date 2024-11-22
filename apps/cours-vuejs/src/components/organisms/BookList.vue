<script setup lang="ts">
import SortBar from '@/components/SortBar.vue'
import SearchBar from '@/components/molecules/SearchBar.vue'
import type { Book } from '@/types/book.type'
import BookCard from '../molecules/BookCard.vue'
import GenreFilter from '../molecules/GenreFilter.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { bookList } = defineProps<{ bookList: Book[] }>()

const sortDirection = ref<'asc' | 'desc'>((route.query.sortDirection as 'asc' | 'desc') || 'asc') //valeur par défaut = asc ou valeur récupérée dans la route
const sortBy = ref<keyof Book>((route.query.sortBy as keyof Book) || 'title') //valeur par défaut = title ou valeur récupérée dans la route
const selectedGenre = ref<string>('All')
const searchText = ref<string>('')

const genreList = () => {
  const genres = new Set(bookList.map((book) => book.genre))
  return ['All', ...genres]
}

const sortedFilteredBooks = computed(() => {
  let filtered: Book[] = []
  if (searchText.value === '') {
    filtered = bookList.filter((book) => {
      if (selectedGenre.value === 'All') {
        return true
      } else {
        return book.genre === selectedGenre.value
      }
    })
  } else {
    filtered = bookList.filter((book) => {
      return book.title.toLowerCase().includes(searchText.value.toLowerCase())
    })
  }

  const sorted = filtered.sort((a, b) => {
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]

    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
  return sorted
})

// const filterKey = {
//   title: 'Titre',
//   author: 'Auteur',
//   year: 'Année',
//   genre: 'Genre',
// }

const sortBooks = (sortKey: keyof Book) => {
  sortBy.value = sortKey
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <div>
    <!--Liste des genres-->
    <GenreFilter :genre-list="genreList()" v-model:genre="selectedGenre"></GenreFilter>
    <!-- Recherche -->
    <SearchBar v-model="searchText" />
  </div>

  <!--Bouton de tri des livres-->
  <SortBar v-model:sort-by="sortBy" v-model:sort-direction="sortDirection" />

  <!-- Liste livres -->
  <div class="grid grid-cols-3 gap-4 mx-8 my-4">
    <!--grille de 3 colonnes avec un espace entre les colonnes-->
    <BookCard v-for="book in sortedFilteredBooks" :key="book.id" :book="book" />
  </div>
</template>
