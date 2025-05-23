// app/medicine-verification/page.jsx
"use client";

import { useState } from "react";
import { Search, Bell, AlertTriangle, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReportDialog from "@/components/medicine/ReportDialog";
import MedicineVerifier from "@/components/medicine/MedicineVerifier";

export default function MedicineVerificationPage() {
  const [verified, setVerified] = useState(true);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Medicine Verification</h1>
        <p className="text-gray-600 mb-6">
          Verify the authenticity of your prescribed medicines.
        </p>

        <div className="border-t border-gray-200 pt-6 mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Verification Form */}
          
            <MedicineVerifier/>
          
          </div>

          <div>
            {/* Counterfeit Reporting */}
            <div className="mb-6">
              <p className="mb-2">
                Encounter Counterfeit Medicine? Report to us!
              </p>
              <Button
                variant="outline"
                className="w-full bg-black hover:bg-gray-800 text-white"
                onClick={() => setIsReportDialogOpen(true)}
              >
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
                    <span>
                      Always purchase medicines from licensed pharmacies.
                    </span>
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
                    <span>
                      Counterfeit medicines may contain harmful substances.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-black">•</span>
                    <span>
                      Using counterfeit medicines can lead to serious health
                      risks.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ReportDialog
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
      />
    </div>
  );
}
