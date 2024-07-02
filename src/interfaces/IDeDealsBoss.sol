// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IDeDealsBoss {
    
    function platformWallet() external view returns (address);

    function legalWallet() external view returns (address);

    function getShares() external view returns (uint256, uint256, uint256, uint256);

}