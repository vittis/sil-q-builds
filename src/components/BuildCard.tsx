import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import type { BuildGuide } from "@/data/types"
import { buildTiles, GameTile } from "./GameTile"
import { Badge } from "./ui"

export function BuildCard({ build }: { build: BuildGuide }) {
  return <Link className="card build-card" to={`/builds/${build.slug}`} aria-label={`Open ${build.title} build guide`}>
    <div className="build-card-title"><GameTile name={buildTiles[build.slug]} /><h2>{build.shortTitle}</h2></div>
    <p>{build.summary}</p>
    <dl className="build-card-meta"><div><dt>Style</dt><dd>{build.combatStyle}</dd></div><div><dt>Weapon</dt><dd>{build.weaponStyle}</dd></div></dl>
    <div className="key-piece-preview"><span>Key Abilities</span><p>{build.keyPieces.map((piece) => piece.name).join(" · ")}</p></div>
    <div className="build-card-bottom"><div className="tag-row">{build.primarySkills.slice(0, 3).map((skill) => <Badge key={skill}>{skill}</Badge>)}</div><span className="card-link">Open <ArrowRight size={14} /></span></div>
  </Link>
}
