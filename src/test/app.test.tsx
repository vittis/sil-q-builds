import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import App from "@/App"

function renderRoute(route: string) {
  return render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>)
}

describe("site routes and interactions", () => {
  it.each(["/", "/builds"])("renders the build library at %s", (route) => {
    renderRoute(route)
    expect(screen.queryByRole("heading", { name: "Build library" })).not.toBeInTheDocument()
    expect(screen.getByText("Community build guides for Sil-Q, with core pieces, progression, and practical gameplay loops.")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Ring of Secrets" })).toBeInTheDocument()
    const buildLinks = screen.getAllByRole("link", { name: /build guide$/i })
    expect(buildLinks).toHaveLength(11)
    expect(buildLinks.slice(0, 7).map((link) => link.getAttribute("aria-label"))).toEqual([
      "Open Porcupine Light-Spear Smith build guide",
      "Open Ring of Secrets Utility Smith build guide",
      "Open Dodging & Flanking Mobile Duelist build guide",
      "Open Smash Smash Smash build guide",
      "Open Adversity & Vengeance Juggernaut build guide",
      "Open Shield Archer build guide",
      "Open Elbereth Archer build guide",
    ])
    expect(screen.queryByText(/Steal a Silmaril/i)).not.toBeInTheDocument()
  })

  it("lists every build without search or filter controls", () => {
    renderRoute("/")
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /beginner friendly/i })).not.toBeInTheDocument()
    expect(screen.queryByText("Beginner")).not.toBeInTheDocument()
    expect(screen.getAllByText("Core")).toHaveLength(11)
    expect(screen.queryByText(/10 builds/i)).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: /new to sil-q\? start with the primer/i })).toHaveAttribute("href", "/primer")
    expect(screen.queryByRole("link", { name: /game source/i })).not.toBeInTheDocument()
  })

  it("makes the full build card the guide link and omits build-type labels", () => {
    renderRoute("/")
    expect(screen.getByRole("link", { name: /open elbereth archer build guide/i })).toHaveAttribute("href", "/builds/elbereth-archer")
    expect(screen.queryByText("Complete build")).not.toBeInTheDocument()
    expect(screen.queryByText("Opening package")).not.toBeInTheDocument()
    expect(screen.queryByText("Difficulty")).not.toBeInTheDocument()
    expect(screen.queryByText("Learning Complexity")).not.toBeInTheDocument()
  })

  it("opens the build submission dialog with email and Reddit options", async () => {
    const user = userEvent.setup()
    renderRoute("/")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /add new build/i }))
    expect(screen.getByRole("dialog", { name: "Add a Sil-Q build" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "vitbolb1@gmail.com" })).toHaveAttribute("href", "mailto:vitbolb1@gmail.com")
    expect(screen.getByRole("link", { name: /message u\/vittis on reddit/i })).toHaveAttribute("href", "https://www.reddit.com/message/compose/?to=vittis")
    expect(screen.getByText(/contact me directly/i)).toBeInTheDocument()
    expect(screen.getByText(/I’ll review it and add it as soon as I can/i)).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Core plan" })).toHaveAttribute("placeholder", "What does the build do, and how should it be played?")
    expect(screen.getByRole("textbox", { name: "Core plan" })).toBeRequired()
    expect(screen.getByRole("textbox", { name: "Starting character, abilities, and progression" })).toHaveAttribute("placeholder", "Add any other details that would help explain the build.")
    expect(screen.queryByRole("textbox", { name: /your name or reddit username/i })).not.toBeInTheDocument()
    expect(screen.queryByRole("textbox", { name: /supporting link/i })).not.toBeInTheDocument()
    expect(screen.getByText(/nothing is stored or sent by this site/i)).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /close build submission/i }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("keeps endgame guidance collapsed by default", () => {
    renderRoute("/builds/pure-stealth-pacifist")
    expect(screen.getByRole("button", { name: /reveal throne and ascent guidance/i })).toHaveAttribute("aria-expanded", "false")
  })

  it("opens every canonical build route", () => {
    renderRoute("/builds/elbereth-archer")
    expect(screen.getByRole("heading", { name: "Elbereth Archer", level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/4,200 \/ 5,000/)).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Build pieces", level: 2 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Core", level: 3 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Optional / Later", level: 3 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Gameplay Loop", level: 3 })).toBeInTheDocument()
    expect(screen.queryByText("Difficulty")).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Sources" })).not.toBeInTheDocument()
  })

  it("renders Thresholds Controller without difficulty or complexity UI", () => {
    renderRoute("/builds/thresholds-controller")
    expect(screen.getByRole("heading", { name: "Thresholds Controller", level: 1 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Gameplay Loop", level: 3 })).toBeInTheDocument()
    expect(screen.getByText("Song of Thresholds")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Starting character" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Starting character" })).toHaveAttribute("href", "#creation")
    expect(screen.queryByText(/This is a legal reference opening/i)).not.toBeInTheDocument()
    expect(screen.getByText("An alternate control answer when separation alone is insufficient")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument()
    expect(screen.queryByText("Difficulty")).not.toBeInTheDocument()
    expect(screen.queryByText("Learning Complexity")).not.toBeInTheDocument()
  })

  it("copies the starting character setup", async () => {
    const user = userEvent.setup()
    renderRoute("/builds/elbereth-archer")
    await user.click(screen.getByRole("button", { name: "Copy" }))
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument()
  })

  it("opens the mobile navigation", async () => {
    const user = userEvent.setup()
    renderRoute("/")
    await user.click(screen.getByRole("button", { name: "Open navigation" }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /game source/i })).not.toBeInTheDocument()
  })

  it("links to the creator from the footer", () => {
    renderRoute("/")
    expect(screen.getByRole("link", { name: "Made by vittis" })).toHaveAttribute("href", "https://github.com/vittis")
  })

  it("starts the primer with the manual and omits the source index", () => {
    renderRoute("/primer")
    expect(screen.getByRole("link", { name: /open the sil-q 1.5 manual/i })).toHaveAttribute("href", "https://github.com/sil-quirk/sil-q/blob/master/Sil-Q%20v1.5.0.pdf")
    expect(screen.getByRole("heading", { name: "Start with a focused character" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Build a core, not a shopping list" })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Sources" })).not.toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Useful information at a glance" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Guaranteed forge checkpoints" })).toBeInTheDocument()
    expect(screen.getByText(/100′ or deeper, 300′ or deeper, and 500′ or deeper/i)).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Midgame check" })).toBeInTheDocument()
    expect(screen.getByText(/checkpoint for finding the current run's weaknesses/i)).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "XP discipline" })).toBeInTheDocument()
  })

  it("provides anchor navigation on guides", () => {
    renderRoute("/builds/ring-of-secrets-utility-smith")
    expect(screen.getByRole("link", { name: "Build pieces" })).toHaveAttribute("href", "#pieces")
    expect(screen.getByRole("link", { name: "How to play" })).toHaveAttribute("href", "#pilot")
    expect(screen.getByRole("link", { name: "Credits" })).toHaveAttribute("href", "#credits")
  })

  it("links each guide to the credited community contribution", () => {
    renderRoute("/builds/elbereth-archer")
    expect(screen.getByRole("heading", { name: "Credits" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /silquirk: Elbereth Archer archetype and progression outline/i })).toHaveAttribute("href", "https://www.reddit.com/r/roguelikes/comments/1b8ci1b/silq_build_suggestions/")
  })

  it.each([
    ["/builds/fingolfin-elbereth-hybrid", "Elbereth Archer"],
    ["/builds/point-blank-blocking-archer", "Shield Archer"],
    ["/builds/polearm-control-fighter", "Defensive Polearm"],
  ])("redirects the legacy guide route %s", (route, title) => {
    renderRoute(route)
    expect(screen.getByRole("heading", { name: title, level: 1 })).toBeInTheDocument()
  })

  it("removes the former two-weapon guide route", () => {
    renderRoute("/builds/rapid-attack-two-weapon")
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument()
  })

  it("shows a concise page for unknown routes", () => {
    renderRoute("/this-path-is-blocked")
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /build guides/i })).toBeInTheDocument()
  })
})
