import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { ButtonLink } from "@/components/ui"

export function NotFoundPage() {
  return <div className="not-found container"><h1>Page not found</h1><p>This route does not exist.</p><ButtonLink><Link to="/"><ArrowLeft size={17} />Build guides</Link></ButtonLink></div>
}
