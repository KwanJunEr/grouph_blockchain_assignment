"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, Send, FileText, AlertCircle } from "lucide-react"
import StaticChatMessage from "./StaticChatMessage"


// Pre-defined responses about high blood pressure
const STATIC_RESPONSES :Message[]= [
  {
    id: "system-1",
    role: "assistant",
    content:
      "I've analyzed your medical report. Your blood pressure reading is 145/92 mmHg, which is elevated and falls into the high blood pressure (hypertension) category. Would you like me to explain what this means for your health?",
  },
  {
    id: "system-2",
    role: "assistant",
    content:
      "High blood pressure (hypertension) is when your blood pressure is consistently too high. Your reading of 145/92 mmHg is in Stage 1 hypertension. The top number (145) is your systolic pressure, measuring the force when your heart beats. The bottom number (92) is your diastolic pressure, measuring the force when your heart rests between beats. Normal blood pressure is typically around 120/80 mmHg.",
  },
  {
    id: "system-3",
    role: "assistant",
    content:
      "Based on your medical report, I recommend the following:\n\n1. Consult with your doctor about these results\n2. Consider lifestyle changes like reducing sodium intake, regular exercise, and stress management\n3. Monitor your blood pressure regularly\n4. Your report also shows slightly elevated cholesterol levels (Total: 210 mg/dL), which may be related to your blood pressure. Your doctor might recommend dietary changes or medication depending on your overall health assessment.",
  },
]

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function StaticPDFChat() {
  const [stage, setStage] = useState<"upload" | "analyzing" | "chat">("upload")
  const [files, setFiles] = useState<FileList | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [responseIndex, setResponseIndex] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      // Validate file type
      const file = selectedFiles[0]
      if (file.type !== "application/pdf") {
        setUploadError("Please upload a PDF file")
        return
      }

      // Validate file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError("File size should be less than 10MB")
        return
      }

      setFiles(selectedFiles)
      setUploadError(null)
    }
  }

  const handleAnalyze = () => {
    if (!files) {
      setUploadError("Please upload a PDF file first")
      return
    }

    setStage("analyzing")

    // Simulate analysis time
    setTimeout(() => {
      setStage("chat")
      // Add the first static response
      setMessages([STATIC_RESPONSES[0]])
    }, 3000)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
const userMessage: Message = {
  id: `user-${Date.now()}`,
  role: "user",
  content: input,
}


    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI thinking
    setTimeout(() => {
      if (responseIndex < STATIC_RESPONSES.length - 1) {
        setResponseIndex((prev) => prev + 1)
        setMessages((prev) => [...prev, STATIC_RESPONSES[responseIndex + 1]])
      } else {
        // If we've used all pre-defined responses, cycle back to the last one with a slight variation
        const finalResponse: Message = {
  id: `system-${Date.now()}`,
  role: "assistant",
  content:
    "I recommend discussing these findings with your healthcare provider. They can provide personalized advice based on your complete medical history and current health status.",
}

        setMessages((prev) => [...prev, finalResponse])
      }
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-250px)] min-h-[500px]">
      {/* PDF Upload Area */}
      {stage === "upload" && (
        <Card className="flex flex-col items-center justify-center p-8 mb-4 border-dashed border-2">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Upload Medical PDF</h2>
          <p className="text-gray-500 text-center mb-4">
            Upload your medical report to analyze blood pressure, cholesterol levels, and other health metrics
          </p>
          <div className="flex flex-col w-full max-w-xs gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="pdf-upload"
            />
            <Button onClick={() => fileInputRef.current?.click()} className="w-full">
              <FileUp className="mr-2 h-4 w-4" />
              Select PDF
            </Button>
            {files && files.length > 0 && (
              <p className="text-sm text-gray-500 text-center mt-2">
                {files[0].name} ({(files[0].size / 1024 / 1024).toFixed(2)}MB)
              </p>
            )}
            <Button onClick={handleAnalyze} className="w-full mt-4" disabled={!files}>
              Analyze PDF
            </Button>
          </div>
        </Card>
      )}

      {/* Analyzing State */}
      {stage === "analyzing" && (
        <Card className="flex flex-col items-center justify-center p-8 mb-4">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Analyzing Your Medical PDF</h2>
            <p className="text-gray-500 text-center">Please wait while we process your medical report...</p>
          </div>
        </Card>
      )}

      {/* Error message */}
      {uploadError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {uploadError}
        </div>
      )}

      {/* Chat Interface */}
      {stage === "chat" && (
        <>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 rounded-md mb-4 bg-gray-50">
            {messages.map((message) => (
              <StaticChatMessage key={message.id} message={message} />
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your medical data..."
              className="flex-1 min-h-[50px] max-h-[100px]"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </>
      )}
    </div>
  )
}
