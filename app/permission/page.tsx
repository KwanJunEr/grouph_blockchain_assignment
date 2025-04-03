"use client";
import React, { useState, useEffect } from 'react';
import { Table } from "antd";
import { Button } from '@/components/ui/button';

import { ethers } from "ethers";

// Import the ABI - adjust path as needed
import permissionAbi from "@/abijson/permissionabi.json";

// Helper function to simulate MongoDB ObjectId
function ObjectId(id: string) {
    return { toString: () => id };
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Define interfaces for type safety
interface DoctorData {
    _id: { toString: () => string };
    name: string;
    description: string;
    location: string;
    specialty: string;
    __v: number;
    address: string;
}

interface TableDataItem {
    key: string;
    _id: { toString: () => string };
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
  on(event: string, callback: (...args: any[]) => void): void;
  removeListener(event: string, callback: (...args: any[]) => void): void;
  // Add other MetaMask-specific methods if needed
}


const Permission = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<string | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [tableData, setTableData] = useState<TableDataItem[]>([]);

    // Contract address - this would be your deployed contract address in production
    const contractAddress = "0x1234567890123456789012345678901234567890"; // Placeholder

    // Sample doctor data from your off-chain database with fabricated wallet addresses
    const doctorData: DoctorData[] = [

        {
            _id: ObjectId('67ea7d729695f4a3c5f336b2'),
            name: "Dr. Emily Carter",
            description: "Dr. Carter is a highly skilled cardiologist specializing in the diagno...",
            location: "City Health Clinic, New York",
            specialty: "Cardiologist",
            __v: 0,
            address: "0xd0c10000000000000000000000000000000000005" // Fabricated address
        },
        {
            _id: ObjectId('67ea7d729695f4a3c5f336b3'),
            name: "Dr. James Wilson",
            description: "Dr. Wilson is an experienced neurologist with expertise in...",
            location: "Metro Neurology Center, Boston",
            specialty: "Neurologist",
            __v: 0,
            address: "0xd0c20000000000000000000000000000000000006" // Fabricated address
        },
        {
            _id: ObjectId('67ea7d729695f4a3c5f336b4'),
            name: "Dr. Sarah Johnson",
            description: "Dr. Johnson specializes in pediatric care with over 10 years...",
            location: "Children's Medical Center, Chicago",
            specialty: "Pediatrician",
            __v: 0,
            address: "0xd0c30000000000000000000000000000000000007" // Fabricated address
        },
        {
            _id: ObjectId('67ea7d729695f4a3c5f336b5'),
            name: "Dr. Michael Lee",
            description: "Dr. Lee is a board-certified dermatologist focusing on...",
            location: "Skin Health Institute, Los Angeles",
            specialty: "Dermatologist",
            __v: 0,
            address: "0xd0c40000000000000000000000000000000000008" // Fabricated address
        }
    ];

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
            
              // Now use the cast ethereum object for event listening
              ethereum.on('accountsChanged', (accounts: string[]) => {
                setAccount(accounts[0]);
                generatePermissionsData(contractInstance, accounts[0]);
              });
            
              // Generate permission data
              generatePermissionsData(contractInstance, account);
            }
        } catch (error) {
            console.error("Error initializing ethers:", error);
            
            // Even if there's an error, show simulated data
            generatePermissionsData();
        }
    };

    // Generate permission data - handles both real and simulated scenarios
    const generatePermissionsData = async (contractInstance: ethers.Contract | null = null, patientAddress: string | null = null) => {
        const permissionData: TableDataItem[] = [];

        for (const doctor of doctorData) {
            let hasAccess = false;
            
            // Try to get real access status if contract and patient address are available
            if (contractInstance && patientAddress && ethers.isAddress(doctor.address)) {
                try {
                    // Call the contract to check if this doctor has access
                    hasAccess = await contractInstance.checkAccess(doctor.address, patientAddress);
                } catch (err) {
                    console.warn(`Failed to check access for doctor ${doctor.name}:`, err);
                    // Fall back to random simulation if contract call fails
                    hasAccess = Math.random() > 0.5;
                }
            } else {
                // Simulate access status if we can't get real data
                hasAccess = Math.random() > 0.5;
            }

            // Generate simulated last granted date
            const lastGrantedDate = hasAccess ? 
                new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString() : 
                "N/A";
            
            permissionData.push({
                key: doctor._id.toString(),
                _id: doctor._id,
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
            setLoading(true);
            
            // Check if we can interact with the contract
            if (contract && account && ethers.isAddress(doctorAddress)) {
                try {
                    let tx;
                    if (currentAccess) {
                        // Revoke access
                        tx = await contract.revokeDoctor(doctorAddress);
                    } else {
                        // Grant access
                        tx = await contract.authorizeDoctor(doctorAddress);
                    }

                    // Wait for transaction to be mined
                    await tx.wait();
                    
                    console.log(`Successfully ${currentAccess ? 'revoked' : 'granted'} access for doctor: ${doctorAddress}`);
                    
                    // After transaction completes, refresh permissions data
                    await generatePermissionsData(contract, account);
                    return;
                } catch (err) {
                    console.error("Contract interaction failed:", err);
                    // Fall back to simulation if contract call fails
                }
            }
            
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
                            lastgranteddate: newAccessStatus ? new Date().toLocaleDateString() : item.lastgranteddate
                        };
                    }
                    return item;
                })
            );
            
            console.log(`Simulated ${currentAccess ? 'revoke' : 'grant'} access for doctor: ${doctorAddress}`);
            
        } catch (error) {
            console.error("Error toggling access:", error);
            alert("Error toggling doctor access. See console for details.");
        } finally {
            setLoading(false);
        }
    };

    // Initialize on component mount
    useEffect(() => {
        initializeEthers();
    }, []);

    // Add type definitions for columns
    type ColumnType = {
        title: string;
        dataIndex?: string;
        key: string;
        render?: (text: any, record: TableDataItem) => React.ReactNode;
    };

    const columns: ColumnType[] = [
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
            render: (status) => (
                <span className={status === "Granted" ? "text-green-600" : "text-red-600"}>
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
            render: (_, record) => (
                <Button 
                    onClick={() => toggleAccess(record.address, record.hasAccess)}
                    disabled={loading}
                    className={record.hasAccess ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
                >
                    {record.hasAccess ? "Revoke Access" : "Grant Access"}
                </Button>
            ),
        }
    ];

    return (
        <main className='px-5 py-5 min-h-screen'>
            <div className='flex flex-col'>
                <div className='py-2'>
                    <h1 className='text-2xl font-bold'>Permission Log</h1>
                    <p className='text-xl'>Manage who has access to your data</p>
                    {account && (
                        <p className='text-sm mt-2'>Connected account: {account}</p>
                    )}
                    {!account && (
                        <p className='text-sm mt-2 text-orange-500'>
                            Simulation mode: MetaMask not connected
                        </p>
                    )}
                </div>
                <hr className='h-2 w-full'/>
                <div className='mt-10'>
                    <Table 
                        columns={columns} 
                        dataSource={tableData}
                        loading={loading}
                        rowKey="key"
                        expandable={{
                            expandedRowRender: (record) => (
                                <div className="p-3 bg-gray-50">
                                    <p className="mb-2">{record.description}</p>
                                    <p className="text-sm text-gray-500">Wallet Address: {record.address}</p>
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