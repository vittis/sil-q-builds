import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function skillCost(level: number) {
  return (level * (level + 1) * 100) / 2
}

const statCosts: Record<number, number> = {
  [-4]: -4,
  [-3]: -3,
  [-2]: -2,
  [-1]: -1,
  0: 0,
  1: 1,
  2: 3,
  3: 6,
  4: 10,
  5: 15,
  6: 21,
}

export function statBuyCost(values: [number, number, number, number]) {
  return values.reduce((total, value) => total + (statCosts[value] ?? 99), 0)
}
