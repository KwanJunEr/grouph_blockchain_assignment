"use client";
import { useState } from "react";
import { FaStar, FaRegStar, FaSearch } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

const DoctorDetails = () => {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      

      {/* Doctor Details Section */}
      <div className="mt-6 max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex gap-6">
          <img
            src="/doctor.jpg"
            alt="Doctor"
            className="w-32 h-32 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-bold">Dr. Emily Carter</h2>
            <p className="text-gray-600">Cardiologist - City Health Clinic, NY</p>
            <div className="flex items-center text-yellow-500 mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
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
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 rounded-md mt-2"
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"].map((slot, index) => (
              <button
                key={index}
                className="p-2 border rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                {slot}
              </button>
            ))}
          </div>
          <button className="mt-4 w-full bg-purple-700 text-white p-2 rounded-lg">
            Book Consultation
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-6 max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">Reviews</h3>
        {["Kim, Frankfurt", "Priya, Samantha", "Yong, Kenny"].map((review, index) => (
          <Card key={index} className="mt-4">
            <CardContent className="p-4">
              <p className="font-semibold">{review}</p>
              <div className="flex text-yellow-500 my-2">
                {[...Array(5)].map((_, i) => (
                  i < 4 ? <FaStar key={i} /> : <FaRegStar key={i} />
                ))}
              </div>
              <p className="text-gray-700">Amazing doctor, highly recommend!</p>
            </CardContent>
          </Card>
        ))}
        <button className="mt-4 w-full bg-gray-300 p-2 rounded-lg">
          View More
        </button>
      </div>
    </div>
  );
};

export default DoctorDetails;
