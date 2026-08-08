import type { PrimerSection } from "./types"

export const primerSections: PrimerSection[] = [
  {
    id: "character-creation",
    eyebrow: "Before turn one",
    title: "Start with a focused character",
    intro: "Sil-Q rewards a strong identity. Your stats barely change, skills become increasingly expensive, and every extra ability in one tree raises the price of the next.",
    points: [
      { title: "Stats define the run", body: "Strength drives damage and weapon comfort, Dexterity accuracy and evasion, Constitution health, and Grace Will, Perception, Smithing, Song, and voice. Choose them for the play pattern you want, not for vague balance." },
      { title: "Skills before ornaments", body: "The nth skill point costs n × 100 XP. An ability tree also becomes more expensive each time you buy from it. Keep your main attack and defence competitive before collecting attractive side abilities." },
      { title: "Affinities are real discounts", body: "An affinity adds +1 effective skill and reduces every ability cost in that tree by 500 XP. The first ability in an affinity tree is therefore free." },
    ],
    sourceIds: ["manual", "abilities"],
  },
  {
    id: "positioning",
    eyebrow: "Every fight",
    title: "Positioning is your strongest item",
    intro: "A good corridor, closed door, or retreat lane is worth more than a small equipment bonus. Most doomed fights became doomed several turns before the final hit.",
    points: [
      { title: "Do not accept a surround", body: "Every additional adjacent enemy improves enemy attacks through the surrounding bonus. Open space helps only when you actively move, flank, or keep an exit open." },
      { title: "Make enemies spend turns", body: "Back through a doorway, wait behind a corner, or let a pursuer approach your polearm. A turn spent moving is a turn the enemy did not spend attacking." },
      { title: "Never chase into darkness", body: "Fleeing enemies can pull you into fresh packs. Take the morale win, reload the situation, and explore from a safe edge." },
    ],
    sourceIds: ["manual", "quirk-advice"],
  },
  {
    id: "useful-information",
    eyebrow: "Quick reference",
    title: "Useful information at a glance",
    intro: "These fixed rules are easy to misremember and useful enough to plan a run around. Ordinary floor layouts, loot, and additional forges remain random.",
    points: [
      { title: "Guaranteed forge checkpoints", body: "The three guaranteed forges trigger in order when you first enter 100′ or deeper, 300′ or deeper, and 500′ or deeper. Skipping a threshold does not erase a pending forge, though only one guaranteed forge is placed on a level. A forge generated at 100′ has exactly three uses; later ordinary or enchanted forges normally have three or four." },
      { title: "Depth moves in 50′ steps", body: "A normal staircase moves one level. A shaft moves two, and falling into a chasm also sends you two levels deeper while dealing falling damage and leaving no return stair. A chasm cannot drop you directly into the 1000′ throne room." },
      { title: "New depths award XP", body: "The first time you reach each new deepest level from 100′ onward, you gain XP equal to its displayed depth: 100 XP at 100′, 150 XP at 150′, and so on. A shaft or chasm also awards the XP for any level it skips." },
      { title: "Kills are not the only XP", body: "Encountering an individual monster for the first time can award XP before you fight it; killing it can award a separate amount. Both rewards diminish as you see and kill more of that race. Identifying a new object kind, special item type, or artefact normally awards 100 XP." },
      { title: "Minimum depth rises with time", body: "The dungeon gradually forces the run downward. Once the minimum depth passes a floor, an up staircase cannot take you above that minimum, so resting and exhaustive exploration are not free." },
      { title: "Repeated stairs can collapse", body: "Using stairs several times in quick succession raises the chance that they crumble, causing falling damage and potentially leaving you deeper with no staircase back. The risk decays over turns and is tiny in ordinary forward play." },
    ],
    sourceIds: ["manual", "changelog"],
  },
  {
    id: "morale",
    eyebrow: "Control without damage",
    title: "Morale changes the shape of combat",
    intro: "Enemies do not simply fight to the death. Kills, fear, songs, injury, allies, and your Will can turn an organized pack into scattered targets.",
    points: [
      { title: "Break the group", body: "Formidable makes witnessed melee kills frightening; Elbereth pressures intelligent servants of Morgoth; Majesty compares your Will with theirs. These tools are strongest before you are surrounded." },
      { title: "Exploit fleeing targets", body: "Rout treats archery attacks against fleeing enemies as though you had +5 Dexterity. Shoot across known ground and let the formation unravel." },
      { title: "Fear is not universal", body: "Mindless foes and enemies outside an ability's eligibility demand a second plan. Every morale build still needs reliable movement, defence, or direct damage." },
    ],
    sourceIds: ["manual", "abilities", "quirk-advice"],
  },
  {
    id: "stealth",
    eyebrow: "Awareness and sound",
    title: "Stealth is geometry, not invisibility",
    intro: "Distance, line of sight, exposure, doors, noise, and monster alertness all matter. A stealth score works best when the dungeon is helping it.",
    points: [
      { title: "Hug useful terrain", body: "Walls and corners reduce exposure. Closed doors heavily obstruct detection and sound, and corners let unwary monsters pass without seeing you." },
      { title: "Use stealth mode deliberately", body: "Stealth mode gives +5 Stealth but costs speed. Turn it on to slip past a known danger; turn it off before a chase becomes a speed contest." },
      { title: "Silence has a cost", body: "Song of Silence reduces your noise, but the same effect penalizes your Listen checks. Use existing information, pause the song when safe, or accept a shorter detection range." },
    ],
    sourceIds: ["manual", "stealth-advice", "abilities"],
  },
  {
    id: "identification",
    eyebrow: "Use what you find",
    title: "Consumables are part of the build",
    intro: "Unidentified items are potential exits, not museum pieces. Learn safe identification habits before a bad fight forces a blind choice.",
    points: [
      { title: "Test on your terms", body: "Use-ID potions outside combat and try staves with doors, stairs, terrain, and enemies in view so their effect has a chance to reveal itself." },
      { title: "Know the fixed appearances", body: "Murky brown Orcish Liquor heals and stuns; clear Miruvor fully heals and restores voice. The in-game Known Objects list preserves discoveries across characters." },
      { title: "Buy certainty when needed", body: "Alchemy identifies herbs, potions, staves, and horns. Channeling identifies and doubles the value of staves and horns. A Ring of Secrets grants Alchemy while worn." },
    ],
    sourceIds: ["manual", "quirk-advice", "abilities"],
  },
  {
    id: "smithing",
    eyebrow: "Control the variance",
    title: "Forge solutions, not trophies",
    intro: "Smithing is strongest when it guarantees the tool your run needs. It is weakest when experience is sunk into a beautiful item while combat skills fall behind.",
    points: [
      { title: "Spend forge uses deliberately", body: "A forge is a limited bundle of crafts, not an unlimited shop. Arrive with the relevant ability, Smithing total, reserved XP, and a short priority list." },
      { title: "Solve the next danger", body: "Early identification, regeneration, accuracy, light, protection, or a resistance can remove more risk than a modest damage upgrade." },
      { title: "Do not chase sunk cost", body: "A smithing opener can pivot into a normal fighter. Once the needed items exist, invest in the skills that use them." },
    ],
    sourceIds: ["manual", "quirk-advice", "smith-guide"],
  },
  {
    id: "midgame-check",
    eyebrow: "Approximately 550′–650′",
    title: "Midgame check",
    intro: "Stop judging the character only by whether its signature combo still works. This is a checkpoint for finding the current run's weaknesses, not a rigid equipment gate.",
    points: [
      { title: "Elemental and status coverage", body: "Identify the most dangerous resistance gaps for the current floors, especially fire and poison concerns, without assuming every build needs the same item." },
      { title: "Light and darkness", body: "Carry enough light, perception, or another answer to avoid losing control in dark areas." },
      { title: "Emergency movement", body: "Keep an escape consumable, movement ability, staircase route, or other concrete way to leave a fight that turns bad." },
      { title: "Healing and resources", body: "Check healing, restoration, voice, arrows, staff charges, and other resources the build actually consumes." },
      { title: "Offensive skill", body: "Make sure the main attack or control skill remains competitive instead of relying on the combo to hide falling accuracy." },
      { title: "Defensive skill", body: "Keep Evasion or the build's real defensive package competitive with increasingly dangerous enemies." },
      { title: "XP discipline", body: "Count optional abilities already purchased and stop if core skills are being left behind." },
    ],
    sourceIds: ["manual", "quirk-advice", "ladder"],
  },
  {
    id: "retreat",
    eyebrow: "Survival tools",
    title: "Leave before the retreat closes",
    intro: "Escape abilities are insurance against bad geometry, but they work best while you still have health and open squares.",
    points: [
      { title: "Sprinting needs a runway", body: "After four roughly aligned moves you gain speed. Start early; it is not an instant panic button when boxed in." },
      { title: "Exchange Places is costly but decisive", body: "Swap with an adjacent enemy to cross a blockade. Alert enemies normally receive a free attack, so combine it with health, confusion, or timing." },
      { title: "Remember stairs and chasms", body: "Map exits as you explore. A staircase is a destination, not a plan you invent after the corridor fills." },
    ],
    sourceIds: ["manual", "stealth-advice", "abilities"],
  },
]

export const primerSpoilers = [
  "Enter the throne room with an explicit crown-removal method, enough voice for required songs or horns, and consumables already identified.",
  "The ascent is a movement challenge, not a victory lap. Preserve Sprinting, Exchange Places, healing, and speed for broken routes and blocked stairs.",
  "Taking additional Silmarils raises the danger dramatically. Treat one Silmaril and a clean escape as the default first-win objective.",
]
