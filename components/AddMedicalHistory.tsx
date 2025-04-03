"use client";

import {ethers} from "ethers";
import {storeMedicalRecordOnChain} from "@/lib/MedicalHistoryInteract";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Plus } from "lucide-react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// const formSchema = z.object({
//   visitDate: z.date({ required_error: "Please select a date of visitation." }),
//   type: z.string().min(1, { message: "Please select a visit type." }),
//   hospital: z.string().min(2, { message: "Hospital name is required." }),
//   doctorAssigned: z.string().min(2, { message: "Doctor name is required." }),
//   diagnosis: z.string().min(2, { message: "Diagnosis is required." }),
//   procedure: z.string().optional(),
//   treatmentPlans: z.string().optional(),
//   medicinePrescription: z.string().optional(),
//   labResults: z.string().optional(),
//   billingAmount: z
//     .string()
//     .refine((val) => !isNaN(Number.parseFloat(val)) || val === "", {
//       message: "Billing amount must be a number.",
//     }),
//   notes: z.string().optional(),
//   surgeryReport: z.string().optional(),
// });

export default function MedicalRecordModal({open, setOpen}: any) {

  const form = useForm({
    defaultValues: {
      name:"",
      visitedDate: "",
      type: "",
      hospital: "",
      doctorAssigned: "",
      diagnosis: "",
      procedure: "",
      treatmentPlans: "",
      medicinePrescription: "",
      labResults: "",
      billingAmount: "",
      notes: "",
      surgeryReport: "",
    },
  });

  async function onSubmit(values: any) {
    // Handle form submission with the values
    try{
        const userAddress = localStorage.getItem("userAddress");

        if (!userAddress) {
            console.error("User crypto wallet address not found in localStorage");
            return;
        }

        const documentHash = await sha256(values.type + userAddress);
        const requestData = {
            ...values,
            userAddress,
            documentHash,
          };
        console.log("Sending Data:", requestData);

         // Check if MetaMask is installed and get accounts
         if (!window.ethereum) {
          console.error("MetaMask is not installed!");
          return;
      }
      
        await window.ethereum.request({ method: "eth_requestAccounts" });
         // Fix: Correct provider initialization
        const provider = new ethers.BrowserProvider(window.ethereum);
        const MResult = await storeMedicalRecordOnChain(provider, userAddress, documentHash);
        console.log(MResult);

        const response = await fetch("/api/medicalrecord",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || "Failed to create medical record");
          }
      
          console.log("Medical Record Created Successfully:", responseData);
          setOpen(false);
          form.reset();
    }catch(error){
        console.error("Error submitting medical record:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Medical Record</DialogTitle>
          <DialogDescription>
            Enter the medical record information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
             <FormField
              control={form.control}
              name = "name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Johnson" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name = "visitedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Visitation</FormLabel>
                  <Input placeholder="18 Feb 2025" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select visit type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="consultation">
                          Consultation
                        </SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="followUp">Follow-up</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="checkup">
                          Regular Check-up
                        </SelectItem>
                        <SelectItem value="specialist">
                          Specialist Visit
                        </SelectItem>
                        <SelectItem value="labwork">Lab Work</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hospital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital</FormLabel>
                    <FormControl>
                      <Input placeholder="Hospital name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="doctorAssigned"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor Assigned</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter diagnosis details"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="procedure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Procedure</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter procedure details if applicable"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatmentPlans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treatment Plans</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter treatment plan details"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicinePrescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicine Prescription</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter prescribed medications with dosage"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="labResults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lab Results</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter lab results if available"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surgeryReport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surgery Report</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Surgery details if applicable"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billingAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="0.00" {...field} />
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
                      placeholder="Additional notes"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Record</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
