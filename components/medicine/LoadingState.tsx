import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingState() {
  return (
    <Card className="overflow-hidden">
      <div className="bg-blue-50 p-4 flex items-center justify-center border-b">
        <Loader2 className="h-6 w-6 text-blue-500 animate-spin mr-2" />
        <p className="font-medium text-blue-700">Verifying medicine...</p>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="flex justify-center">
          <Skeleton className="h-32 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}
