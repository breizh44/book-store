export interface WeldingSector {
  id: string
  name: string
}

export interface WeldingFunction {
  id: string
  name: string
  parameters: string
  startSectorId: string // ID du secteur de début
  endSectorId: string // ID du secteur de fin
}

export interface WeldingEquipment {
  id: string
  name: string
  functions: WeldingFunction[]
}

export interface WeldingProgram {
  sectors: WeldingSector[]
  equipments: WeldingEquipment[]
}
