import { describe, expect, it } from "vitest"
import { builds, getBuild } from "@/data/builds"
import { sourceMap } from "@/data/sources"
import { skillCost, statBuyCost } from "@/lib/utils"

describe("build content", () => {
  it("publishes exactly ten unique guides", () => {
    expect(builds).toHaveLength(10)
    expect(new Set(builds.map((build) => build.slug)).size).toBe(10)
  })

  it.each(builds)("keeps $title within legal creation budgets", (build) => {
    const xp = build.creation.skills.reduce((total, skill) => total + skillCost(skill.level), 0) + build.creation.abilities.reduce((total, ability) => total + ability.cost, 0)
    expect(statBuyCost(build.creation.boughtStats)).toBeLessThanOrEqual(13)
    expect(xp).toBeLessThanOrEqual(5000)
    expect(xp).toBeGreaterThan(0)
  })

  it.each(builds)("provides a complete concise guide for $title", (build) => {
    expect(build.plan.length).toBeGreaterThan(80)
    expect(build.keyPieces.length).toBeGreaterThanOrEqual(3)
    build.keyPieces.forEach((piece) => {
      expect(piece.name.length).toBeGreaterThan(1)
      expect(piece.effect.length).toBeGreaterThan(20)
      expect(piece.purpose.length).toBeGreaterThan(20)
    })
    expect(build.piloting.steps.length).toBeGreaterThanOrEqual(3)
    expect(build.piloting.positioning.length).toBeGreaterThanOrEqual(2)
    expect(build.piloting.retreatWhen.length).toBeGreaterThanOrEqual(2)
    expect(build.milestones).toHaveLength(4)
    expect(build.credits.length).toBeGreaterThanOrEqual(1)
    build.credits.forEach((credit) => {
      expect(credit.name.length).toBeGreaterThan(1)
      expect(credit.contribution.length).toBeGreaterThan(10)
      expect(() => new URL(credit.url)).not.toThrow()
    })
    expect(build.sourceIds.length).toBeGreaterThan(2)
    build.sourceIds.forEach((id) => {
      const source = sourceMap.get(id)
      expect(source).toBeDefined()
      expect(() => new URL(source!.url)).not.toThrow()
    })
  })

  it("explains the Ring of Secrets opening and required pivot", () => {
    const ring = getBuild("ring-of-secrets-utility-smith")!
    const secretRing = ring.keyPieces.find((piece) => piece.name === "Ring of Secrets")!
    expect(secretRing.effect).toMatch(/grants Alchemy while worn/i)
    expect(secretRing.effect).toMatch(/herbs, potions, staves, and horns/i)
    expect(ring.plan).toMatch(/not an endgame build/i)
    expect(`${ring.plan} ${ring.piloting.steps.join(" ")}`).toMatch(/300′/)
    expect(ring.branches.map((branch) => branch.name)).toEqual(["Melee pivot", "Archery pivot", "Stealth pivot"])
    expect(ring.credits.map((credit) => credit.name)).toEqual(["SvalbardCaretaker", "Thomas Hatzopoulos", "seraph"])
  })
})
