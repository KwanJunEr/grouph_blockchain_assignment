// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract MedicalRecords {

    // Mapping of user address to their medical record (could be a document hash or record ID)
    mapping(address => string) public medicalRecords;

    // Store Medical Record Data: user address and corresponding medical record
    function storeMedicalRecord(address userAddress, string memory recordHash) public {
        medicalRecords[userAddress] = recordHash;
    }

    // Retrieve Medical Record Data: return the medical record associated with the user address
    function getMedicalRecord(address userAddress) public view returns (string memory) {
        return medicalRecords[userAddress];
    }
}
