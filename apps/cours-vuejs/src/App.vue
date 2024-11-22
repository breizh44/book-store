<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import LangSelector from '@/components/molecules/LangSelector.vue'
</script>

<template>
  <header class="p-3 flex flex-row items-center bg-gray-900">
    <img alt="Vue logo" class="h-14" src="@/assets/book-logo.png" />
    <nav class="ml-5 flex flex-row items-center gap-4 text-white font-bold text-lg">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/authors">Authors</RouterLink>
      <RouterLink to="/weldingProgram">WeldingProgram</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <LangSelector />
    </nav>
  </header>

  <Suspense>
    <!-- Suspense permet de ne pas bloquer l'affichage de la page - permet d'attendre que Axios ai fini de recuperer les données-->
    <RouterView />
  </Suspense>
</template>
