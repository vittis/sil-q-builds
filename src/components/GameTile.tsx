import type { CSSProperties } from "react"

const tilePositions = {
  noldor: [0, 13],
  sword: [3, 6],
  curvedSword: [1, 6],
  shield: [18, 5],
  bow: [29, 5],
  dagger: [0, 6],
  cloak: [2, 5],
  spear: [9, 6],
  ring: [29, 11],
  greatSpear: [10, 6],
  greatAxe: [15, 6],
  mithrilSword: [4, 6],
} as const

export const buildTiles: Record<string, keyof typeof tilePositions> = {
  "elbereth-archer": "bow",
  "dodging-flanking-duelist": "curvedSword",
  "adversity-vengeance-juggernaut": "shield",
  "shield-archer": "bow",
  "stealth-assassin": "dagger",
  "pure-stealth-pacifist": "cloak",
  "thresholds-controller": "noldor",
  "porcupine-light-spear-smith": "spear",
  "ring-of-secrets-utility-smith": "ring",
  "defensive-polearm": "greatSpear",
  "smash-smash-smash": "greatAxe",
}

export function GameTile({ name, size = 32, className = "" }: { name: keyof typeof tilePositions; size?: number; className?: string }) {
  const [x, y] = tilePositions[name]
  const style = {
    width: size,
    height: size,
    backgroundSize: `${32 * size}px ${17 * size}px`,
    backgroundPosition: `${-x * size}px ${-y * size}px`,
  } satisfies CSSProperties

  return <span className={`game-tile ${className}`} style={style} aria-hidden="true" />
}
