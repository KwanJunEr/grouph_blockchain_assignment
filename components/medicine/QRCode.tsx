"use client"

import { useEffect, useRef } from "react"

interface QRCodeProps {
  value: string
  size?: number
}

export default function QRCode({ value, size = 150 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) return

      try {
        // Dynamically import the QR code library
        const QRCodeLib = await import("qrcode")

        // Generate QR code on canvas
        await QRCodeLib.toCanvas(canvasRef.current, value, {
          width: size,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        })
      } catch (err) {
        console.error("Error generating QR code:", err)
      }
    }

    generateQRCode()
  }, [value, size])

  return <canvas ref={canvasRef} width={size} height={size} className="rounded-md" />
}
