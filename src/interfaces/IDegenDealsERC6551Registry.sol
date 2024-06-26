// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IDegenDealsERC721.sol";
import "./ERC6551/IERC6551Registry.sol";

interface IDegenDealsERC6551Registry is IERC6551Registry {

    error CallerNotDegenDeals(address msgSender, address degenDeals);

    function degenDeals() external view returns (IDegenDealsERC721);

    function dealAccounts(uint256 dealId) external view returns (address);

    function dealAccountImplementations(uint256 dealId) external view returns (address);

    function createDealAccount(uint256 dealId, address implementation) external returns (address);

    function deriveCreateDealAccount(uint256 dealId, uint256 splitDealId) external returns (address);
}