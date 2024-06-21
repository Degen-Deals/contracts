// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/DegenDealsERC20.sol";
import "../src/DegenDealsERC721.sol";
import "../src/DegenDealsERC6551Registry.sol";
import "../src/DegenDealsERC6551Account.sol";
import "../src/mock/MockERC20.sol";

contract DeployScript is Script {
    DegenDealsERC20 public degenDealsERC20;
    DegenDealsERC721 public degenDealsERC721;
    DegenDealsERC6551Registry public registry;
    DegenDealsERC6551Account public account;
    MockERC20 public paymentToken;
    
    address public entryPoint = address(0x999);
    address public platformWallet = address(0x1);
    address public legalWallet = address(0x2);
    address public kycWallet = address(0x3);

    function run() external {
        vm.startBroadcast();

        DegenDealsERC20 dedeal = new DegenDealsERC20();
        DegenDealsERC6551Account account = new DegenDealsERC6551Account();
        DegenDealsERC6551Registry registry = new DegenDealsERC6551Registry();
        DegenDealsERC721 degenDealsERC721 = new DegenDealsERC721(
            address(dedeal),
            address(registry),
            platformWallet,
            legalWallet,
            kycWallet
        );

        registry.initialize(address(degenDealsERC721), payable(address(account)));
        registry.setEntryPoint(entryPoint);

        address obligor = address(0x4);
        address obligee = address(0x5);
        degenDealsERC721.grantRole(degenDealsERC721.MEMBER_ROLE(), obligor);
        degenDealsERC721.grantRole(degenDealsERC721.MEMBER_ROLE(), obligee);
        degenDealsERC721.modifyPaymentToken(address(dedeal), true);

        dedeal.mint(obligor, 1000 ether);
        dedeal.mint(obligee, 1000 ether);

        vm.stopBroadcast();
    }
}