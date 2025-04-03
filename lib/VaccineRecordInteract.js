import { ethers } from "ethers";

// Replace this with the address of your deployed smart contract on Sepolia
const CONTRACT_ADDRESS = "0xA0d31f6015a92aD0fe0000B6DDb5f483c9508Af3";

// ABI for the VaccinationRecord contract
const CONTRACT_ABI = [
    "function storePatientVaccineProfile(address userAddress, string memory documentHash) public",
    "function getPatientVaccineProfile(address userAddress) public view returns (string[] memory)",
];

export const getContractInstance = async (provider) => {
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  return contract;
};

export const storeVaccineRecordOnChain = async (provider, userAddress, documentHash) => {
    try {
      const contract = await getContractInstance(provider); // Add await here
      const tx = await contract.storePatientVaccineProfile(userAddress, documentHash);
      console.log("Transaction sent: ", tx.hash)
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Profile stored successfully on-chain!");
      return tx; // Return the transaction
    } catch (error) {
      console.error("Error storing profile on-chain:", error);
      throw error; // Re-throw so it can be caught in the calling function
    }
  };

export const getVaccineProfileFromChain = async (provider, userAddress) => {
    try {
      const contract = await getContractInstance(provider); // Add await here
      const documentHashes = await contract.getPatientVaccineProfile(userAddress);
      console.log("Profile retrieved from chain:", documentHashes);
      return documentHashes;
    } catch (error) {
      console.error("Error retrieving profile from chain:", error);
      throw error; // Re-throw so it can be caught in the calling function
    }
  };