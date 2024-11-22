<script setup lang="ts">
import GenButton from '@/components/atoms/GenButton.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const title = ref<string>('')
const year = ref<string>('')
const genre = ref<string>('')

const resultMsg = ref<string>('')

const router = useRouter()

const addbook = async () => {
  const response = await axios.post('http://localhost:4000/books', {
    title: title.value,
    //author: author.value,
    year: year.value,
    genre: genre.value,
  })
  if (response.status === 200) {
    resultMsg.value = 'Book added successfully'

    setTimeout(() => {
      router.push('/')
    }, 1000)
  } else {
    resultMsg.value = 'Error'
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <h1>This is an create book page</h1>
    <label for="title">{{ $t('book.title') }}</label>
    <input
      class="bg-gray-200 text-black rounded-lg px-2 py-1"
      type="text"
      id="title"
      v-model="title"
    />
    <label for="year">{{ $t('book.year') }}</label>
    <input
      class="bg-gray-200 text-black rounded-lg px-2 py-1"
      type="text"
      id="year"
      v-model="year"
    />
    <label for="genre">{{ $t('book.genre') }}</label>
    <input
      class="bg-gray-200 text-black rounded-lg px-2 py-1"
      type="text"
      id="genre"
      v-model="genre"
    />

    <p class="text-green-500">{{ resultMsg }}</p>
    <GenButton class="block" :text="$t('book.action.add')" @click="addbook" />
  </div>
</template>
