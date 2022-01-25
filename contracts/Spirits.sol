// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Spirits is ERC20 {
    constructor(uint256 initialSupply) ERC20("Spirits", "SPTS") {
        _mint(msg.sender, initialSupply);
    }

    function unsecureMintForTesting() public {
        _mint(msg.sender, 10);
    }
}
