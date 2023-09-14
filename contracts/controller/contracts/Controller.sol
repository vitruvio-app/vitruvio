// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

struct File {
    string encryptedSimmetricKey;
    string accessControlConditions;
    string version;
    uint256 timestamp;
    string cid;
}

contract Controller {
    mapping(address => mapping(string => File[])) userFiles;

    uint256 private percentage = 100; // 1% in basis points

    constructor() {}

    //* This function is in charged of uploading a new file into the controller *//
    //* Given a user address and archive Name it will add the file to the user's map *//
    function uploadNewFile(
        string memory cid,
        string memory encryptedsimmetricKey,
        string memory accessControlConditions,
        string memory version,
        string memory archiveName,
        uint256 timestamp
    ) public returns (File memory) {
        File memory newFile = File(
            encryptedsimmetricKey,
            accessControlConditions,
            version,
            timestamp,
            cid
        );
        //Intercept request to fund Vitruvio's treasure with 0.001 ether
        // payable(VITRUVIO_TREASURE).transfer(0.001 ether);

        //Add it to the user's map
        userFiles[msg.sender][archiveName].push(newFile);

        return newFile;
    }

    //* Gets all versions of an uploaded archive by a user *//
    function getFiles(
        address user,
        string memory archiveName
    ) public view returns (File[] memory) {
        return userFiles[user][archiveName];
    }

    //* Get the latest version of an uploaded archive*//
    function getLatestFile(
        address user,
        string memory archiveName
    ) public view returns (File memory) {
        File[] memory files = userFiles[user][archiveName];
        return files[files.length - 1];
    }

    //* Gets a file with a given version*//
    function getFileByVersion(
        address user,
        string memory archiveName,
        string memory version
    ) public view returns (File memory) {
        File[] memory files = userFiles[user][archiveName];
        File memory foundFile;
        for (uint256 i = 0; i < files.length; i++) {
            if (
                keccak256(abi.encodePacked(files[i].version)) ==
                keccak256(abi.encodePacked(version))
            ) {
                foundFile = files[i];
            }
        }
        require(
            keccak256(abi.encodePacked(foundFile.version)) ==
                keccak256(abi.encodePacked(version)),
            "File not found"
        );
        return foundFile;
    }

    //* Gets all available versions of an uploaded archive by a user *//
    function getAllAvailablesVersionByFile(
        address user,
        string memory archiveName
    ) public view returns (string[] memory) {
        File[] memory files = userFiles[user][archiveName];
        string[] memory versions = new string[](files.length);
        for (uint256 i = 0; i < files.length; i++) {
            versions[i] = files[i].version;
        }
        return versions;
    }
}
