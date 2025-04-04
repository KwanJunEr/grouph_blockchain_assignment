"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import { sha256 } from "crypto-hash";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { storePatientProfileOnChain } from "@/lib/patientethers";

// Define proper types
interface ProfileFormValues {
  name: string;
  age: string;
  gender: string;
  bloodType: string;
  houseAddress: string;
  height: string;
  weight: string;
  email: string;
  phone: string;
  chronicConditions: string;
  allergies: string;
  medications: string;
}

interface ProfileModalFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Make sure window.ethereum is properly typed
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ProfileModalForm({ open, setOpen }: ProfileModalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      bloodType: "",
      houseAddress: "",
      height: "",
      weight: "",
      email: "",
      phone: "",
      chronicConditions: "",
      allergies: "",
      medications: "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const userAddress = localStorage.getItem("userAddress");

      if (!userAddress) {
        setError("User crypto wallet address not found. Please connect your wallet first.");
        console.error("User crypto wallet address not found in localStorage");
        return;
      }

      const documentHash = await sha256(values.name + userAddress);
      const requestData = {
        ...values,
        userAddress,
        documentHash,
      };

      if (!window.ethereum) {
        setError("MetaMask is not installed! Please install MetaMask to continue.");
        console.error("MetaMask is not installed!");
        return;
      }
    
      await window.ethereum.request({ method: "eth_requestAccounts" });
      
      // Initialize provider with proper typing for ethers v6
      const provider = new ethers.BrowserProvider(window.ethereum);

      console.log("Attempting blockchain transaction...");
      
      // Store profile hash on blockchain
      const txResult = await storePatientProfileOnChain(provider, userAddress, documentHash);
      console.log("Transaction result:", txResult);
      
      console.log("Sending data to API:", requestData);
      
      // Send data to API
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create profile record");
      }
    
      console.log("Profile Created Successfully:", responseData);
      
      // Close form and reset on success
      setOpen(false);
      form.reset();
      
    } catch (error: any) {
      console.error("Error submitting profile:", error);
      setError(error.message || "An error occurred while submitting the profile");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Enter your profile details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="bg-red-50 p-2 rounded text-red-600 mb-4 mt-1 text-sm border border-red-200">
            {error}
          </div>
        )}
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
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="houseAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>House Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="123 Main St, City"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input placeholder="180cm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input placeholder="80kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="chronicConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chronic Conditions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any chronic conditions"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allergies</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any allergies"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medications</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List current medications"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Saving..." : "Save Profile"}
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}