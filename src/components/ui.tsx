import * as AccordionPrimitive from "@radix-ui/react-accordion"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Slot } from "@radix-ui/react-slot"
import { X } from "lucide-react"
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Button({ className, variant = "default", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "ghost" | "outline" }) {
  return <button className={cn("button", `button-${variant}`, className)} {...props} />
}

export function ButtonLink({ children, className }: { children: ReactNode; className?: string }) {
  return <Slot className={cn("button button-default", className)}>{children}</Slot>
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("card", className)} {...props} />
}

export function Badge({ className, tone = "default", ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: "default" | "gold" | "moss" | "ember" }) {
  return <span className={cn("badge", `badge-${tone}`, className)} {...props} />
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("input", className)} {...props} />
}

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }: AccordionPrimitive.AccordionItemProps) {
  return <AccordionPrimitive.Item className={cn("accordion-item", className)} {...props} />
}

export function AccordionTrigger({ children, className, ...props }: AccordionPrimitive.AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger className={cn("accordion-trigger", className)} {...props}>
        {children}<span aria-hidden="true">+</span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ children, className, ...props }: AccordionPrimitive.AccordionContentProps) {
  return <AccordionPrimitive.Content className={cn("accordion-content", className)} {...props}><div>{children}</div></AccordionPrimitive.Content>
}

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export function DialogContent({ children }: { children: ReactNode }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="dialog-overlay" />
      <DialogPrimitive.Content className="dialog-content">
        <DialogPrimitive.Close className="dialog-close" aria-label="Close build submission"><X size={22} /></DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

export function SheetContent({ children }: { children: ReactNode }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="sheet-overlay" />
      <DialogPrimitive.Content className="sheet-content">
        <DialogPrimitive.Title className="sr-only">Navigation</DialogPrimitive.Title>
        <DialogPrimitive.Close className="sheet-close" aria-label="Close navigation"><X size={20} /></DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
