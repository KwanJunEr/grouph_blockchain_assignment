"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { sha256 } from "crypto-hash";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   vaccineName: z.string().min(2, {
//     message: "Vaccine name must be at least 2 characters.",
//   }),
//   location: z.string().min(2, {
//     message: "Location must be at least 2 characters.",
//   }),
//   administeringDoctor: z.string().min(2, {
//     message: "Doctor name must be at least 2 characters.",
//   }),
//   date: z.date({
//     required_error: "Please select a date.",
//   }),
//   notes: z.string().optional(),
// })

export default function VaccineForm({ open, setOpen }: any) {
  const form = useForm({
    defaultValues: {
      name: "",
      date: "",
      vaccineName: "",
      location: "",
      administeringDoctor: "",
      notes: "",
    },
  });

  async function onSubmit(values: any) {
    try{
        const userAddress = localStorage.getItem("userAddress");

        if (!userAddress) {
            console.error("User crypto wallet address not found in localStorage");
            return;
        }

        const documentHash = await sha256(values.name + userAddress);
        const requestData = {
            ...values,
            userAddress,
            documentHash,
          };
        console.log("Sending Data:", requestData);

        const response = await fetch("/api/vaccination",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || "Failed to create vaccination record");
          }
      
          console.log("Vaccination Record Created Successfully:", responseData);
          setOpen(false);
          form.reset();
    }catch(error){
        console.error("Error submitting vaccination record:", error);
    }
    console.log(values);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Vaccination Record</DialogTitle>
          <DialogDescription>
            Enter the details of the vaccination. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="p-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Input placeholder="18 Feb 2025" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vaccineName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vaccine Name</FormLabel>
                      <FormControl>
                        <Input placeholder="COVID-19 Vaccine" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City Hospital" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="administeringDoctor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Administering Doctor</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional information about the vaccination"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Any additional details or observations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
