const { expect } = require("chai");

describe("PatientGeneralInfo", function () {
  let PatientGeneralInfo, patientGeneralInfo, owner, addr1, addr2;

  beforeEach(async function () {
    // Get the contract factory and deploy
    PatientGeneralInfo = await ethers.getContractFactory("PatientGeneralInfo");
    patientGeneralInfo = await PatientGeneralInfo.deploy();
    await patientGeneralInfo.waitForDeployment();

    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should store and retrieve general info correctly for a single user", async function () {
    const generalInfo = "QmGeneralHash001"; // Simulating IPFS hash or document ID

    await patientGeneralInfo.connect(addr1).storePatientGeneralInfo(addr1.address, generalInfo);
    const retrieved = await patientGeneralInfo.getPatientGeneralInfo(addr1.address);

    expect(retrieved).to.equal(generalInfo);
  });

  it("Should update general info if overwritten", async function () {
    const initialInfo = "QmInitialHash";
    const updatedInfo = "QmUpdatedHash";

    await patientGeneralInfo.connect(addr1).storePatientGeneralInfo(addr1.address, initialInfo);
    await patientGeneralInfo.connect(addr1).storePatientGeneralInfo(addr1.address, updatedInfo);

    const retrieved = await patientGeneralInfo.getPatientGeneralInfo(addr1.address);
    expect(retrieved).to.equal(updatedInfo);
  });

  it("Should return an empty string if no general info exists", async function () {
    const retrieved = await patientGeneralInfo.getPatientGeneralInfo(addr2.address);
    expect(retrieved).to.equal(""); // Default for uninitialized string in Solidity
  });
});
