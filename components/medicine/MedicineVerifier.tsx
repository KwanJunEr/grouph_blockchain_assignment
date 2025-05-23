"use client"

import type React from "react"

import { useState } from "react"
import { Search, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import VerificationResult from "./VerificationResult"
import LoadingState from "./LoadingState"

export default function MedicineVerifier() {
  const [medicineCode, setMedicineCode] = useState("")
  const [medicineName, setMedicineName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<null | {
    verified: boolean
    name: string
    manufacturer: string
    dosage: string
    expiryDate: string
    batchNumber: string
    blockchainHash: string
  }>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!medicineCode.trim() && !medicineName.trim()) return

    setIsLoading(true)
    setVerificationResult(null)

    // Simulate verification process
    setTimeout(() => {
      // For demo purposes, verify if code starts with "MED" OR name contains "paracetamol" (case insensitive)
      const isVerified =
        medicineCode.toUpperCase().startsWith("MED") || medicineName.toLowerCase().includes("paracetamol")

      setVerificationResult({
        verified: isVerified,
        name: isVerified ? medicineName || "Paracetamol 500mg" : "Unknown Medicine",
        manufacturer: isVerified ? "PharmaCorp Ltd." : "Unknown",
        dosage: isVerified ? "500mg tablet" : "Unknown",
        expiryDate: isVerified ? "2025-12-31" : "Unknown",
        batchNumber: isVerified ? "BTC2023-456" : "Unknown",
        blockchainHash: isVerified
          ? "0x7d8f3e29b7e284f3e5c4e9c7d8f3e29b7e284f3e5c4e9c7d8f3e29b7e284f3e5"
          : "Not found in blockchain",
      })

      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Verify Your Medicine</h2>
            <p className="text-sm text-gray-500">Enter the medicine code or name to verify its authenticity</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medicine-code">Medicine Code</Label>
              <Input
                id="medicine-code"
                value={medicineCode}
                onChange={(e) => setMedicineCode(e.target.value)}
                placeholder="e.g. MED12345"
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <span className="relative bg-white px-3 text-sm text-gray-500">OR</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicine-name">Medicine Name</Label>
              <Input
                id="medicine-name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                placeholder="e.g. Paracetamol"
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || (!medicineCode.trim() && !medicineName.trim())}
            >
              <Search className="h-4 w-4 mr-2" />
              Verify Medicine
            </Button>
          </div>
        </form>
      </Card>

      {isLoading && <LoadingState />}

      {verificationResult && verificationResult.verified && <VerificationResult result={verificationResult} />}
      {verificationResult && !verificationResult.verified && (
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-center">
            <XCircle className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <h3 className="font-semibold text-red-700">Medicine Not Verified</h3>
              <p className="text-red-600">
                {medicineCode && medicineName
                  ? `The medicine "${medicineName}" with code "${medicineCode}" could not be verified.`
                  : medicineCode
                    ? `The medicine code "${medicineCode}" could not be verified.`
                    : `The medicine "${medicineName}" could not be verified.`}{" "}
                Please check your input and try again or contact support.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
