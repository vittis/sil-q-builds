import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import App from "./App"
import "./styles.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider delayDuration={250}>
        <App />
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>,
)
