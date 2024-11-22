<script setup lang="ts">
import WeldingProgramDisplay from '@/components/organisms/WeldingProgramDisplay.vue'
import type { WeldingProgram } from '@/types/types'

const weldingProgram: WeldingProgram = {
  sectors: [
    { id: '1', name: 'Secteur A' },
    { id: '2', name: 'Secteur B' },
    { id: '3', name: 'Secteur C' },
  ],
  equipments: [
    {
      id: 'eq1',
      name: 'Équipement 1',
      functions: [
        {
          id: 'f1',
          name: 'Fonction 1',
          parameters: 'Param 1',
          startSectorId: '1',
          endSectorId: '2',
        },
        {
          id: 'f2',
          name: 'Fonction 2',
          parameters: 'Param 2',
          startSectorId: '2',
          endSectorId: '3',
        },
      ],
    },
  ],
}
</script>
<template>
  <div class="WeldingProgramsView">
    <h1>This is the weldingProgram page</h1>
    <WeldingProgramDisplay :program="weldingProgram" />
  </div>
</template>
