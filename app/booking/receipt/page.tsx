// pages/booking-receipt.tsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';

interface BookingReceiptProps {
  doctor: string;
  profession: string;
  hospital: string;
  dateTime: string;
  consultationType: string;
  transactionId: string;
  amount: string;
}

const BookingReceipt: React.FC<BookingReceiptProps> = ({
  doctor = "Dr. Emily Carter",
  profession = "Cardiologist",
  hospital = "City Health Clinic, New York",
  dateTime = "19 March 2025, Wednesday 10:00 AM",
  consultationType = "In-Person",
  transactionId = "0x4d7e525c29253b4148454a6d28f7e2b742d30c",
  amount = "RM140 (including app fees)"
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Booking Receipt - HealthSync</title>
        <meta name="description" content="Your booking receipt" />
      </Head>

      {/* Header */}
      

      {/* Main Content */}
      <main className="max-w-3xl mx-auto my-8 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-1">Booking Receipt</h1>
        <p className="text-gray-600 mb-4">Your booking has been Confirmed.</p>
        
        <hr className="my-4 border-gray-200" />
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Doctor</span>
            <span>{doctor}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Profession</span>
            <span>{profession}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Hospital</span>
            <span>{hospital}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Date & Time</span>
            <span>{dateTime}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-semibold"></span>
            <button 
              className="bg-purple-900 text-white text-sm py-1 px-3 rounded hover:bg-purple-800 transition-colors"
            >
              Add to Calendar
            </button>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Consultation Type</span>
            <span>{consultationType}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-semibold">Booking Confirmation Details Hash</span>
            <div className="flex items-center">
              <span className="text-gray-800 mr-1 text-sm font-mono">{transactionId}</span>
              <FiExternalLink className="text-gray-500 w-4 h-4" />
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Amount Paid</span>
            <span>{amount}</span>
          </div>
        </div>
        
        <div className="mt-8">
          <button 
            className="bg-purple-900 text-white w-full py-3 rounded font-medium hover:bg-purple-800 transition-colors"
          >
            Download Receipt (PDF)
          </button>
        </div>
      </main>
    </div>
  );
};

export default BookingReceipt;