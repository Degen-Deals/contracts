// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IDegenDealsERC20.sol";
import "./interfaces/IDegenDealsERC721.sol";

contract DegenDealsERC20 is Initializable, ERC20, IDegenDealsERC20 {

    IDegenDealsERC721 public degenDeals;

    constructor() ERC20("Degen Deals Token", "DeDEAL") {}

    function initialize(address degenDeals_) public initializer() {
        degenDeals = IDegenDealsERC721(degenDeals_);

    }

    function mint(address to, uint256 amount) public  {
        // require(msg.sender == address(degenDeals), "DegenDealsERC20: only DegenDealsERC721"); 
        _mint(to, amount);
    }

    function name() public pure override(ERC20, IDegenDealsERC20) returns (string memory) {
        return "Degen Deals Token";
    }

    function symbol() public pure override(ERC20, IDegenDealsERC20) returns (string memory) {
        return "DeDEAL";
    }

    function decimals() public pure override(ERC20, IDegenDealsERC20) returns (uint8) {
        return 18;
    }

}