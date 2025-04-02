"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, UserPlus, Settings } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const ManageAccessCard = () => {
  return (
    <Card className=" min-w-[520px] shadow-md">
      <CardHeader className="pb-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            <CardTitle>Shared Access</CardTitle>
          </div>
          <Link href={"/permission"}>
          <Button className="gap-1.5">
            <Settings className="h-4 w-4" />
            Manage Permissions
          </Button>
          </Link>
        </div>
        <CardDescription>Control who has access to your account and what they can do</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <div className="mb-6">
          <h4 className="mb-2 font-medium">Share Your Access</h4>
          <div className="flex gap-2">
            <Input placeholder="Enter email address" className="max-w-xs" />
            <Button variant="secondary" className="gap-1.5">
              <UserPlus className="h-4 w-4" />
              Invite
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ManageAccessCard


