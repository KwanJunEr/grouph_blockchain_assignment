import { ethers } from "ethers";

const contractAddress = "0x8ac0BE0a6AcDFDEd23417ed4eB0c37668Ee5Bb09";

const contractABI = [
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "recordHash",
              "type": "string"
          }
      ],
      "name": "storePatientGeneralInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
          }
      ],
      "name": "getPatientGeneralInfo",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "patientGeneralInfo",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
]


export const getContractInstance = async (provider) => {
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
};

// Make sure the parameter order matches how you call this function
export const storePatientProfileOnChain = async (provider, documentHash, userAddress) => {
  try {
    console.log("Getting contract instance...");
    const contract = await getContractInstance(provider);
    
    console.log("Calling contract.storeProfile with:", documentHash, userAddress);
    // Important: Parameter order should match the contract ABI
    const tx = await contract.storePatientGeneralInfo(documentHash, userAddress);
    
    console.log("Transaction sent: ", tx.hash);
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Profile stored successfully on-chain!");
    return tx;
  } catch (error) {
    console.error("Error storing profile on-chain:", error);
    throw error;
  }
};

export const getPatientGeneralInfo = async (provider, userAddress) => {
  try {
    const contract = await getContractInstance(provider);
    const documentHash = await contract.getPatientGeneralInfo(userAddress);
    console.log("Profile retrieved from chain:", documentHash);
    return documentHash;
  } catch (error) {
    console.error("Error retrieving profile from chain:", error);
    throw error;
  }
};