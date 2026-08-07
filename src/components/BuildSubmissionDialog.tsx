import { Mail, MessageCircle, Plus } from "lucide-react"
import { useState, type FormEvent } from "react"
import { Button, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui"

const submissionEmail = "vitbolb1@gmail.com"

export function BuildSubmissionDialog() {
  const [name, setName] = useState("")
  const [plan, setPlan] = useState("")
  const [details, setDetails] = useState("")

  const emailBody = [
    `Build name: ${name}`,
    "",
    "Core plan:",
    plan,
    "",
    "Starting character, abilities, and progression:",
    details || "Not provided",
  ].join("\n")
  const mailto = `mailto:${submissionEmail}?subject=${encodeURIComponent(`Sil-Q build submission: ${name || "New build"}`)}&body=${encodeURIComponent(emailBody)}`

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.location.href = mailto
  }

  return <Dialog>
    <DialogTrigger asChild><Button><Plus size={16} />Add new build</Button></DialogTrigger>
    <DialogContent>
      <div className="submission-dialog-inner">
        <header className="submission-dialog-header">
          <p className="submission-eyebrow">Community submissions</p>
          <DialogTitle className="submission-title">Add a Sil-Q build</DialogTitle>
          <DialogDescription className="submission-description">Built-in submissions are not available yet. Describe the build below to open a prefilled email, or contact me directly. I’ll review it and add it as soon as I can.</DialogDescription>
          <div className="submission-contact-links">
            <a href={`mailto:${submissionEmail}`}><Mail size={16} />{submissionEmail}</a>
            <a href="https://www.reddit.com/message/compose/?to=vittis" target="_blank" rel="noreferrer"><MessageCircle size={16} />Message u/vittis on Reddit</a>
          </div>
        </header>

        <form className="submission-form" onSubmit={submit}>
          <label>Build name<input required value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label>Core plan<textarea required rows={5} value={plan} onChange={(event) => setPlan(event.target.value)} placeholder="What does the build do, and how should it be played?" /></label>
          <label>Starting character, abilities, and progression<textarea rows={7} value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Add any other details that would help explain the build." /></label>
          <div className="submission-form-footer"><p>This opens your email application. Nothing is stored or sent by this site.</p><Button type="submit"><Mail size={16} />Open email draft</Button></div>
        </form>
      </div>
    </DialogContent>
  </Dialog>
}
