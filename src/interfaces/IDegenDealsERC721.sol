// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/interfaces/IERC4906.sol";

interface IDegenDealsERC721 is IERC721, IERC2981, IERC4906 {

    error NotPaymentToken(address paymentToken);

    error DealUnderArbitrage();

    error NotObligorOfDeal(uint256 dealId);

    error NotObligeeOfDeal(uint256 dealId);

    error ForbiddenToChangeObligee();

    error NotDealSubjectOnTransfer(uint256 dealId, address sender);

    error NotObligeeReceiver(uint256 dealId);

    error NotDealSubjectOnPay(uint256 dealId, address sender);

    error NotDealSubjectOnDeal(uint256 dealId, address sender);
    
    error DealAccountTransferObligorFailed(uint256 dealId, address account);

    error DealAccountTransferObligeeFailed(uint256 dealId, address account);

    error DealAccountPaymentFailed();

    error DealAccountFundFailed();

    error DealAccountDealFailed();

    event Mint(uint256 dealId, address obligor, address obligee, address dealAccount, string offerHash, address paymentToken, uint256 paymentAmount, uint256 period);

    event Split(uint256 dealId);

    event Designate(uint256 dealId, uint256 dealDiscountPercent);

    event Fund(uint256 dealId, address newObligor);

    event TransferObligor(uint256 dealId, address prevObligor, address newObligor);

    event TransferObligee(uint256 dealId, address prevObligee, address newObligor);

    event Pay(uint256 dealId, address obligee, address token, uint256 paymentAmount);

    event Deal(uint256 dealId);

    event Arbitrage(uint256 dealId, address subject);

    event Resolve(uint256 dealId);

    enum DealStatus {
        MINTED,                 /// MINTED = 0
        PAID,                   /// PAID = 1
        OBLIGOR_SIGNED,         /// OBLIGOR_SIGNED = 2
        OBLIGEE_SIGNED,         /// OBLIGEE_SIGNED = 3
        DEAL,                   /// DEAL = 4
        ARBITRAGE_BY_OBLIGOR,   /// ARBITRAGE_BY_OBLIGOR = 5
        ARBITRAGE_BY_OBLIGEE,   /// ARBITRAGE_BY_OBLIGEE = 6
        RESOLVED                /// RESOLVED = 7
    }

    /// @dev if minter == obligor, than no 
    /// @dev if parentDealId == dealId, than it is root deal
    struct DealData {
        address minter;
        address obligor;
        string offerHash;
        IERC20 paymentToken;
        uint256 paymentAmount;
        uint256 period;
        address dealAccount;
        uint256 deadline;
        address obligee;
        bool obligorDeal;
        bool obligeeDeal;
        address arbitrator;
        DealStatus status;
    }

    function mint(
        string memory offerHash,
        address paymentToken,
        uint256 principalAmount,
        uint256 period,
        address obligee, 
        address erc6551Account
    ) external returns (uint256 dealId, address dealAccount);

    function split(uint256 dealId, uint256[] memory principalAmounts) external returns (uint256 splitDealIdFrom, uint256 splitDealIdTo);

    function designate(uint256 dealId, uint256 dealDiscountPercent_) external;

    function fund(uint256 dealId, bytes memory data) external;

    function pay(uint256 dealId, bytes memory data) external;

    function getDeal(uint256 dealId) external view returns (DealData memory);

    function calcFundAmount(uint256 dealId) external view returns (uint256 totalAmount, uint256 amountWithDiscount, uint256 fundFee);

}