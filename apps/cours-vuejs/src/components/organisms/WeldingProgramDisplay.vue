<script setup lang="ts">
import { defineProps, ref, type StyleValue } from 'vue'
import type { WeldingProgram, WeldingEquipment, WeldingFunction } from '@/types/types'

// Props du composant
const { program } = defineProps<{ program: WeldingProgram }>()

// État local basé sur la prop "program"
const localProgram = ref({ ...program, equipments: [...program.equipments] })

// Fonction pour calculer les styles des fonctions de soudage
const getFunctionStyle = (functionItem: WeldingFunction): StyleValue => {
  const sectors = program.sectors
  const startIndex = sectors.findIndex((sector) => sector.id === functionItem.startSectorId)
  const endIndex = sectors.findIndex((sector) => sector.id === functionItem.endSectorId)

  if (startIndex === -1 || endIndex === -1) {
    console.warn(`Secteurs introuvables pour la fonction ${functionItem.name}`)
    return {}
  }

  // Calcul de la largeur et de la position
  const totalSectors = sectors.length
  const widthPercentage = ((endIndex - startIndex + 1) / totalSectors) * 100
  const leftPercentage = (startIndex / totalSectors) * 100

  return {
    width: `${widthPercentage}%`,
    left: `${leftPercentage}%`,
    position: 'absolute',
  }
}

// Ajouter un nouvel équipement
const addEquipment = () => {
  const newEquipment: WeldingEquipment = {
    id: `eq${localProgram.value.equipments.length + 1}`,
    name: `Équipement ${localProgram.value.equipments.length + 1}`,
    functions: [],
  }

  // Ajoute l'équipement au programme
  localProgram.value.equipments.push(newEquipment)
}
</script>
<template>
  <div class="relative w-full h-full border rounded-lg shadow-md overflow-hidden">
    <!-- Zone scrollable -->
    <div class="overflow-auto w-full h-full">
      <!-- Tableau principal -->
      <div class="min-w-[800px]">
        <!-- En-tête : Liste des secteurs -->
        <div class="flex border-b sticky top-0 bg-white">
          <div class="w-1/5 p-2 font-bold bg-gray-100 text-center">Équipements</div>
          <div
            v-for="sector in program.sectors"
            :key="sector.id"
            class="w-1/5 p-2 text-center border-l"
          >
            {{ sector.name }}
          </div>
        </div>

        <!-- Corps : Liste des équipements et fonctions -->
        <div v-for="equipment in localProgram.equipments" :key="equipment.id" class="flex border-b">
          <!-- Nom de l'équipement -->
          <div class="w-1/5 p-2 bg-gray-50 text-center font-medium border-r">
            {{ equipment.name }}
          </div>

          <!-- Fonctions de soudage -->
          <div class="relative flex-grow w-full h-12">
            <template v-for="functionItem in equipment.functions" :key="functionItem.id">
              <div
                :style="getFunctionStyle(functionItem)"
                class="absolute p-2 m-1 rounded bg-blue-500 text-white text-center shadow hover:bg-blue-600"
              >
                <div>{{ functionItem.name }}</div>
                <div class="text-sm italic">{{ functionItem.parameters }}</div>
              </div>
            </template>
          </div>
        </div>

        <!-- Bouton "Ajouter un équipement" -->
        <div class="flex">
          <div class="w-1/5 p-2 text-center border-r">
            <button
              @click="addEquipment"
              class="w-full p-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
            >
              +
            </button>
          </div>
          <div class="w-4/5"></div>
        </div>
      </div>
    </div>
  </div>
</template>
