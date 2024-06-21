// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IDegenDealsERC721.sol";
import "./ERC6551/IERC6551Account.sol";

interface IDegenDealsERC6551Account is IERC6551Account {

    error NotGegenDeals(address degenDeals, address msgSender);

    function initialize(address entryPoint_, address erc6551Registry_, uint256 dealId) external;

    function degenDeals() external view returns (IDegenDealsERC721);

    function dealId() external view returns (uint256);

    function transferObligor(bytes memory data) external;

    function transferObligee(bytes memory data) external;

    function fund(bytes memory data) external;

    function pay(bytes memory data) external;

    function deal(bytes memory data) external;
    
}