const { expect } = require("chai");

describe("MedicalRecords", function () {
  let MedicalRecords, medicalRecords, owner, addr1, addr2;

  beforeEach(async function () {
    // Get the contract factory and deploy
    MedicalRecords = await ethers.getContractFactory("MedicalRecords");
    medicalRecords = await MedicalRecords.deploy();
    await medicalRecords.waitForDeployment();

    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should store and retrieve medical records correctly", async function () {
    const record1 = "Qmabc123"; // Simulating an IPFS hash or document ID
    const record2 = "Qmdef456";

    // Store two records for addr1
    await medicalRecords.connect(addr1).storeMedicalRecord(addr1.address, record1);
    await medicalRecords.connect(addr1).storeMedicalRecord(addr1.address, record2);

    // Retrieve records
    const records = await medicalRecords.getMedicalRecord(addr1.address);

    // Check if records match
    expect(records).to.deep.equal([record1, record2]);
  });

  it("Should allow multiple users to store their own records", async function () {
    const addr1Record = "Qmaddr1xyz";
    const addr2Record = "Qmaddr2xyz";

    await medicalRecords.connect(addr1).storeMedicalRecord(addr1.address, addr1Record);
    await medicalRecords.connect(addr2).storeMedicalRecord(addr2.address, addr2Record);

    const recordsAddr1 = await medicalRecords.getMedicalRecord(addr1.address);
    const recordsAddr2 = await medicalRecords.getMedicalRecord(addr2.address);

    expect(recordsAddr1).to.deep.equal([addr1Record]);
    expect(recordsAddr2).to.deep.equal([addr2Record]);
  });

  it("Should return an empty array if no records exist for an address", async function () {
    const records = await medicalRecords.getMedicalRecord(addr1.address);
    expect(records).to.deep.equal([]);
  });
});





