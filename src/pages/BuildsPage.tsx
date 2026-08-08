import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { BuildCard } from "@/components/BuildCard"
import { BuildSubmissionDialog } from "@/components/BuildSubmissionDialog"
import { builds } from "@/data/builds"

const buildOrder = [
  "porcupine-light-spear-smith",
  "ring-of-secrets-utility-smith",
  "dodging-flanking-duelist",
  "smash-smash-smash",
  "adversity-vengeance-juggernaut",
  "shield-archer",
  "elbereth-archer",
  "stealth-assassin",
  "pure-stealth-pacifist",
  "thresholds-controller",
  "defensive-polearm",
]

const orderedBuilds = [...builds].sort((a, b) => buildOrder.indexOf(a.slug) - buildOrder.indexOf(b.slug))

export function BuildsPage() {
  return <div className="page container">
    <header className="page-header builds-header"><div><p>Community build guides for Sil-Q, with core pieces, progression, and practical gameplay loops.</p><Link className="primer-start-link" to="/primer">New to Sil-Q? Start with the primer <ArrowRight size={14} /></Link></div><BuildSubmissionDialog /></header>
    <div className="build-grid">{orderedBuilds.map((build) => <BuildCard key={build.slug} build={build} />)}</div>
  </div>
}
