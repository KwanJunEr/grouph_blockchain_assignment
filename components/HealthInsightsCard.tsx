"use client"

import { Activity, AlertCircle, Calendar, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HealthInsightsCard() {
  return (
    <Card className=" min-w-[520px] overflow-hidden border-l-4 border-l-blue-500 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-400 pb-2">
        <CardTitle className="flex items-center gap-2 text-white">
          <Heart className="h-5 w-5" />
          Health Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-green-100 p-1.5 text-green-600">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Blood Pressure</p>
              <p className="text-sm text-muted-foreground">Your blood pressure is stable.</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-blue-100 p-1.5 text-blue-600">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Upcoming Vaccination</p>
              <p className="text-sm text-muted-foreground">You're due for a flu shot next month.</p>
              <Badge variant="outline" className="mt-1 text-xs">
                Reminder set
              </Badge>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-amber-100 p-1.5 text-amber-600">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Required Vaccination</p>
              <p className="text-sm text-muted-foreground">
                Hepatitis B shot needed with consultation with the doctor.
              </p>
              <Badge variant="secondary" className="mt-1 text-xs">
                Action required
              </Badge>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}


