// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract VaccinationRecord {

    // Mapping of user address to their documentHash
    mapping(address => string) public profiles;

    // Store Profile Data: user address and corresponding documentHash
    function storeProfile(address userAddress, string memory documentHash) public {
        profiles[userAddress] = documentHash;
    }

    // Retrieve Profile Data: return documentHash by user address
    function getProfile(address userAddress) public view returns (string memory) {
        return profiles[userAddress];
    }
}
