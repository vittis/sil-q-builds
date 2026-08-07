import { BookOpen, ShieldAlert } from "lucide-react"
import { useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui"
import { primerSections, primerSpoilers } from "@/data/primer"

export function PrimerPage() {
  useEffect(() => { document.title = "Primer · Sil-Q Builds"; return () => { document.title = "Sil-Q Builds" } }, [])

  return <div className="page primer-page container">
    <header className="page-header"><h1>Primer</h1><p>General rules for character creation, positioning, spending XP, equipment, and retreating in Sil-Q 1.5.</p><a className="primer-manual-link" href="https://github.com/sil-quirk/sil-q/blob/master/Sil-Q%20v1.5.0.pdf" target="_blank" rel="noreferrer"><BookOpen size={16} />Open the Sil-Q 1.5 manual</a></header>
    <div className="guide-layout">
      <aside className="guide-toc"><p>Contents</p><nav>{primerSections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}<a href="#endgame">Throne and ascent</a></nav></aside>
      <article className="guide-content primer-content">
        {primerSections.map((section) => <section key={section.id} id={section.id} className="guide-section primer-section"><h2>{section.title}</h2><p className="section-intro">{section.intro}</p><div className="primer-points">{section.points.map((point) => <div key={point.title}><h3>{point.title}</h3><p>{point.body}</p></div>)}</div></section>)}
        <section id="endgame" className="guide-section"><h2>Throne and ascent</h2><Accordion type="single" collapsible><AccordionItem value="endgame"><AccordionTrigger><span><ShieldAlert size={17} />Reveal endgame guidance</span></AccordionTrigger><AccordionContent><ul>{primerSpoilers.map((item) => <li key={item}>{item}</li>)}</ul></AccordionContent></AccordionItem></Accordion></section>
      </article>
    </div>
  </div>
}
