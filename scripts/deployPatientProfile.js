const { ethers } = require("hardhat");

async function main() {
  try {
    console.log("Starting deployment...");
    
    // Get the deployer's wallet using hardhat ethers
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    
    // Get the contract factory
    const PatientGeneralInfo = await ethers.getContractFactory("PatientGeneralInfo");
    console.log("Contract factory created");
    
    // Deploy the contract
    const patientGeneralInfo = await PatientGeneralInfo.deploy();
    console.log("Deployment transaction sent");
    
    // Wait for the contract to be deployed
    await patientGeneralInfo.waitForDeployment();
    
    // Get the deployed contract address
    const patientGeneralInfoAddress = await patientGeneralInfo.getAddress();
    console.log("VaccineRecord contract deployed to:", patientGeneralInfoAddress);
  } catch (error) {
    console.error("Error during deployment:");
    console.error(error);
    process.exit(1);
  }
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });