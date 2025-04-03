"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaIdCard, FaCheckCircle } from "react-icons/fa";
import { ethers } from "ethers";
import Web3Modal from "web3modal";


// Contract ABI and address (after deployment)
//const CONTRACT_ABI = [/* Your contract ABI after compilation */];
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

// Define TypeScript interfaces
interface VaccinationRecord {
  id: string;
  name: string;
  date: string;
  location: string;
  hash?: string;
}

interface VerificationResults {
  [key: string]: boolean;
}

interface VaccinationRecordsContract {
  addRecord: (recordId: string, dataHash: string) => Promise<ethers.ContractTransactionResponse>;
  verifyRecord: (recordId: string, dataHash: string) => Promise<boolean>;
  getRecordHash: (recordId: string) => Promise<string>;
  doesRecordExist: (recordId: string) => Promise<boolean>;
}

const initialVaccinations: VaccinationRecord[] = [
  {
    id: "VC-001",
    name: "COVID-19 Vaccine (Pfizer)",
    date: "10/01/2024",
    location: "City Health Clinic"
  },
  {
    id: "VC-003",
    name: "HPV Vaccine (Gardasil)",
    date: "20/01/2024",
    location: "Women's Wellness Clinic"
  },
  {
    id: "VC-005",
    name: "HPV Vaccine (Gardasil)",
    date: "30/01/2024",
    location: "Women's Wellness Clinic"
  },
  {
    id: "VC-005",
    name: "Hepatitis B Vaccine",
    date: "05/02/2024",
    location: "Sunshine Clinic"
  },
  {
    id: "VC-005",
    name: "Meningococcal Vaccine",
    date: "30/01/2024",
    location: "Women's Wellness Clinic"
  }
];

export default function VaccinationRecords() {
  const [search, setSearch] = useState<string>("");
  const [selectedVaccine, setSelectedVaccine] = useState<VaccinationRecord | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [vaccineRecords, setVaccineRecords] = useState<VaccinationRecord[]>(initialVaccinations);
  const [connected, setConnected] = useState<boolean>(false);
  const [contract, setContract] = useState<VaccinationRecordsContract | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResults>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Hash a vaccination record
  const hashVaccinationRecord = (record: VaccinationRecord): string => {
    const dataString = `${record.id}-${record.name}-${record.date}-${record.location}`;
    return ethers.keccak256(ethers.toUtf8Bytes(dataString));
  };

  // Connect to wallet and contract
  const connectWallet = async (): Promise<void> => {
    setLoading(true);
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      
      // In Ethers v6, create provider from an EIP-1193 provider (Web3Modal connection)
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      
      // const vaccineContract = new ethers.Contract(
      //   CONTRACT_ADDRESS,
      //   CONTRACT_ABI,
      //   signer
      // ) as unknown as VaccinationRecordsContract;
      
      //setContract(vaccineContract);
      setConnected(true);
      
      // Compute hashes for all records
      const recordsWithHashes = vaccineRecords.map(record => {
        return {
          ...record,
          hash: hashVaccinationRecord(record)
        };
      });
      
      setVaccineRecords(recordsWithHashes);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a record to the blockchain
  const addRecordToBlockchain = async (record: VaccinationRecord): Promise<void> => {
    if (!contract) return;
    setLoading(true);
    
    try {
      const hash = hashVaccinationRecord(record);
      const tx = await contract.addRecord(record.id, hash);
      await tx.wait();
      console.log(`Record ${record.id} added to blockchain`);
      
      // Verify the record after adding it
      await verifyRecord(record);
    } catch (error) {
      console.error(`Failed to add record ${record.id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Verify a record against the blockchain
  const verifyRecord = async (record: VaccinationRecord): Promise<boolean> => {
    if (!contract) return false;
    setLoading(true);
    
    try {
      const hash = hashVaccinationRecord(record);
      const verified = await contract.verifyRecord(record.id, hash);
      
      setVerificationResult(prev => ({
        ...prev,
        [record.id]: verified
      }));
      
      setLoading(false);
      return verified;
    } catch (error) {
      console.error(`Failed to verify record ${record.id}:`, error);
      setLoading(false);
      return false;
    }
  };

  const openModal = (vaccine: VaccinationRecord): void => {
    setSelectedVaccine(vaccine);
    setShowModal(true);
    // Verify the record when opening details
    if (connected && contract) {
      verifyRecord(vaccine);
    }
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <div className="px-5 py-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Vaccination Records</h1>
          <p className="text-gray-600">View and manage your vaccination history.</p>
        </div>
        <button 
          onClick={connectWallet}
          disabled={loading}
          className={`px-4 py-2 rounded-lg ${connected ? 'bg-green-600' : 'bg-blue-600'} text-white ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
        >
          {loading ? 'Connecting...' : connected ? 'Connected' : 'Connect Wallet'}
        </button>
      </div>

      {/* Filters & Search */}
      <div className="mt-4 flex gap-4 items-center">
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
      </div>

      {/* Vaccination Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vaccineRecords
          .filter((vaccine) =>
            vaccine.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((vaccine) => (
            <div
              key={vaccine.id}
              className={`border-2 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${
                verificationResult[vaccine.id] ? 'border-green-500' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium bg-white px-2 py-1 rounded-full inline-flex items-center">
                  <FaIdCard className="mr-1 text-gray-500" /> {vaccine.id}
                </p>
                {verificationResult[vaccine.id] && (
                  <FaCheckCircle className="text-green-500" title="Verified on blockchain" />
                )}
              </div>
              <h3 className="text-xl font-bold mt-3">{vaccine.name}</h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-500" /> {vaccine.date}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" /> {vaccine.location}
                </p>
                {connected && vaccine.hash && (
                  <p className="text-xs text-gray-500 truncate">
                    Hash: {vaccine.hash.substring(0, 10)}...
                  </p>
                )}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => openModal(vaccine)}
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Details
                </button>
                {connected && (
                  <button
                    onClick={() => addRecordToBlockchain(vaccine)}
                    disabled={loading}
                    className={`bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Processing...' : 'Save to Chain'}
                  </button>
                )}
              </div>
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
            
            <h2 className="text-2xl font-bold">{selectedVaccine.name}</h2>
            
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-medium">{selectedVaccine.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{selectedVaccine.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{selectedVaccine.location}</span>
              </div>
              {connected && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Blockchain Verification:</span>
                  <span className={`font-medium ${verificationResult[selectedVaccine.id] ? 'text-green-600' : 'text-gray-500'}`}>
                    {loading ? 'Checking...' : verificationResult[selectedVaccine.id] ? 'Verified ✓' : 'Not Verified'}
                  </span>
                </div>
              )}
              {connected && selectedVaccine.hash && (
                <div className="mt-2">
                  <p className="text-gray-600">Hash:</p>
                  <p className="font-mono text-xs mt-1 bg-gray-100 p-2 rounded break-all">
                    {selectedVaccine.hash}
                  </p>
                </div>
              )}
            </div>
            
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