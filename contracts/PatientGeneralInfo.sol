// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract PatientGeneralInfo{
    struct Profile{
        string documentHash;
        address userAddress;
    }

    mapping(string => Profile) public profiles;

     // Store Profile Data
    function storePatientProfile(string memory documentHash, address userAddress) public {
        profiles[documentHash] = Profile(documentHash, userAddress);
    }

    // Retrieve Profile Data
    function getPatientProfile(string memory documentHash) public view returns (string memory, address) {
        Profile memory profile = profiles[documentHash];
        return (profile.documentHash, profile.userAddress);
    }
    
}