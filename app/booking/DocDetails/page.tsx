"use client";
import { useState } from "react";
import { Search, Bell, AlertTriangle, Lightbulb, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DoctorDetails()  {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            
            
            {/* Doctor Details Section */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border">
                      <img
                        src="/api/placeholder/128/128"
                        alt="Doctor"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">Dr. Emily Carter</h2>
                    <p className="text-gray-600">Cardiologist - City Health Clinic, NY</p>
                    <div className="flex items-center text-yellow-500 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                      <span className="text-gray-700 ml-2">(4.9)</span>
                    </div>
                    <p className="text-gray-700 mt-4">
                      Dr. Emily Carter is a board-certified cardiologist with 10+ years of experience in heart health...
                    </p>
                  </div>
                </div>

                {/* Available Slots */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">Available Slots</h3>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border p-2 rounded-md mt-2 w-full md:w-auto"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    {["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"].map((slot, index) => (
                      <Button key={index} variant="outline" className="bg-gray-200 hover:bg-gray-300">
                        {slot}
                      </Button>
                    ))}
                  </div>
                  <Button className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white">
                    Book Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {/* Reviews Section */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Reviews</h3>
                {["Kim, Frankfurt", "Priya, Samantha", "Yong, Kenny"].map((review, index) => (
                  <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
                    <p className="font-semibold">{review}</p>
                    <div className="flex text-yellow-500 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < 4 ? "fill-current" : ""}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm">Amazing doctor, highly recommend!</p>
                  </div>
                ))}
                <Button variant="outline" className="mt-2 w-full bg-gray-200 hover:bg-gray-300">
                  View More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}