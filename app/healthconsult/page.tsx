import type { Metadata } from "next"
import StaticPDFChat from "@/components/healthconsult/StaticPDFChat"

export const metadata: Metadata = {
  title: "Medical PDF Analysis",
  description: "Upload medical PDFs and get insights about your health",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Medical PDF Analysis</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your medical reports and get insights about your health data like blood pressure, cholesterol levels,
            and more.
          </p>
        </div>

        <StaticPDFChat />
      </div>
    </main>
  )
}

