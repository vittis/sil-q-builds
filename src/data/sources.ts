import type { SourceRef } from "./types"

export const sources: SourceRef[] = [
  {
    id: "manual",
    title: "Sil-Q v1.5.0 Manual",
    url: "https://github.com/sil-quirk/sil-q/blob/master/Sil-Q%20v1.5.0.pdf",
    kind: "Official manual",
    note: "Primary rules reference for combat, stealth, smithing, abilities, and dungeon flow.",
  },
  {
    id: "abilities",
    title: "Sil-Q 1.5.1 ability definitions",
    url: "https://github.com/sil-quirk/sil-q/blob/v1.5.1-beta1/lib/edit/ability.txt",
    kind: "Source code",
    note: "Ability level requirements, prerequisites, and concise mechanical descriptions.",
  },
  {
    id: "adversity-source",
    title: "Strength in Adversity implementation",
    url: "https://github.com/sil-quirk/sil-q/blob/v1.5.1-beta1/src/xtra1.c#L2602-L2622",
    kind: "Source code",
    note: "Confirms that the implemented bonuses include Dexterity as well as Strength and Grace.",
  },
  {
    id: "changelog",
    title: "Sil-Q 1.5.1-beta1 changelog",
    url: "https://github.com/sil-quirk/sil-q/blob/v1.5.1-beta1/lib/docs/CHANGELOG.md",
    kind: "Source code",
    note: "States that 1.5.1-beta1 contains no gameplay changes from 1.5.0.",
  },
  {
    id: "quirk-advice",
    title: "Sil-Q advice from Quirk and the community",
    url: "https://www.reddit.com/r/roguelikes/comments/17okonr/silq_advice/",
    kind: "Developer advice",
    note: "Maintainer sketches for Elbereth, Adversity, Flanking, and practical identification advice.",
  },
  {
    id: "build-suggestions",
    title: "Sil-Q build suggestions from Quirk and the community",
    url: "https://www.reddit.com/r/roguelikes/comments/1b8ci1b/silq_build_suggestions/",
    kind: "Developer advice",
    note: "Maintainer outlines for Elbereth Archer, Thresholds Pacifist, Smash Smash Smash, and Defensive Polearm, including their limitations.",
  },
  {
    id: "thresholds-control",
    title: "Practical Song of Thresholds control discussion",
    url: "https://angband.live/forums/forum/angband/sil/8890-sil-q-review?p=194118",
    kind: "Community guide",
    note: "Play-tested tactics for proactive wards, safe boltholes, ranged-enemy manipulation, and combining Thresholds with Listen and Delvings.",
  },
  {
    id: "thresholds-ladder",
    title: "Thresholds pacifist ladder example",
    url: "https://angband.live/ladder/ladder-show.php?id=24932",
    kind: "Ladder evidence",
    note: "A winning character using Delvings, Listen, Elbereth, Thresholds, and later Mastery.",
  },
  {
    id: "stealth-advice",
    title: "Sil-Q stealth and pacifist discussion",
    url: "https://www.reddit.com/r/roguelikes/comments/nnh8xj/any_sil_veterans_around_here/",
    kind: "Community guide",
    note: "Detailed practical advice on awareness, Listen, stairs, Sprinting, and Exchange Places.",
  },
  {
    id: "ladder",
    title: "Sil-Q 1.5 ladder",
    url: "https://angband.live/ladder/ladder-browse.php?v=Sil-Q",
    kind: "Ladder evidence",
    note: "Successful character dumps used to check that late-game combinations have worked in real runs.",
  },
  {
    id: "blocking-archer",
    title: "Hiathor — Edain Haleth blocking archer",
    url: "https://angband.live/ladder/ladder-show.php?id=24960",
    kind: "Ladder evidence",
    note: "A three-Silmaril win whose player identified Point Blank Archery and Blocking as the key pairing.",
  },
  {
    id: "smith-guide",
    title: "Sil-Q character builds by Thomas Hatzopoulos",
    url: "https://athanasi.us/site/sil_character_builds.html",
    kind: "Community guide",
    note: "Detailed early forge plans for Ring of Secrets and a blocking smith-archer.",
  },
  {
    id: "smith-ladder",
    title: "Jeweller opening ladder example",
    url: "https://angband.live/ladder/ladder-show.php?id=25884",
    kind: "Ladder evidence",
    note: "A 1.5 run using an early protection ring, regeneration amulet, and Ring of Secrets.",
  },
]

export const sourceMap = new Map(sources.map((source) => [source.id, source]))
