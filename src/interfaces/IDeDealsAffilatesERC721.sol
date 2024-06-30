// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IDeDealsAffilatesERC721 is IERC721, IERC2981 {

    function distributeAffilatesFees(IERC20 paymentToken, address affilate, uint256 affilateFee) external;
    
}