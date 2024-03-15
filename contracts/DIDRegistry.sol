pragma solidity ^0.8.0;

// A smart contract for managing Decentralized Identifiers (DIDs)
contract DIDRegistry {
    // Structure to hold information about a DID
    struct DID {
        string id; // The DID identifier
        address owner; // Owner of the DID
        string ipfsHash; // IPFS hash where the DID document is stored
        bool revoked; // Revocation status of the DID
        uint256 createdAt; // Creation timestamp
        uint256 updatedAt; // Last updated timestamp
    }

    // Mapping from DID identifier to DID details
    mapping(string => DID) public dids;
    // Events for logging actions on DIDs
    event DIDCreated(string indexed id, address owner, string ipfsHash);
    event DIDUpdated(string indexed id, string ipfsHash);
    event DIDRevoked(string indexed id);
    // Function to create a new DID
    function createDID(string memory _id, string memory _ipfsHash) public {
        require(dids[_id].createdAt == 0, "DID already exists.");
        dids[_id] = DID({
            id: _id,
            owner: msg.sender,
            ipfsHash: _ipfsHash,
            revoked: false,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        emit DIDCreated(_id, msg.sender, _ipfsHash);
    }
    // Function to update the IPFS hash of a DID document
    function updateDID(string memory _id, string memory _ipfsHash) public {
        require(dids[_id].createdAt != 0, "DID does not exist.");
        require(dids[_id].owner == msg.sender, "Only DID owner can update.");
        require(!dids[_id].revoked, "DID is revoked.");
        dids[_id].ipfsHash = _ipfsHash;
        dids[_id].updatedAt = block.timestamp;
        emit DIDUpdated(_id, _ipfsHash);
    }
    // Function to revoke a DID
    function revokeDID(string memory _id) public {
        require(dids[_id].createdAt != 0, "DID does not exist.");
        require(dids[_id].owner == msg.sender, "Only DID owner can revoke.");
        dids[_id].revoked = true;
        emit DIDRevoked(_id);
    }
    // Function to get information about a DID
    function getDID(string memory _id) public view returns (DID memory) {
        require(dids[_id].createdAt != 0, "DID does not exist.");
        return dids[_id];
    
    }
}
