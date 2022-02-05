// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./base64.sol";

contract Monsters is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) public species;
    mapping(uint256 => bool) public tamed;

    constructor() ERC721("Wallet Monsters", "WLTMON") {}

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Token does not exist");

        string memory attributes = string(
            abi.encodePacked(
                '{"species": "',
                species[tokenId],
                '", "tamed": ',
                tamed[tokenId] ? "true" : "false",
                "}"
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Wallet Monsters",',
                        '"description": "Wallet Monsters",',
                        '"attributes": ',
                        attributes,
                        "}"
                    )
                )
            )
        );
        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function unsecureMintForTesting(string memory _species)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        species[newItemId] = _species;
        tamed[newItemId] = false;
        _safeMint(msg.sender, newItemId);

        return newItemId;
    }

    function unsecureTameForTesting(uint256 tokenId) public {
        require(_exists(tokenId), "Does not exist");
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "Cannot use this token"
        );

        tamed[tokenId] = true;
    }
}
