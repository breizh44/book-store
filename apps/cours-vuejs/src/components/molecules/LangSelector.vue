<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()

const currentLang = ref<string>('')

const onLangChange = (lang: string) => {
  locale.value = lang
  router.push({
    path: route.path,
    query: { ...route.query, lang: lang },
  })

  onMounted(async () => {
    currentLang.value = (route.query.lang as string) || 'en'
    locale.value = currentLang.value
    console.log(currentLang.value)
  })
}
</script>

<template>
  <select
    :value="currentLang"
    class="px-3 py-1 rounded-lg my-2 text-black"
    @change="onLangChange(($event.target as HTMLSelectElement).value)"
  >
    <option value="fr">Français</option>
    <option value="en">English</option>
  </select>
</template>
