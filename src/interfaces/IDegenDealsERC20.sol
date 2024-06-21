// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IDegenDealsERC20 is IERC20{
  
    /// @dev Returns the name of token
    function name() external view returns (string memory);

    /// @dev Returns the symbol of token
    function symbol() external view returns (string memory);

    /// @dev Returns the decimals of token
    function decimals() external view returns (uint8);

    /// @dev mint the tokens
    function mint(address to, uint256 amount) external;

}