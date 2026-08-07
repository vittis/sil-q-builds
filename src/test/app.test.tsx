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
    expect(screen.getByRole("heading", { name: "Build guides", level: 1 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Ring of Secrets" })).toBeInTheDocument()
    expect(screen.getAllByRole("link", { name: /build guide$/i })).toHaveLength(10)
    expect(screen.queryByText(/Steal a Silmaril/i)).not.toBeInTheDocument()
  })

  it("lists every build without search or filter controls", () => {
    renderRoute("/")
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /beginner friendly/i })).not.toBeInTheDocument()
    expect(screen.queryByText("Beginner")).not.toBeInTheDocument()
    expect(screen.getAllByText("Key Abilities")).toHaveLength(10)
    expect(screen.queryByText(/10 builds/i)).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: /new to sil-q\? start with the primer/i })).toHaveAttribute("href", "/primer")
    expect(screen.queryByRole("link", { name: /game source/i })).not.toBeInTheDocument()
  })

  it("makes the full build card the guide link and omits build-type labels", () => {
    renderRoute("/")
    expect(screen.getByRole("link", { name: /open fingolfin elbereth hybrid build guide/i })).toHaveAttribute("href", "/builds/fingolfin-elbereth-hybrid")
    expect(screen.queryByText("Complete build")).not.toBeInTheDocument()
    expect(screen.queryByText("Opening package")).not.toBeInTheDocument()
    expect(screen.queryByText("Difficulty")).not.toBeInTheDocument()
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
    renderRoute("/builds/fingolfin-elbereth-hybrid")
    expect(screen.getByRole("heading", { name: "Fingolfin Elbereth Hybrid", level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/4,900 \/ 5,000/)).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Abilities", level: 2 })).toBeInTheDocument()
    expect(screen.queryByText("Difficulty")).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Sources" })).not.toBeInTheDocument()
  })

  it("copies the starting character setup", async () => {
    const user = userEvent.setup()
    renderRoute("/builds/fingolfin-elbereth-hybrid")
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

  it("starts the primer with the manual and omits the source index", () => {
    renderRoute("/primer")
    expect(screen.getByRole("link", { name: /open the sil-q 1.5 manual/i })).toHaveAttribute("href", "https://github.com/sil-quirk/sil-q/blob/master/Sil-Q%20v1.5.0.pdf")
    expect(screen.getByRole("heading", { name: "Start with a focused character" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Build a core, not a shopping list" })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Sources" })).not.toBeInTheDocument()
  })

  it("provides anchor navigation on guides", () => {
    renderRoute("/builds/ring-of-secrets-utility-smith")
    expect(screen.getByRole("link", { name: "Abilities" })).toHaveAttribute("href", "#pieces")
    expect(screen.getByRole("link", { name: "How to play" })).toHaveAttribute("href", "#pilot")
    expect(screen.getByRole("link", { name: "Credits" })).toHaveAttribute("href", "#credits")
  })

  it("links each guide to the credited community contribution", () => {
    renderRoute("/builds/fingolfin-elbereth-hybrid")
    expect(screen.getByRole("heading", { name: "Credits" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Nwallins: Original opening and early-build outline/i })).toHaveAttribute("href", "https://www.reddit.com/r/roguelikes/comments/15u6dfz/my_silq_early_build/")
  })

  it("shows a concise page for unknown routes", () => {
    renderRoute("/this-path-is-blocked")
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /build guides/i })).toBeInTheDocument()
  })
})
