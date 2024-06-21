// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/DegenDealsERC20.sol";
import "../src/DegenDealsERC721.sol";
import "../src/DegenDealsERC6551Registry.sol";
import "../src/DegenDealsERC6551Account.sol";
import "../src/mock/MockERC20.sol";

contract DegenDealsERC721Test is Test {
    DegenDealsERC20 public dedeal;
    DegenDealsERC721 public degenDealsERC721;
    DegenDealsERC6551Registry public registry;
    DegenDealsERC6551Account public account;
    address public entryPoint = address(0x999);
    address public dedealToken;
    address public platformWallet = address(0x1);
    address public legalWallet = address(0x2);
    address public kycWallet = address(0x3);
    
    address public obligor = address(0x4);
    address public obligee = address(0x5);

    function setUp() public {
        dedeal = new DegenDealsERC20();

        registry = new DegenDealsERC6551Registry();

        account = new DegenDealsERC6551Account();

        degenDealsERC721 = new DegenDealsERC721(
            dedealToken,
            address(registry),
            platformWallet,
            legalWallet,
            kycWallet
        );

        registry.initialize(address(degenDealsERC721), payable(account));
        registry.setEntryPoint(entryPoint);

        degenDealsERC721.grantRole(degenDealsERC721.MEMBER_ROLE(), obligor);
        degenDealsERC721.grantRole(degenDealsERC721.MEMBER_ROLE(), obligee);
        degenDealsERC721.modifyPaymentToken(address(dedeal), true);

        dedeal.mint(obligor, 1000 ether);
        dedeal.mint(obligee, 1000 ether);
    }

    function testMintAndPay() public {

        vm.startPrank(obligor);
        dedeal.approve(address(degenDealsERC721), 1000 ether);
        
        // Mint a new deal
        (uint256 dealId, address dealAccount) = degenDealsERC721.mint(
            "offerHash",
            address(dedeal),
            100 ether,
            30 days,
            obligee,
            address(0) // Assuming no specific ERC6551 account implementation for this test
        );

        // address entryPointOnReg = address(registry.entryPoint());
        // emit log_named_address("reg: ", entryPointOnReg); // Используем emit log_named_uint для логирования


        // address entryPointOnAcc = address(DegenDealsERC6551Account(payable(dealAccount)).entryPoint());
        // emit log_named_address("dealId: ", entryPointOnAcc); // Используем emit log_named_uint для логирования

        // Assertions after minting
        assertEq(degenDealsERC721.ownerOf(dealId), obligor);
        DegenDealsERC721.DealData memory dealData = degenDealsERC721.getDeal(dealId);
        assertEq(dealData.minter, obligor);
        assertEq(dealData.obligor, obligor);
        assertEq(dealData.obligee, obligee);
        assertEq(dealData.paymentAmount, 100 ether);

        vm.stopPrank();
        vm.startPrank(obligee);
        dedeal.approve(address(degenDealsERC721), 1000 ether);

        uint256 balanceOfObligorBefore = dedeal.balanceOf(obligor);
        uint256 balanceOfObligeeBefore = dedeal.balanceOf(obligee);
        emit log_named_uint("bal obligor bef: ", balanceOfObligorBefore);
        emit log_named_uint("bal obligee bef: ", balanceOfObligeeBefore);

        degenDealsERC721.pay(dealId, "");
        uint256 balanceOfObligorAfter = dedeal.balanceOf(obligor);
        uint256 balanceOfObligeeAfter = dedeal.balanceOf(obligee);
        emit log_named_uint("bal obligor aft: ", balanceOfObligorAfter);
        emit log_named_uint("bal obligee aft: ", balanceOfObligeeAfter);
        
        dealData = degenDealsERC721.getDeal(dealId);
        assertEq(degenDealsERC721.ownerOf(dealId), obligee);
        assertEq(uint(dealData.status), uint(IDegenDealsERC721.DealStatus.PAID));
    
    }
}