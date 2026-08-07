import { Link, Outlet, useLocation } from "react-router-dom"
import { Menu } from "lucide-react"
import { useEffect } from "react"
import { GameTile } from "./GameTile"
import { Sheet, SheetContent, SheetTrigger } from "./ui"

function NavLinks({ mobile = false, pathname }: { mobile?: boolean; pathname: string }) {
  return <nav aria-label={mobile ? "Mobile navigation" : "Main navigation"} className={mobile ? "mobile-nav" : "main-nav"}>
    <Link to="/" className={pathname === "/" || pathname.startsWith("/builds") ? "nav-link active" : "nav-link"}>Builds</Link>
    <Link to="/primer" className={pathname.startsWith("/primer") ? "nav-link active" : "nav-link"}>Primer</Link>
  </nav>
}

export function SiteLayout() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }) }, [location.pathname])

  return <div className="site-shell">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Sil-Q Builds home"><GameTile name="noldor" size={24} className="brand-tile" /><strong>Sil-Q Builds</strong></Link>
        <span className="site-version">1.5.0 / 1.5.1-beta1</span>
        <NavLinks pathname={location.pathname} />
        <div className="mobile-menu">
          <Sheet>
            <SheetTrigger asChild><button className="icon-button" aria-label="Open navigation"><Menu /></button></SheetTrigger>
            <SheetContent><div className="sheet-brand"><GameTile name="noldor" size={24} /><strong>Sil-Q Builds</strong></div><NavLinks mobile pathname={location.pathname} /></SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    <main id="main-content"><Outlet /></main>
    <footer className="site-footer">
      <div className="container footer-line"><span>Unofficial Sil-Q 1.5 guide.</span><a href="https://github.com/sil-quirk/sil-q/blob/master/Sil-Q%20v1.5.0.pdf" target="_blank" rel="noreferrer">Manual</a><a href="https://github.com/sil-quirk/sil-q" target="_blank" rel="noreferrer">Source</a><a href="https://github.com/sil-quirk/sil-q/blob/master/lib/xtra/graf/16x16_microchasm.png" target="_blank" rel="noreferrer">Tiles by MicroChasm</a><a href="https://github.com/vittis" target="_blank" rel="noreferrer">Made by vittis</a></div>
    </footer>
  </div>
}
