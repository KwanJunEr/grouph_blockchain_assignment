"use client"
import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface GrantAccessModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}


const GrantAccessModal = ({open, setOpen}:GrantAccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="py-4">
            <div className='flex flex-col items-center justify-center'>
                <p className='text-xl font-bold mb-2 text-center'>Are you sure you want to provide access to medical data to the healthcare provider?</p>
                <Button className='mt-3'>Allow Access</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  )
}

export default GrantAccessModal
