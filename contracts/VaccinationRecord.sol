// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract VaccinationRecord {

    // Mapping of user address to their list of documentHashes (array of strings)
    mapping(address => string[]) public profiles;

    // Store Profile Data: user address and corresponding documentHash
    // Adds a new documentHash to the array of documentHashes for the user
    function storePatientVaccineProfile(address userAddress, string memory documentHash) public {
        profiles[userAddress].push(documentHash); // Add the new documentHash to the array
    }

    // Retrieve Profile Data: return the array of documentHashes for the user address
    function getPatientVaccineProfile(address userAddress) public view returns (string[] memory) {
        return profiles[userAddress];
    }
}
