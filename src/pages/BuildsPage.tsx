import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { BuildCard } from "@/components/BuildCard"
import { BuildSubmissionDialog } from "@/components/BuildSubmissionDialog"
import { builds } from "@/data/builds"

const buildOrder = [
  "fingolfin-elbereth-hybrid",
  "dodging-flanking-duelist",
  "porcupine-light-spear-smith",
  "ring-of-secrets-utility-smith",
  "adversity-vengeance-juggernaut",
  "point-blank-blocking-archer",
  "stealth-assassin",
  "pure-stealth-pacifist",
  "polearm-control-fighter",
  "rapid-attack-two-weapon",
]

const orderedBuilds = [...builds].sort((a, b) => buildOrder.indexOf(a.slug) - buildOrder.indexOf(b.slug))

export function BuildsPage() {
  return <div className="page container">
    <header className="page-header builds-header"><div><p>Community build guides for Sil-Q, with starting characters, key abilities, progression, and practical play advice.</p><Link className="primer-start-link" to="/primer">New to Sil-Q? Start with the primer <ArrowRight size={14} /></Link></div><BuildSubmissionDialog /></header>
    <div className="build-grid">{orderedBuilds.map((build) => <BuildCard key={build.slug} build={build} />)}</div>
  </div>
}
