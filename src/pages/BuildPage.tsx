import { ArrowLeft, Check, Clipboard, ExternalLink, ShieldAlert } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { buildTiles, GameTile } from "@/components/GameTile"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge, Button } from "@/components/ui"
import { getBuild } from "@/data/builds"
import { skillCost, statBuyCost } from "@/lib/utils"

const toc = [
  ["plan", "Plan"], ["pieces", "Abilities"], ["creation", "Starting character"], ["pilot", "How to play"],
  ["progression", "Progression"], ["equipment", "Equipment & risks"], ["endgame", "Endgame"], ["credits", "Credits"],
]

export function BuildPage() {
  const { slug } = useParams()
  const build = getBuild(slug)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.title = build ? `${build.title} · Sil-Q Builds` : "Build not found · Sil-Q Builds"
    return () => { document.title = "Sil-Q Builds" }
  }, [build])

  if (!build) return <Navigate to="/not-found" replace />

  const xp = build.creation.skills.reduce((total, skill) => total + skillCost(skill.level), 0) + build.creation.abilities.reduce((total, ability) => total + ability.cost, 0)
  const statCost = statBuyCost(build.creation.boughtStats)
  const checklist = `${build.title}\n${build.creation.race} — ${build.creation.house}\nStats: ${build.creation.stats.str} Str / ${build.creation.stats.dex} Dex / ${build.creation.stats.con} Con / ${build.creation.stats.gra} Gra\nSkills: ${build.creation.skills.map((skill) => `${skill.name} ${skill.level}`).join(", ")}\nAbilities: ${build.creation.abilities.map((ability) => ability.name).join(", ")}\nXP spent: ${xp.toLocaleString()} / 5,000`
  const copy = async () => {
    await navigator.clipboard.writeText(checklist)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return <div className="page guide-page container">
    <Link to="/" className="back-link"><ArrowLeft size={14} />Build guides</Link>
    <header className="guide-header">
      <div className="tag-row"><Badge>{build.archetype}</Badge></div>
      <div className="guide-title-row"><GameTile name={buildTiles[build.slug]} size={40} /><h1>{build.title}</h1></div>
      <p>{build.summary}</p>
      <dl className="guide-vitals">
        <div><dt>Style</dt><dd>{build.combatStyle}</dd></div>
        <div><dt>Weapon</dt><dd>{build.weaponStyle}</dd></div>
        <div><dt>Skills</dt><dd>{build.primarySkills.join(", ")}</dd></div>
      </dl>
    </header>

    <div className="guide-layout">
      <aside className="guide-toc"><p>Contents</p><nav>{toc.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></aside>
      <article className="guide-content">
        <GuideSection id="plan" title="Plan"><p className="build-plan">{build.plan}</p></GuideSection>

        <GuideSection id="pieces" title="Abilities">
          <div className="key-pieces" role="list">{build.keyPieces.map((piece) => <div className="key-piece" role="listitem" key={piece.name}>
            <div><strong>{piece.name}</strong><Badge>{piece.kind}</Badge></div>
            <dl><div><dt>What it does</dt><dd>{piece.effect}</dd></div><div><dt>Why it matters</dt><dd>{piece.purpose}</dd></div>{piece.timing && <div><dt>When</dt><dd>{piece.timing}</dd></div>}</dl>
          </div>)}</div>
        </GuideSection>

        <GuideSection id="creation" title="Starting character">
          <div className="creation-card">
            <div className="identity-row"><div><small>Race</small><strong>{build.creation.race}</strong></div><div><small>House</small><strong>{build.creation.house}</strong></div></div>
            <div className="stat-grid">{Object.entries(build.creation.stats).map(([key, value]) => <div key={key}><strong>{value}</strong><span>{key}</span></div>)}</div>
            <div className="recipe-grid"><div><h3>Skills</h3>{build.creation.skills.map((skill) => <div className="recipe-row" key={skill.name}><span>{skill.name}</span><strong>{skill.level}</strong><small>{skillCost(skill.level).toLocaleString()} XP</small></div>)}</div><div><h3>Abilities</h3>{build.creation.abilities.map((ability) => <div className="ability-row" key={ability.name}><span><strong>{ability.name}</strong>{ability.note && <small>{ability.note}</small>}</span><Badge tone={ability.cost === 0 ? "moss" : "default"}>{ability.cost === 0 ? "Free" : `${ability.cost} XP`}</Badge></div>)}</div></div>
            <div className="xp-ledger"><span><small>Stats</small><strong>{statCost} / 13</strong></span><span><small>XP spent</small><strong>{xp.toLocaleString()} / 5,000</strong></span><span><small>Unspent</small><strong>{(5000 - xp).toLocaleString()}</strong></span><Button variant="outline" onClick={copy}>{copied ? <Check size={15} /> : <Clipboard size={15} />}{copied ? "Copied" : "Copy"}</Button></div>
            <p className="content-note">{build.creation.note}</p>
          </div>
        </GuideSection>

        <GuideSection id="pilot" title="How to play">
          <ol className="pilot-steps">{build.piloting.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <div className="pilot-grid"><InfoList title="Positioning requirements" items={build.piloting.positioning} /><InfoList title="Retreat or change plan when" items={build.piloting.retreatWhen} tone="danger" /></div>
        </GuideSection>

        <GuideSection id="progression" title="Progression">
          <div className="progression-table">{build.milestones.map((item) => <div className="progression-row" key={item.band}><div><strong>{item.band}</strong><span>{item.title}</span></div><ul>{item.priorities.map((priority) => <li key={priority}>{priority}</li>)}</ul><p><strong>Adapt:</strong> {item.adapt}</p></div>)}</div>
          <div className="compact-options"><strong>Optional abilities</strong><span>{build.optionalAbilities.join(" · ")}</span></div>
          <div className="branch-list"><h3>Build paths</h3>{build.branches.map((branch) => <div key={branch.name}><strong>{branch.name}</strong><p>{branch.description}</p></div>)}</div>
        </GuideSection>

        <GuideSection id="equipment" title="Equipment and risks">
          <div className="resource-grid"><InfoList title="Gear" items={build.gear} /><InfoList title="Resistances" items={build.resistances} /><InfoList title="Consumables" items={build.consumables} /><InfoList title="Danger signs" items={build.dangers} tone="danger" /><InfoList title="Escape tools" items={build.escapePlan} /><InfoList title="Common mistakes" items={build.mistakes} tone="danger" /></div>
        </GuideSection>

        <GuideSection id="endgame" title="Endgame">
          <Accordion type="single" collapsible><AccordionItem value="spoilers"><AccordionTrigger><span><ShieldAlert size={17} />Reveal throne and ascent guidance</span></AccordionTrigger><AccordionContent><ul>{build.spoiler.map((item) => <li key={item}>{item}</li>)}</ul></AccordionContent></AccordionItem></Accordion>
        </GuideSection>

        <GuideSection id="credits" title="Credits">
          <div className="credit-list">{build.credits.map((credit) => <a key={`${credit.name}-${credit.url}`} href={credit.url} target="_blank" rel="noreferrer" aria-label={`${credit.name}: ${credit.contribution}`}>
            <span><strong>{credit.name}</strong><small>{credit.contribution}</small></span><ExternalLink size={15} aria-hidden="true" />
          </a>)}</div>
        </GuideSection>
      </article>
    </div>
  </div>
}

function GuideSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="guide-section"><h2>{title}</h2>{children}</section>
}

function InfoList({ title, items, tone }: { title: string; items: string[]; tone?: "danger" }) {
  return <section className={tone === "danger" ? "info-list danger" : "info-list"}><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>
}
