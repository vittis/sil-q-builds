import { Navigate, Route, Routes } from "react-router-dom"
import { SiteLayout } from "@/components/SiteLayout"
import { BuildPage } from "@/pages/BuildPage"
import { BuildsPage } from "@/pages/BuildsPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { PrimerPage } from "@/pages/PrimerPage"

export default function App() {
  return <Routes><Route element={<SiteLayout />}><Route index element={<BuildsPage />} /><Route path="builds" element={<BuildsPage />} /><Route path="builds/:slug" element={<BuildPage />} /><Route path="primer" element={<PrimerPage />} /><Route path="not-found" element={<NotFoundPage />} /><Route path="*" element={<Navigate to="/not-found" replace />} /></Route></Routes>
}
