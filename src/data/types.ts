export type SourceKind = "Official manual" | "Source code" | "Developer advice" | "Ladder evidence" | "Community guide"

export interface SourceRef {
  id: string
  title: string
  url: string
  kind: SourceKind
  note: string
}

export interface SkillAllocation {
  name: string
  level: number
}

export interface StartingAbility {
  name: string
  cost: number
  note?: string
}

export interface CharacterCreation {
  race: string
  house: string
  stats: { str: number; dex: number; con: number; gra: number }
  boughtStats: [number, number, number, number]
  affinities: string[]
  skills: SkillAllocation[]
  abilities: StartingAbility[]
  note: string
}

export interface BuildMilestone {
  band: string
  title: string
  priorities: string[]
  adapt: string
}

export interface BuildKeyPiece {
  name: string
  kind: "Ability" | "Item" | "Mechanic"
  effect: string
  purpose: string
  timing?: string
}

export interface BuildPiloting {
  gameplayLoop: string[]
  positioning: string[]
  retreatWhen: string[]
}

export interface BuildCredit {
  name: string
  contribution: string
  url: string
}

export interface BuildGuide {
  slug: string
  title: string
  shortTitle: string
  beginner: boolean
  archetype: string
  combatStyle: string
  primarySkills: string[]
  weaponStyle: string
  smithing: boolean
  stealth: boolean
  summary: string
  plan: string
  corePieces: BuildKeyPiece[]
  creation: CharacterCreation
  optionalAbilities: string[]
  piloting: BuildPiloting
  milestones: BuildMilestone[]
  gear: string[]
  resistances: string[]
  consumables: string[]
  dangers: string[]
  escapePlan: string[]
  mistakes: string[]
  branches: { name: string; description: string }[]
  spoiler: string[]
  credits: BuildCredit[]
  sourceIds: string[]
}

export interface PrimerSection {
  id: string
  title: string
  eyebrow: string
  intro: string
  points: { title: string; body: string }[]
  sourceIds: string[]
}
