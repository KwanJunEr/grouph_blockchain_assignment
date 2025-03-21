// app/medicine-verification/page.jsx
"use client";

import { useState } from "react";
import { Search, Bell, AlertTriangle, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


export default function MedicineVerificationPage() {
  const [verified, setVerified] = useState(true);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <header >

      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Medicine Verification</h1>
        <p className="text-gray-600 mb-6">Verify the authenticity of your prescribed medicines.</p>
        
        <div className="border-t border-gray-200 pt-6 mb-6"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Verification Form */}
            <div className="mb-6 flex">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Enter Your Medicine Code"
                  className="pl-8 py-2"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <Button className="ml-4 bg-black hover:bg-gray-800 text-white">
                Verify Medicine
              </Button>
            </div>

            {/* Verification Status */}
            

            {/* Medicine Details */}
            <Card>
              <CardContent className="pt-6">
                <div className="mb-6">
                    <p className="text-gray-500 text-sm mb-2">Verification Status</p>
                    <h2 className="text-6xl font-bold text-emerald-400">Safe</h2>
                    <p className="mt-2 text-gray-700">This medicine is verified and safe to use.</p>
                </div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">Medicine Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Medicine Name</div>
                    <div className="col-span-2">Metformin 500mg</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Manufacturer</div>
                    <div className="col-span-2">ABC Pharmaceuticals</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Batch Number</div>
                    <div className="col-span-2">B123456</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Expiry Date</div>
                    <div className="col-span-2">10/01/2025</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Usage Instructions</div>
                    <div className="col-span-2">Take one tablet twice daily with meals.</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Side Effects</div>
                    <div className="col-span-2">Nausea, diarrhea, headache</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {/* Counterfeit Reporting */}
            <div className="mb-6">
              <p className="mb-2">Encounter Counterfeit Medicine? Report to us!</p>
              <Button variant="outline" className="w-full bg-black hover:bg-gray-800 text-white">
                Report Counterfeit Medicine
              </Button>
            </div>

            {/* Safety Tips */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Safety Tips</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-black">•</span>
                    <span>Always purchase medicines from licensed pharmacies.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-black">•</span>
                    <span>Check the packaging for signs of tampering.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-black">•</span>
                    <span>Verify the medicine's unique code before use.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Warnings */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-medium">Warnings</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-black">•</span>
                    <span>Counterfeit medicines may contain harmful substances.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-black">•</span>
                    <span>Using counterfeit medicines can lead to serious health risks.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}