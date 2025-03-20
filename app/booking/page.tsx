"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaMapMarkerAlt, FaRegCalendarAlt, FaTimes, FaCopy } from 'react-icons/fa';
import { BsBellFill } from 'react-icons/bs';
import { format } from 'date-fns';

// Types
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  image: string;
}

interface TimeSlot {
  start: string;
  end: string;
}

// Mock data
const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Emily Carter",
    specialty: "Cardiologist",
    location: "City Health Clinic, New York",
    rating: 4.9,
    image: "/doctors/emily-carter.jpg",
  },
  {
    id: 2,
    name: "Dr. Michael Reynolds",
    specialty: "Nephrologist",
    location: "City Clinic Centre, New York",
    rating: 4.5,
    image: "/doctors/michael-reynolds.jpg",
  },
  {
    id: 3,
    name: "Dr. James Wong",
    specialty: "Dermatologist",
    location: "Sun Heart Clinic, Los Angeles",
    rating: 4.4,
    image: "/doctors/james-wong.jpg",
  },
  {
    id: 4,
    name: "Dr. Priya Sharma",
    specialty: "Neurologist",
    location: "Pinnacle Wellness Clinic, San Francisco",
    rating: 4.7,
    image: "/doctors/priya-sharma.jpg",
  },
  {
    id: 5,
    name: "Dr. Carlos Martinez",
    specialty: "Oncologist",
    location: "Life Medical Care, Sacramento",
    rating: 4.9,
    image: "/doctors/carlos-martinez.jpg",
  },
];

// Available time slots
const availableTimeSlots: TimeSlot[] = [
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "13:00", end: "14:00" },
  { start: "14:00", end: "15:00" },
  { start: "15:00", end: "16:00" },
  { start: "16:00", end: "17:00" },
];

export default function BookConsultation() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [hospitalFilter, setHospitalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [consultationType, setConsultationType] = useState('Virtual');
  const [paymentMethod, setPaymentMethod] = useState('ETH');

  // Handler for doctor selection
  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedTimeSlot(null);
  };

  // Open modal with selected booking info
  const openBookingModal = () => {
    if (selectedDoctor && selectedTimeSlot && selectedDate) {
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle confirm booking
  const handleConfirmBooking = () => {
    // Here you would handle the booking confirmation, possibly making an API call
    alert('Booking confirmed!');
    closeModal();
  };

  // Format the date for display
  const formattedDate = selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select Date';
  const formattedDateTime = selectedDate && selectedTimeSlot ? 
    `${selectedTimeSlot.start} ${format(selectedDate, 'EEEE, d MMMM yyyy')}` : '';

  // Mock wallet and contract data
  const walletAddress = "0x1234328933847294567";
  const contractAddress = "0x742d35Cc6634C0532925a3b844B454e6C8f7e2b5";
  const transactionHash = "0x4a7e2b5c2925a3b844B454e6C8f7e2b5742d35Cc";
  const totalCost = "150 + 5 gas fee";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="border-b pb-4 mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Book a Consultation</h1>
          <div className="text-sm text-gray-500">
            Wallet Connected: 0x12543283384427044567
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <div className="w-1/4">
            <select
              className="w-full p-2 border rounded shadow-sm"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
            >
              <option value="">Dermatologist</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="neurologist">Neurologist</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="oncologist">Oncologist</option>
            </select>
          </div>
          <div className="w-1/4">
            <select
              className="w-full p-2 border rounded shadow-sm"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>
          </div>
          <div className="w-1/4">
            <select
              className="w-full p-2 border rounded shadow-sm"
              value={hospitalFilter}
              onChange={(e) => setHospitalFilter(e.target.value)}
            >
              <option value="">Hospitals</option>
              <option value="city-health">City Health Clinic</option>
              <option value="pinnacle">Pinnacle Wellness</option>
              <option value="life-medical">Life Medical Care</option>
            </select>
          </div>
          <div className="w-1/4">
            <select
              className="w-full p-2 border rounded shadow-sm"
            >
              <option value="all">Sort by: All</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="w-3/4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for doctor"
                className="w-full p-2 pr-10 border rounded shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="w-1/4">
            <button className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800">
              Search
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">258 Results</p>

        <div className="flex space-x-6">
          {/* Doctor List */}
          <div className="w-1/2">
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 cursor-pointer"
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    <Image 
                      src={doctor.image} 
                      alt={doctor.name} 
                      width={64} 
                      height={64} 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-1">({doctor.rating})</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className="w-4 h-4 text-yellow-400" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <FaMapMarkerAlt className="mr-1" size={12} />
                      <span>{doctor.location}</span>
                    </div>
                  </div>
                  <div>
                    <button className="bg-gray-900 text-white text-sm py-1 px-3 rounded hover:bg-gray-800">
                      Book Consultation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Details & Booking */}
          <div className="w-1/2">
            {selectedDoctor ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold">{selectedDoctor.name}</h2>
                    <p className="text-gray-600">{selectedDoctor.specialty}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <FaMapMarkerAlt className="mr-1" size={14} />
                      <span>{selectedDoctor.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-1">({selectedDoctor.rating})</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className="w-4 h-4 text-yellow-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <button className="bg-gray-900 text-white text-sm py-3 px-5 rounded hover:bg-gray-800">
                      View Profile Details
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Dr. Emily Carter is a board-certified cardiologist with 10+ years of experience in heart health. She specializes in preventive care, heart failure, and interventional cardiology, offering personalized treatment plans. Trained at Johns Hopkins University and Mayo Clinic, she is passionate about combining advanced technology with compassionate care. Outside work, she advocates for heart health awareness and enjoys yoga and family time.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Available Slots</h3>
                  <div className="flex justify-between items-center mb-4">
                    <button 
                      className="flex items-center text-sm border rounded px-3 py-1"
                    >
                      <span>{formattedDate}</span>
                      <FaRegCalendarAlt className="ml-2" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {availableTimeSlots.slice(0, 6).map((slot, index) => (
                      <button
                        key={index}
                        className={`border rounded py-2 text-center text-sm ${
                          selectedTimeSlot === slot 
                            ? 'bg-gray-900 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedTimeSlot(slot)}
                      >
                        {slot.start} - {slot.end}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-800 disabled:bg-gray-400"
                  disabled={!selectedTimeSlot}
                  onClick={openBookingModal}
                >
                  Book Consultation
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                <p>Select a doctor to view details and book a consultation</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 relative">
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">Booking Form</h2>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  {/* Doctor details */}
                  <div className="mb-6">
                    <div className="flex flex-col space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Doctor</label>
                        <div className="font-medium">{selectedDoctor.name}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Profession</label>
                        <div className="font-medium">{selectedDoctor.specialty}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Hospital</label>
                        <div className="font-medium">{selectedDoctor.location}</div>
                      </div>
                    </div>
                  </div>

                  {/* Date and time */}
                  <div className="mb-6">
                    <label className="block text-sm text-gray-600 mb-1">Selected Date & Time</label>
                    <div className="flex items-center border rounded p-2">
                      <span className="mr-2">🗓️</span>
                      <span className="font-medium">{formattedDateTime}</span>
                    </div>
                  </div>

                  {/* Consultation type */}
                  <div className="mb-6">
                    <label className="block text-sm text-gray-600 mb-1">Consultation Type</label>
                    <div className="relative">
                      <select 
                        className="appearance-none w-full border rounded py-2 px-3 pr-8"
                        value={consultationType}
                        onChange={(e) => setConsultationType(e.target.value)}
                      >
                        <option value="Virtual">Virtual</option>
                        <option value="In-Person">In-Person</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Notes/Symptoms */}
                  <div className="mb-6">
                    <label className="block text-sm text-gray-600 mb-1">Notes/ Symptoms</label>
                    <textarea
                      className="w-full border rounded p-2 h-32"
                      placeholder="Describe any symptoms..."
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold mb-4">Smart Contract Details</h3>
                  
                  {/* Wallet */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Wallet Connected</label>
                    <div className="font-mono text-sm">{walletAddress}</div>
                  </div>
                  
                  {/* Payment method */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Payment Method</label>
                      <div className="relative">
                        <select 
                          className="appearance-none w-full border rounded py-2 px-3 pr-8"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value="ETH">ETH</option>
                          <option value="BTC">BTC</option>
                          <option value="USDC">USDC</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Total Cost</label>
                      <div className="border rounded py-2 px-3">{totalCost}</div>
                    </div>
                  </div>
                  
                  {/* Contract Address */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Contract Address</label>
                    <div className="flex items-center">
                      <div className="font-mono text-sm truncate flex-1">{contractAddress}</div>
                      <button className="ml-2 text-blue-600">
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                  
                  {/* Transaction Hash */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Transaction Hash</label>
                    <div className="flex items-center">
                      <div className="font-mono text-sm truncate flex-1">{transactionHash}</div>
                      <button className="ml-2 text-blue-600">
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Confirm Button */}
              <div className="mt-6">
                <button 
                  className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-800"
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}