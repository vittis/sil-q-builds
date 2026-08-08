import { describe, expect, it } from "vitest"
import { builds, getBuild } from "@/data/builds"
import { sourceMap } from "@/data/sources"
import { skillCost, statBuyCost } from "@/lib/utils"

describe("build content", () => {
  it("publishes exactly eleven unique guides", () => {
    expect(builds).toHaveLength(11)
    expect(new Set(builds.map((build) => build.slug)).size).toBe(11)
    expect(builds.map((build) => build.slug)).toEqual(expect.arrayContaining(["elbereth-archer", "shield-archer", "defensive-polearm", "smash-smash-smash", "thresholds-controller"]))
    expect(builds.map((build) => build.slug)).not.toEqual(expect.arrayContaining(["fingolfin-elbereth-hybrid", "point-blank-blocking-archer", "polearm-control-fighter", "rapid-attack-two-weapon"]))
  })

  it.each(builds)("keeps $title within legal creation budgets", (build) => {
    const xp = build.creation.skills.reduce((total, skill) => total + skillCost(skill.level), 0) + build.creation.abilities.reduce((total, ability) => total + ability.cost, 0)
    expect(statBuyCost(build.creation.boughtStats)).toBeLessThanOrEqual(13)
    expect(xp).toBeLessThanOrEqual(5000)
    expect(xp).toBeGreaterThan(0)
  })

  it.each(builds)("provides a complete concise guide for $title", (build) => {
    expect(build.plan.length).toBeGreaterThan(80)
    expect(build.corePieces.length).toBeGreaterThanOrEqual(2)
    build.corePieces.forEach((piece) => {
      expect(piece.name.length).toBeGreaterThan(1)
      expect(piece.effect.length).toBeGreaterThan(20)
      expect(piece.purpose.length).toBeGreaterThan(20)
    })
    expect(build.optionalAbilities.length).toBeGreaterThanOrEqual(3)
    expect(build.piloting.gameplayLoop.length).toBeGreaterThanOrEqual(3)
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
    const secretRing = ring.corePieces.find((piece) => piece.name === "Ring of Secrets")!
    expect(secretRing.effect).toMatch(/grants Alchemy while worn/i)
    expect(secretRing.effect).toMatch(/herbs, potions, staves, and horns/i)
    expect(ring.plan).toMatch(/not an endgame build/i)
    expect(`${ring.plan} ${ring.piloting.gameplayLoop.join(" ")}`).toMatch(/300′/)
    expect(ring.branches.map((branch) => branch.name)).toEqual(["Melee pivot", "Archery pivot", "Stealth pivot"])
    expect(ring.credits.map((credit) => credit.name)).toEqual(["SvalbardCaretaker", "Thomas Hatzopoulos", "seraph"])
  })

  it("makes Gondolin and Doriath the named signature spears of the Porcupine build", () => {
    const porcupine = getBuild("porcupine-light-spear-smith")!
    const guideText = JSON.stringify(porcupine)
    const namedSpears = porcupine.corePieces.find((piece) => piece.name === "Gondolin and Doriath slay spears")!
    expect(namedSpears.timing).toBeUndefined()
    expect(porcupine.gear.join(" ")).toMatch(/Inscribe.*@w1.*@w2.*Press w followed by 1 or 2/i)
    expect(guideText.match(/Gondolin/g)?.length).toBeGreaterThanOrEqual(4)
    expect(guideText.match(/Doriath/g)?.length).toBeGreaterThanOrEqual(4)
  })

  it("makes Charge and Sprinting the repeatable Smash loop while keeping Smite later", () => {
    const smash = getBuild("smash-smash-smash")!
    expect(smash.corePieces.map((piece) => piece.name)).toEqual(["Power", "Charge", "Sprinting"])
    expect(smash.piloting.gameplayLoop.join(" ")).toMatch(/approach.*Charge.*Sprinting.*another Charge/i)
    expect(smash.optionalAbilities.join(" ")).toMatch(/Smite.*later/i)
    expect(smash.mistakes.join(" ")).toMatch(/Standing still and trading/i)
  })

  it("teaches Defensive Polearm to intercept, knock back, and repeat without neglecting Evasion", () => {
    const polearm = getBuild("defensive-polearm")!
    expect(polearm.corePieces.map((piece) => piece.name)).toEqual(["Polearm Mastery", "Knock Back", "Finesse"])
    expect(polearm.piloting.gameplayLoop.join(" ")).toMatch(/wait.*interception.*Knock Back.*approach.*interception/i)
    expect(`${polearm.plan} ${polearm.milestones.flatMap((item) => item.priorities).join(" ")}`).toMatch(/Evasion.*neglect|neglected.*Evasion|Keep Evasion/i)
  })

  it("stages the Assassin around stealth, information, and a failed-opener escape", () => {
    const assassin = getBuild("stealth-assassin")!
    expect(assassin.creation.abilities.map((ability) => ability.name)).not.toContain("Assassination")
    expect(assassin.milestones[0].priorities.join(" ")).toMatch(/Stealth.*Melee\/Evasion.*Keen Senses.*Assassination/i)
    expect(`${assassin.weaponStyle} ${assassin.gear.join(" ")}`).toMatch(/Adaptable|dependable early/i)
    expect(assassin.piloting.gameplayLoop.join(" ")).toMatch(/opening fails.*disengage.*re-hide/i)
  })

  it("limits Shield Archer protection to the shot target and preserves a crowd warning", () => {
    const shield = getBuild("shield-archer")!
    expect(shield.corePieces.map((piece) => piece.name)).toEqual(["Point Blank Archery", "Blocking"])
    expect(shield.plan).toMatch(/specific target/i)
    expect(`${shield.plan} ${shield.mistakes.join(" ")}`).toMatch(/Other adjacent enemies|every adjacent enemy/i)
  })

  it("keeps Elbereth Archer ranged-first with a fallback for failed morale control", () => {
    const elbereth = getBuild("elbereth-archer")!
    expect(elbereth.primarySkills[0]).toBe("Archery")
    expect(elbereth.corePieces.map((piece) => piece.name)).toEqual(["Song of Elbereth", "Rout", "Bow and arrows"])
    expect(elbereth.piloting.gameplayLoop.join(" ")).toMatch(/range.*Elbereth.*Rout.*distance/i)
    expect(`${elbereth.plan} ${elbereth.piloting.retreatWhen.join(" ")}`).toMatch(/does not solve every encounter|do not respond well/i)
  })

  it("makes Thresholds a proactive information-and-door controller with an adaptable legal opening", () => {
    const thresholds = getBuild("thresholds-controller")!
    expect(thresholds.creation.note).toMatch(/exact house and stat spread are not requirements/i)
    expect(thresholds.creation.abilities.map((ability) => ability.name)).toEqual(["Keen Senses", "Listen", "Song of Elbereth", "Song of Delvings"])
    expect(thresholds.corePieces.map((piece) => piece.name)).toEqual(["Song of Thresholds", "Listen", "Song of Delvings"])
    expect(thresholds.piloting.gameplayLoop.join(" ")).toMatch(/Scout.*chokepoint.*close.*Thresholds.*bypass.*repeat/i)
    expect(`${thresholds.plan} ${thresholds.piloting.positioning.join(" ")} ${thresholds.dangers.join(" ")}`).toMatch(/temporary.*not guaranteed safety|not guaranteed safety.*temporary/i)
    expect(thresholds.piloting.positioning.join(" ")).toMatch(/archers and breathers.*far side/i)
    expect(thresholds.optionalAbilities.join(" ")).toMatch(/Elbereth.*Lorien.*Mastery.*much later.*Sprinting or Exchange Places/i)
    expect(thresholds.sourceIds).toEqual(expect.arrayContaining(["thresholds-control", "thresholds-ladder", "abilities"]))
  })
})
