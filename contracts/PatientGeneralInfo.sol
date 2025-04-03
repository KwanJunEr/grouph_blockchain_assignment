// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract PatientGeneralInfo {

    // Mapping of user address to their medical record (could be a document hash or record ID)
    mapping(address => string) public patientGeneralInfo;

    // Store Medical Record Data: user address and corresponding medical record
    function storePatientGeneralInfo(address userAddress, string memory recordHash) public {
        patientGeneralInfo[userAddress] = recordHash;
    }

    // Retrieve Medical Record Data: return the medical record associated with the user address
    function getPatientGeneralInfo(address userAddress) public view returns (string memory) {
        return patientGeneralInfo[userAddress];
    }
}

