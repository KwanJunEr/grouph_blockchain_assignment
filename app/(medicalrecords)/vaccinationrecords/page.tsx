"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  FaSearch,
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaIdCard,
} from "react-icons/fa";

const vaccinations = [
  {
    id: "VC-001",
    name: "COVID-19 Vaccine (Pfizer)",
    date: "10/01/2024",
    location: "City Health Clinic",
  },
  {
    id: "VC-003",
    name: "HPV Vaccine (Gardasil)",
    date: "20/01/2024",
    location: "Women's Wellness Clinic",
  },
  {
    id: "VC-005",
    name: "HPV Vaccine (Gardasil)",
    date: "30/01/2024",
    location: "Women's Wellness Clinic",
  },
  {
    id: "VC-005",
    name: "Hepatitis B Vaccine",
    date: "05/02/2024",
    location: "Sunshine Clinic",
  },
  {
    id: "VC-005",
    name: "Meningococcal Vaccine",
    date: "30/01/2024",
    location: "Women's Wellness Clinic",
  },
];

export default function VaccinationRecords() {
  const [search, setSearch] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // const openModal = (vaccine) => {
  //   setSelectedVaccine(vaccine);
  //   setShowModal(true);
  // };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="px-5 py-5 ">
      {/* Header */}
      <div className="flex flex-row justify-between">
        <div>
        <h1 className="text-2xl font-bold">Vaccination Records</h1>
        <p className="text-gray-600">
          View and manage your vaccination history.
        </p>
        </div>
        <div>
          <Button variant="default">Record Vaccination</Button>
        </div>
       
      </div>

      {/* Filters & Search */}
      {/* <div className="mt-4 flex gap-4 items-center">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a vaccine..."
            className="border p-2 pl-10 rounded-lg w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <FaSearch className="mr-2" /> Search
        </button>
      </div> */}

      {/* Vaccination Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vaccinations
          .filter((vaccine) =>
            vaccine.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((vaccine) => (
            <div
              key={vaccine.id}
              className={`border-2 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow`}
            >
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium bg-white px-2 py-1 rounded-full inline-flex items-center">
                  <FaIdCard className="mr-1 text-gray-500" /> {vaccine.id}
                </p>
              </div>
              <h3 className="text-xl font-bold mt-3">{vaccine.name}</h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-500" />{" "}
                  {vaccine.date}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" />{" "}
                  {vaccine.location}
                </p>
              </div>
              <button
                //onClick={() => openModal()}
                className="mt-5 bg-blue-600 text-white py-2 w-full rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Vaccination Certificate
              </button>
            </div>
          ))}
      </div>

      {/* Modal */}
      {showModal && selectedVaccine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>

            <div className="flex gap-4 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Close
              </button>
              <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
