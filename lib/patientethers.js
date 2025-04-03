import { ethers } from "ethers";

// Initialize ethers provider (MetaMask)
const provider = new ethers.BrowserProvider(window.ethereum);
const contractAddress = "<Your_Contract_Address>";
const contractABI = [
  // ABI for storeProfile and getProfile
  "function storeProfile(string memory documentHash, address userAddress) public",
  "function getProfile(string memory documentHash) public view returns (string memory, address)",
];

const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

export async function storeProfileInBlockchain(documentHash, userAddress) {
  const tx = await contract.storeProfile(documentHash, userAddress);
  await tx.wait(); // Wait for the transaction to be mined
  return tx;
}
