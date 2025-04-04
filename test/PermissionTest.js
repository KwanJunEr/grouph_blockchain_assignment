const { expect } = require("chai");

describe("PatientDataAccess", function () {
  let PatientDataAccess, patientDataAccess, owner, patient, doctor1, doctor2;

  beforeEach(async function () {
    PatientDataAccess = await ethers.getContractFactory("PatientDataAccess");
    patientDataAccess = await PatientDataAccess.deploy();
    await patientDataAccess.waitForDeployment();

    [owner, patient, doctor1, doctor2] = await ethers.getSigners();
  });

  it("Should allow a patient to authorize a doctor", async function () {
    await patientDataAccess.connect(patient).authorizeDoctor(doctor1.address);
    const access = await patientDataAccess.checkAccess(doctor1.address, patient.address);
    expect(access).to.equal(true);
  });

  it("Should allow a patient to revoke a doctor's access", async function () {
    // First authorize the doctor
    await patientDataAccess.connect(patient).authorizeDoctor(doctor1.address);
    let access = await patientDataAccess.checkAccess(doctor1.address, patient.address);
    expect(access).to.equal(true);

    // Then revoke
    await patientDataAccess.connect(patient).revokeDoctor(doctor1.address);
    access = await patientDataAccess.checkAccess(doctor1.address, patient.address);
    expect(access).to.equal(false);
  });

  it("Should emit event when doctor is authorized", async function () {
    await expect(
      patientDataAccess.connect(patient).authorizeDoctor(doctor1.address)
    )
      .to.emit(patientDataAccess, "DoctorAuthorized")
      .withArgs(patient.address, doctor1.address);
  });

  it("Should emit event when doctor access is revoked", async function () {
    await patientDataAccess.connect(patient).authorizeDoctor(doctor1.address);

    await expect(
      patientDataAccess.connect(patient).revokeDoctor(doctor1.address)
    )
      .to.emit(patientDataAccess, "DoctorRevoked")
      .withArgs(patient.address, doctor1.address);
  });

  it("Should return false if doctor was never authorized", async function () {
    const access = await patientDataAccess.checkAccess(doctor2.address, patient.address);
    expect(access).to.equal(false);
  });
});
