const { expect } = require("chai");

describe("VaccinationRecord", function () {
  let VaccinationRecord, vaccinationRecord, owner, patient1, patient2;

  beforeEach(async function () {
    VaccinationRecord = await ethers.getContractFactory("VaccinationRecord");
    vaccinationRecord = await VaccinationRecord.deploy();
    await vaccinationRecord.waitForDeployment();

    [owner, patient1, patient2] = await ethers.getSigners();
  });

  it("Should store and retrieve vaccination profiles correctly", async function () {
    const dose1 = "Qmvaccine123";
    const dose2 = "Qmvaccine456";

    await vaccinationRecord.connect(patient1).storePatientVaccineProfile(patient1.address, dose1);
    await vaccinationRecord.connect(patient1).storePatientVaccineProfile(patient1.address, dose2);

    const storedProfiles = await vaccinationRecord.getPatientVaccineProfile(patient1.address);
    expect(storedProfiles).to.deep.equal([dose1, dose2]);
  });

  it("Should allow different patients to have their own vaccination profiles", async function () {
    const patient1Record = "Qmabc111";
    const patient2Record = "Qmxyz222";

    await vaccinationRecord.connect(patient1).storePatientVaccineProfile(patient1.address, patient1Record);
    await vaccinationRecord.connect(patient2).storePatientVaccineProfile(patient2.address, patient2Record);

    const profile1 = await vaccinationRecord.getPatientVaccineProfile(patient1.address);
    const profile2 = await vaccinationRecord.getPatientVaccineProfile(patient2.address);

    expect(profile1).to.deep.equal([patient1Record]);
    expect(profile2).to.deep.equal([patient2Record]);
  });

  it("Should return an empty array for users with no vaccination records", async function () {
    const profile = await vaccinationRecord.getPatientVaccineProfile(patient1.address);
    expect(profile).to.deep.equal([]);
  });
});





