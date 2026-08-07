import { ExternalLink } from "lucide-react"
import { sourceMap } from "@/data/sources"
import { Badge } from "./ui"

export function SourceList({ ids }: { ids: string[] }) {
  return <div className="source-list">{ids.map((id) => {
    const source = sourceMap.get(id)
    if (!source) return null
    return <a key={id} href={source.url} target="_blank" rel="noreferrer" className="source-item">
      <span><Badge tone={source.kind === "Source code" || source.kind === "Official manual" ? "gold" : "moss"}>{source.kind}</Badge><strong>{source.title}</strong><small>{source.note}</small></span><ExternalLink size={16} />
    </a>
  })}</div>
}
