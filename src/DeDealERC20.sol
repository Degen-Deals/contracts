// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IDeDealERC20.sol";
import "./interfaces/IDeDealsERC721.sol";

contract DeDealERC20 is Initializable, ERC20, IDeDealERC20 {

    IDeDealsERC721 public degenDeals;

    constructor() ERC20("Degen Deals Token", "DeDEAL") {}

    /// @notice instantiate the initial supply
    function initialize(address degenDeals_) public initializer() {
        degenDeals = IDeDealsERC721(degenDeals_);
        
    }

    function mint(address to, uint256 amount) public  {
        // require(msg.sender == address(degenDeals), "DegenDealsERC20: only DegenDealsERC721"); 
        _mint(to, amount);
    }

    function name() public pure override(ERC20, IDeDealERC20) returns (string memory) {
        return "Degen Deals Token";
    }

    function symbol() public pure override(ERC20, IDeDealERC20) returns (string memory) {
        return "DeDEAL";
    }

    function decimals() public pure override(ERC20, IDeDealERC20) returns (uint8) {
        return 18;
    }

}