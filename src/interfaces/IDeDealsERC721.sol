// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/interfaces/IERC4906.sol";

interface IDeDealsERC721 is IERC721, IERC2981, IERC4906 {

    error OnlyCreatedStatus(uint256 dealId);

    error NotPaymentToken(address paymentToken);

    error DealUnderArbitrage(uint256 dealId);

    error InvalidPeriodShift(uint256 iteration, uint256 period, int256 periodShift);

    error NotObligorOfDeal(uint256 dealId, address obligor, address sender);

    error NotObligeeOfDeal(uint256 dealId, address obligee, address sender);

    error NotDealSubjectOnTransfer(uint256 dealId, address sender);

    error NotObligeeReceiver(uint256 dealId);

    error NotDealSubjectOnPay(uint256 dealId, address sender);

    error NotDealSubjectOnDeal(uint256 dealId, address sender);
    
    error DealAccountTransferObligorFailed(uint256 dealId, address account);

    error DealAccountTransferObligeeFailed(uint256 dealId, address account);

    error DealAccountPaymentFailed();

    error DealAccountFundFailed();

    error DealAccountDealFailed();

    error DealAccountArbitrageFailed();

    error DealAccountResolveFailed();

    event Mint(uint256 dealId, address obligor, address obligee, address dealAccount, string offerHash, address paymentToken, uint256 paymentAmount, uint256 period);

    event Split(uint256 dealId);

    event Designate(uint256 dealId, uint256 dealDiscountPercent);

    event Fund(uint256 dealId, address newObligor);

    event TransferObligor(uint256 dealId, address prevObligor, address newObligor);

    event TransferObligee(uint256 dealId, address prevObligee, address newObligor);

    event Pay(uint256 dealId, address obligee, address token, uint256 paymentAmount, address receiver);

    event Deal(uint256 dealId);

    event Arbitrage(uint256 dealId, address subject);

    event Resolve(uint256 dealId);

    enum DealStatus {
        CREATED,                    /// CREATED = 0
        MINTED,                     /// MINTED = 1
        PAID,                       /// PAID = 2
        OBLIGOR_SIGNED,             /// OBLIGOR_SIGNED = 3
        BENEFICIARY_SIGNED,         /// BENEFICIARY_SIGNED = 4
        DEAL,                       /// DEAL = 5
        ARBITRAGE_BY_OBLIGOR,       /// ARBITRAGE_BY_OBLIGOR = 6
        ARBITRAGE_BY_BENEFICIARY,   /// ARBITRAGE_BY_BENEFICIARY = 7
        RESOLVED                    /// RESOLVED = 8
    }

    struct DealData {
        // the creator of deal
        address minter;
        // the obligor of the deal (who have the obligation to execute deal)
        address obligor;
        // the description of object of deal
        string offerHash;
        // the address of payment token
        IERC20 paymentToken;
        // the amount of payment token
        uint256 paymentAmount;
        // the time period in seconds
        uint256 period;
        // the address of associated smart-contract account
        address dealAccount;
        // the deadline of deal
        uint256 deadline;
        // the obligee of deal (who have obligation for making a payment)
        address obligee;
        // is obligor executed his part of deal 
        bool obligorDeal;
        // is beneficiary satisfied of deal
        bool beneficiaryDeal;
        // if disputes arised, than who is arbitor
        address arbitrator;
        DealStatus status;  // status of deal
    }

    /// @notice obligee creates the deal and the obligor should to accept it
    function create(
        string memory offerHash,
        address paymentToken,
        uint256 paymentAmount,
        uint256 period,
        address obligor,
        address erc6551Account
    ) external returns (uint256 dealId, address dealAccount);

    function mint(
        string memory offerHash,
        address paymentToken,
        uint256 principalAmount,
        uint256 period,
        address obligee, 
        address erc6551Account
    ) external returns (uint256 dealId, address dealAccount);

    function split(uint256 dealId, uint256[] memory principalAmounts, int256[] memory periodShifts) external returns (uint256 splitDealIdFrom, uint256 splitDealIdTo);

    function designate(uint256 dealId, uint256 dealDiscountPercent_) external;

    function fund(uint256 dealId, bytes memory data) external;

    function pay(uint256 dealId, address beneficiary, bytes memory data) external;

    function getDeal(uint256 dealId) external view returns (DealData memory);

    function getDeals(uint256 dealIdFrom, uint256 dealIdTo) external view returns (DealData[] memory dealDatas);

    function calcFundAmount(uint256 dealId) external view returns (uint256 totalAmount, uint256 amountWithDiscount, uint256 fundFee);

}