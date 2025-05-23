"use client"

import type React from "react"

import { useState } from "react"
import { AlertTriangle, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ReportDialog({ open, onOpenChange }: ReportDialogProps) {
  const [medicineCode, setMedicineCode] = useState("")
  const [medicineName, setMedicineName] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 2 seconds and close dialog
      setTimeout(() => {
        setMedicineCode("")
        setMedicineName("")
        setDescription("")
        setIsSubmitted(false)
        onOpenChange(false)
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Report Counterfeit Medicine
              </DialogTitle>
              <DialogDescription>
                Help us combat counterfeit medicines by reporting suspicious products. Your report will be kept
                confidential.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="medicine-code">Medicine Code (if available)</Label>
                <Input
                  id="medicine-code"
                  value={medicineCode}
                  onChange={(e) => setMedicineCode(e.target.value)}
                  placeholder="e.g. MED12345"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicine-name">Medicine Name</Label>
                <Input
                  id="medicine-name"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="e.g. Metformin 500mg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description of Issue
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe why you believe this medicine is counterfeit..."
                  rows={4}
                  required
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting || !medicineName || !description}
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Report Submitted</h3>
            <p className="text-gray-500">Thank you for your report. Our team will investigate this issue promptly.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
