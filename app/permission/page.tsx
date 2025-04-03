"use client";
import React, { useState, useEffect } from 'react';
import { Table } from "antd";
import { Button } from '@/components/ui/button';
import { ethers } from "ethers";

// Import the ABI
import permissionAbi from "@/abijson/permissionabi.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Define interfaces for type safety
interface DoctorData {
    _id: string;
    name: string;
    description: string;
    location: string;
    specialty: string;
    address: string;
}

interface TableDataItem {
    key: string;
    _id: string;
    address: string;
    doctor: string;
    specialty: string;
    hospital: string;
    permissionstatus: string;
    dataaccess: string;
    lastgranteddate: string;
    hasAccess: boolean;
    description: string;
}

interface Ethereum extends ethers.Eip1193Provider {
  request(args: { method: string; params?: any[] }): Promise<any>;
  on(event: string, callback: (...args: any[]) => void): void;
  removeListener(event: string, callback: (...args: any[]) => void): void;
}

const Permission = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<string | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [tableData, setTableData] = useState<TableDataItem[]>([]);
    const [doctors, setDoctors] = useState<DoctorData[]>([]);
    const [transactionPending, setTransactionPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Contract address - replace with your actual deployed contract address
    const contractAddress = "0x25141C536a925107f283ee18284827F78A020Af9";

    // Fetch doctors from the API
    const fetchDoctors = async () => {
        try {
            const response = await fetch('/api/doctors');
            if (!response.ok) {
                throw new Error('Failed to fetch doctors');
            }
            const data = await response.json();
            setDoctors(data.doctors);
            return data.doctors;
        } catch (error) {
            console.error("Error fetching doctors:", error);
            setError("Failed to fetch doctors. Please try refreshing the page.");
            return [];
        }
    };

    // Initialize ethers and connect to MetaMask
    const initializeEthers = async () => {
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
              // Cast window.ethereum to the extended interface
              const ethereum = window.ethereum as unknown as Ethereum;
              
              const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
              const account = accounts[0];
              setAccount(account);
            
              // Create provider using the cast ethereum object
              const provider = new ethers.BrowserProvider(ethereum);
              const signer = await provider.getSigner();
            
              // Initialize contract instance
              const contractInstance = new ethers.Contract(
                contractAddress,
                permissionAbi,
                signer
              );
              setContract(contractInstance);
              
              // Listen for account changes
              const handleAccountsChanged = (accounts: string[]) => {
                const newAccount = accounts[0];
                console.log("Account changed:", newAccount);
                setAccount(newAccount);
                // When account changes, we need to refresh the permissions data
                if (contractInstance) {
                  generatePermissionsData(contractInstance, newAccount, doctors);
                }
              };
              
              ethereum.on('accountsChanged', handleAccountsChanged);
              
              // Return the contract instance so we can use it immediately
              return contractInstance;
            }
            return null;
        } catch (error) {
            console.error("Error initializing ethers:", error);
            setError("Failed to connect to MetaMask. Running in simulation mode.");
            return null;
        }
    };

    // Load initial data
    const loadInitialData = async () => {
        setLoading(true);
        try {
            const fetchedDoctors = await fetchDoctors();
            
            // Initialize ethers (connects to MetaMask if available)
            const contractInstance = await initializeEthers();
            
            // Generate permissions data immediately after contract is initialized
            if (contractInstance && account) {
                await generatePermissionsData(contractInstance, account, fetchedDoctors);
            } else {
                // Run in simulation mode if no contract or account
                await generatePermissionsData(null, null, fetchedDoctors);
            }
        } catch (err) {
            console.error("Error loading initial data:", err);
            setError("Failed to load initial data. Please try refreshing the page.");
            setLoading(false);
        }
    };

    // Separate function to refresh permissions data - can be called after transactions
    const refreshPermissionsData = async () => {
        if (contract && account) {
            setLoading(true);
            await generatePermissionsData(contract, account, doctors);
            setLoading(false);
        }
    };

    // Generate permission data - handles both real and simulated scenarios
    const generatePermissionsData = async (
        contractInstance: ethers.Contract | null = null, 
        patientAddress: string | null = null,
        doctorList: DoctorData[] = []
    ) => {
        const permissionData: TableDataItem[] = [];
        const doctorsToUse = doctorList.length > 0 ? doctorList : doctors;

        console.log("Generating permissions data for patient:", patientAddress);
        console.log("Contract available:", !!contractInstance);
        
        for (const doctor of doctorsToUse) {
            let hasAccess = false;
            let lastGrantedDate = "N/A";
            
            // Try to get real access status if contract and patient address are available
            if (contractInstance && patientAddress && ethers.isAddress(doctor.address)) {
                try {
                    console.log(`Checking access for doctor: ${doctor.name} (${doctor.address})`);
                    // Call the contract to check if this doctor has access
                    hasAccess = await contractInstance.checkAccess(doctor.address, patientAddress);
                    console.log(`Doctor ${doctor.name} has access:`, hasAccess);
                    
                    // In a real application, you might want to store the lastGrantedDate on-chain or in your database
                    lastGrantedDate = hasAccess ? new Date().toLocaleDateString() : "N/A";
                } catch (err) {
                    console.warn(`Failed to check access for doctor ${doctor.name}:`, err);
                    // Default to revoked access if contract call fails
                    hasAccess = false;
                    lastGrantedDate = "N/A";
                }
            } else {
                // In simulation mode, default all permissions to revoked
                hasAccess = false;
                lastGrantedDate = "N/A";
            }
            
            permissionData.push({
                key: doctor._id.toString(),
                _id: doctor._id.toString(),
                address: doctor.address,
                doctor: doctor.name,
                specialty: doctor.specialty,
                hospital: doctor.location,
                permissionstatus: hasAccess ? "Granted" : "Revoked",
                dataaccess: hasAccess ? "Full Access" : "No Access",
                lastgranteddate: lastGrantedDate,
                hasAccess,
                description: doctor.description
            });
        }
        
        setTableData(permissionData);
        setLoading(false);
    };

    // Toggle doctor access (grant or revoke)
    const toggleAccess = async (doctorAddress: string, currentAccess: boolean) => {
        try {
            setTransactionPending(true);
            
            // Check if we can interact with the contract
            if (contract && account && ethers.isAddress(doctorAddress)) {
                try {
                    let tx;
                    if (currentAccess) {
                        // Revoke access
                        tx = await contract.revokeDoctor(doctorAddress);
                        console.log("Revoke transaction sent:", tx.hash);
                    } else {
                        // Grant access
                        tx = await contract.authorizeDoctor(doctorAddress);
                        console.log("Grant transaction sent:", tx.hash);
                    }

                    // Wait for transaction to be mined
                    const receipt = await tx.wait();
                    console.log("Transaction confirmed:", receipt);
                    
                    console.log(`Successfully ${currentAccess ? 'revoked' : 'granted'} access for doctor: ${doctorAddress}`);
                    
                    // After transaction completes, refresh permissions data
                    await refreshPermissionsData();
                    return;
                } catch (err) {
                    console.error("Contract interaction failed:", err);
                    setError(`Transaction failed: ${(err as Error).message}`);
                    // Don't update the UI if the transaction failed
                    setTransactionPending(false);
                    return;
                }
            }
            
            // Simulation mode
            console.log("Running in simulation mode - no blockchain transaction will be sent");
            
            // Simulate blockchain transaction delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update the table data with toggled access
            setTableData(prevData => 
                prevData.map(item => {
                    if (item.address === doctorAddress) {
                        const newAccessStatus = !currentAccess;
                        return {
                            ...item,
                            hasAccess: newAccessStatus,
                            permissionstatus: newAccessStatus ? "Granted" : "Revoked",
                            dataaccess: newAccessStatus ? "Full Access" : "No Access",
                            lastgranteddate: newAccessStatus ? new Date().toLocaleDateString() : "N/A"
                        };
                    }
                    return item;
                })
            );
            
            console.log(`Simulated ${currentAccess ? 'revoke' : 'grant'} access for doctor: ${doctorAddress}`);
            
        } catch (error) {
            console.error("Error toggling access:", error);
            setError(`Error toggling doctor access: ${(error as Error).message}`);
        } finally {
            setTransactionPending(false);
        }
    };

    // Effect to update permissions data when contract or account changes
    useEffect(() => {
        if (contract && account && doctors.length > 0) {
            generatePermissionsData(contract, account, doctors);
        }
    }, [contract, account, doctors.length]);

    // Initialize on component mount
    useEffect(() => {
        loadInitialData();
        
        // Return cleanup function
        return () => {
            // Any cleanup can go here
            if (window.ethereum) {
                const ethereum = window.ethereum as unknown as Ethereum;
                ethereum.removeListener('accountsChanged', () => {});
            }
        };
    }, []);

    // Add a refresh button to manually refresh permissions
    const handleRefresh = () => {
        refreshPermissionsData();
    };

    // Column definitions for the table
    const columns = [
        {
            title: 'Doctor',
            dataIndex: 'doctor',
            key: 'doctor',
        },
        {
            title: 'Specialty',
            dataIndex: 'specialty',
            key: 'specialty',
        },
        {
            title: 'Hospital/Clinic',
            dataIndex: 'hospital',
            key: 'hospital',
        },
        {
            title: 'Permission Status',
            dataIndex: 'permissionstatus',
            key: 'permissionstatus',
            render: (status: string) => (
                <span className={status === "Granted" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {status}
                </span>
            )
        },
        {
          title: 'Data Access',
          dataIndex: 'dataaccess',
          key: 'dataaccess',
        },
        {
          title: 'Last Granted Date',
          dataIndex: 'lastgranteddate',
          key: 'lastgranteddate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: TableDataItem) => (
                <Button 
                    onClick={() => toggleAccess(record.address, record.hasAccess)}
                    disabled={loading || transactionPending}
                    className={`${record.hasAccess 
                        ? "bg-red-500 hover:bg-red-600" 
                        : "bg-green-500 hover:bg-green-600"} text-white`}
                >
                    {transactionPending 
                        ? "Processing..." 
                        : record.hasAccess 
                            ? "Revoke Access" 
                            : "Grant Access"}
                </Button>
            ),
        }
    ];

    return (
        <main className='px-5 py-5 min-h-screen'>
            <div className='flex flex-col'>
                <div className='py-2 flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>Permission Log</h1>
                        <p className='text-xl'>Manage who has access to your data</p>
                        {account && (
                            <p className='text-sm mt-2'>Connected account: <span className="font-mono">{account}</span></p>
                        )}
                        {!account && (
                            <p className='text-sm mt-2 text-orange-500'>
                                Simulation mode: MetaMask not connected
                            </p>
                        )}
                    </div>
                    <Button 
                        onClick={handleRefresh}
                        disabled={loading || transactionPending}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Refresh Permissions
                    </Button>
                </div>
                {error && (
                    <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded text-red-700">
                        {error}
                        <Button 
                            className="ml-3 bg-red-700 hover:bg-red-800 text-white" 
                            onClick={() => setError(null)}
                        >
                            Dismiss
                        </Button>
                    </div>
                )}
                <hr className='h-0.5 bg-gray-200 w-full my-2'/>
                <div className='mt-4'>
                    <Table 
                        columns={columns} 
                        dataSource={tableData}
                        loading={loading}
                        rowKey="key"
                        expandable={{
                            expandedRowRender: (record: TableDataItem) => (
                                <div className="p-3 bg-gray-50">
                                    <p className="mb-2">{record.description}</p>
                                    <p className="text-sm text-gray-500 font-mono">Wallet Address: {record.address}</p>
                                </div>
                            ),
                        }}
                    />
                </div>
            </div>
        </main>
    );
};

export default Permission;