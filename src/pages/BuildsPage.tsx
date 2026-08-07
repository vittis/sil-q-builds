import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { BuildCard } from "@/components/BuildCard"
import { BuildSubmissionDialog } from "@/components/BuildSubmissionDialog"
import { builds } from "@/data/builds"

export function BuildsPage() {
  return <div className="page container">
    <header className="page-header builds-header"><div><h1>Build guides</h1><p>Sil-Q 1.5 builds with exact starting characters and practical play instructions.</p><Link className="primer-start-link" to="/primer">New to Sil-Q? Start with the primer <ArrowRight size={14} /></Link></div><BuildSubmissionDialog /></header>
    <div className="build-grid">{builds.map((build) => <BuildCard key={build.slug} build={build} />)}</div>
  </div>
}
