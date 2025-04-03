// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PatientDataAccess {
    // Track which doctors each patient has authorized
    // patient address => doctor address => has access
    mapping(address => mapping(address => bool)) public patientAuthorizations;
    
    // Events for logging actions
    event DoctorAuthorized(address indexed patient, address indexed doctor);
    event DoctorRevoked(address indexed patient, address indexed doctor);
    
    // Patient authorizes a doctor to access their data
    function authorizeDoctor(address doctorAddress) public {
        patientAuthorizations[msg.sender][doctorAddress] = true;
        emit DoctorAuthorized(msg.sender, doctorAddress);
    }
    
    // Patient revokes a doctor's access to their data
    function revokeDoctor(address doctorAddress) public {
        patientAuthorizations[msg.sender][doctorAddress] = false;
        emit DoctorRevoked(msg.sender, doctorAddress);
    }
    
    // Check if a doctor has access to a patient's data
    // Can be called by anyone, but only returns true if explicitly authorized
    function checkAccess(address doctorAddress, address patientAddress) public view returns (bool) {
        return patientAuthorizations[patientAddress][doctorAddress];
    }
}