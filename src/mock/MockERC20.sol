// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {

    constructor () ERC20("Mock ERC20", "MCK") {
        uint256 initialSupply = 1_000_000 * 10 ** decimals();
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function name() public view override(ERC20) returns (string memory) {
        return ERC20.name();
    }

    function symbol() public view override(ERC20) returns (string memory) {
        return ERC20.symbol();
    }

    function decimals() public pure override(ERC20) returns (uint8) {
        return 18;
    }

}