"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

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

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Vaccination Records</h1>
      <p className="text-gray-600">View and manage your vaccination history.</p>

      {/* Filters & Search */}
      <div className="mt-4 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search for a vaccine..."
          className="border p-2 rounded-lg flex-1"
        //   value={search}
        //   onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center">
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {/* Vaccination Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vaccinations
          .filter((vaccine) =>
            vaccine.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((vaccine) => (
            <div
              key={vaccine.id}
              className={`text-black p-4 rounded-lg shadow-lg`}
            >
              <p className="text-sm font-semibold">{vaccine.id}</p>
              <h3 className="text-lg font-bold mt-1">{vaccine.name}</h3>
              <p className="text-sm mt-1">{vaccine.location}</p>
              <p className="text-sm mt-1">{vaccine.date}</p>
              <button className="mt-4 bg-black text-white py-2 w-full rounded-lg">
                View Vaccination Certificate
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
