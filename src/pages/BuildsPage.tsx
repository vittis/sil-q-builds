import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { BuildCard } from "@/components/BuildCard"
import { BuildSubmissionDialog } from "@/components/BuildSubmissionDialog"
import { builds } from "@/data/builds"

export function BuildsPage() {
  return <div className="page container">
    <header className="page-header builds-header"><div><h1>Build library</h1><p>Community build guides for Sil-Q, with starting characters, key abilities, progression, and practical play advice.</p><Link className="primer-start-link" to="/primer">New to Sil-Q? Start with the primer <ArrowRight size={14} /></Link></div><BuildSubmissionDialog /></header>
    <div className="build-grid">{builds.map((build) => <BuildCard key={build.slug} build={build} />)}</div>
  </div>
}
