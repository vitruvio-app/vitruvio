// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

struct File {
    string encryptedSimmetricKey;
    string accessControlConditions;
    string version;
    uint256 timestamp;
}

contract Controller {
    address owner;
    address VITRUVIO_TREASURE;
    mapping(string => File) files;

    uint256 private percentage = 100; // 1% in basis points

    constructor() {
        owner = msg.sender;
    }

    //* This function is in charged of uploading a new file into the controller *//
    function uploadNewFile(
        string memory cid,
        string memory encryptedsimmetricKey,
        string memory accessControlConditions,
        string memory version,
        uint256 timestamp
    ) public payable {
        require(msg.sender == owner, "Only the owner can upload a new file");
        //Intercept request to fund Vitruvio's treasure with 0.001 ether
        payable(VITRUVIO_TREASURE).transfer(0.001 ether);
        //Update map
        files[cid] = File({
            encryptedSimmetricKey: encryptedsimmetricKey,
            accessControlConditions: accessControlConditions,
            version: version,
            timestamp: timestamp
        });
    }
}
