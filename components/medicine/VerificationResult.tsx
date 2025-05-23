"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, XCircle, Copy, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import QRCode from "./QRCode"

interface VerificationResultProps {
  result: {
    verified: boolean
    name: string
    manufacturer: string
    dosage: string
    expiryDate: string
    batchNumber: string
    blockchainHash: string
  }
}

export default function VerificationResult({ result }: VerificationResultProps) {
  const [copied, setCopied] = useState(false)

  const copyHash = () => {
    navigator.clipboard.writeText(result.blockchainHash)
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <Card className="overflow-hidden">
      <div className={`p-4 flex items-center ${result.verified ? "bg-green-50" : "bg-red-50"} border-b`}>
        {result.verified ? (
          <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
        ) : (
          <XCircle className="h-6 w-6 text-red-500 mr-2" />
        )}
        <p className={`font-medium ${result.verified ? "text-green-700" : "text-red-700"}`}>
          {result.verified ? "Verified Authentic Medicine" : "Unverified Medicine"}
        </p>
        {result.verified && (
          <Badge variant="outline" className="ml-auto bg-green-100 text-green-800 border-green-200">
            Blockchain Verified
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{result.name}</h3>
              <p className="text-gray-500">{result.manufacturer}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Dosage</p>
                <p className="font-medium">{result.dosage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="font-medium">{result.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Batch Number</p>
                <p className="font-medium">{result.batchNumber}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Blockchain Verification Hash</p>
              <div className="flex items-center">
                <code className="bg-gray-100 p-2 rounded text-xs flex-1 overflow-hidden text-ellipsis">
                  {result.blockchainHash}
                </code>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={copyHash} className="ml-1">
                        {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy hash"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-2 border rounded-lg shadow-sm">
              <QRCode value={`medicine:${result.batchNumber}:${result.blockchainHash.substring(0, 16)}`} size={150} />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Scan to verify on blockchain</p>
          </div>
        </div>
      </CardContent>

      {result.verified && (
        <>
          <Separator />
          <CardFooter className="p-4 bg-gray-50">
            <Button variant="outline" size="sm" className="text-xs ml-auto">
              <ExternalLink className="h-3 w-3 mr-1" />
              View Blockchain Record
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
