// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

/** 
 * @title DeDealsBoss.
 * @dev stores 
 */
contract DeDealsBoss {//is Ownable2Step {
    
    /// @dev address of platform wallet
    address public platformWallet;

    /// @dev address of legal wallet
    address public legalWallet;

    constructor(address platformWallet_, address legalWallet_) {
        platformWallet = platformWallet_;
        legalWallet = legalWallet_;

    }

    function execute() public {}

}