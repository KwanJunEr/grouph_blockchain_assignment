import { ethers } from "ethers";

// Replace this with the address of your deployed smart contract on Sepolia
const CONTRACT_ADDRESS = "0x16a372F76A865EE12403c111a8c1b05BF32A209C";

// ABI for the MedicalRecords contract
const CONTRACT_ABI = [
    "function storeMedicalRecord(address userAddress, string memory recordHash) public",
    "function getMedicalRecord(address userAddress) public view returns (string[] memory)"
];

// Function to get contract instance
export const getContractInstance = async (provider) => {
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  return contract;
};

// Function to store medical record on the blockchain
export const storeMedicalRecordOnChain = async (provider, userAddress, recordHash) => {
  try {
    const contract = await getContractInstance(provider); // Add await here
    const tx = await contract.storeMedicalRecord(userAddress, recordHash);
    console.log("Transaction sent: ", tx.hash);
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Medical record stored successfully on-chain!");
    return tx; // Return the transaction
  } catch (error) {
    console.error("Error storing medical record on-chain:", error);
    throw error; // Re-throw so it can be caught in the calling function
  }
};

// Function to get medical records from the blockchain
export const getMedicalRecordFromChain = async (provider, userAddress) => {
  try {
    const contract = await getContractInstance(provider); // Add await here
    const recordHashes = await contract.getMedicalRecord(userAddress);
    console.log("Medical records retrieved from chain:", recordHashes);
    return recordHashes;
  } catch (error) {
    console.error("Error retrieving medical records from chain:", error);
    throw error; // Re-throw so it can be caught in the calling function
  }
};
