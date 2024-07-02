// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/interfaces/IERC4906.sol";

interface IDeDealsERC721 is IERC721, IERC2981, IERC4906 {

    error OnlyDeDealsBoss(address dedealsBoss, address sender);

    error OnlyObligorWithSoul();
    
    error OnlyRecipientWithSoul();

    error OnlyObligeeWithSoul();

    error OnlyBeneficiaryWithSoul();

    error OnlyRecipient(uint256 dealId, address recipient, address sender);

    error OnlyCreatedStatus(uint256 dealId);

    error OnlyMintedStatus(uint256 dealId);

    error OnlyPaidStatus(uint256 dealId);

    error OnlyArbitrageStatus(uint256 dealId);

    error NoDiscount();

    error BeneficiaryMustDealOrArbitrage(uint256 dealId);

    error OnlyDealOrResolved(uint256 dealId);

    error NotPaymentToken(address paymentToken);

    error DealUnderArbitrage(uint256 dealId);

    error InvalidPeriodShift(uint256 iteration, uint256 period, int256 periodShift);

    error InvalidPercent(uint256 dealId, uint256 dealDiscountPercent_);

    error NotObligorOfDeal(uint256 dealId, address obligor, address sender);

    error NotObligeeOfDeal(uint256 dealId, address obligee, address sender);
    
    error NotTransferSubject(uint256 dealId, address obligor, address newObligor, address sender);

    error FailTransferObligor(uint256 dealId, address obligor, address newObligor, address sender);

    error FailTransferObligee(uint256 dealId, address obligee, address newObligee, address sender);

    error NotDealSubject(uint256 dealId, address sender);

    error NotObligeeReceiver(uint256 dealId);

    error DealAccountTransferObligorFailed(uint256 dealId, address account);

    error DealAccountTransferObligeeFailed(uint256 dealId, address account);

    error DealAccountPaymentFailed();

    error DealAccountFundFailed();

    error DealAccountDealFailed();

    error DealAccountArbitrageFailed();

    error DealAccountResolveFailed();
    
    // EVENTS

    event Mint(uint256 dealId, address obligor, address obligee, address dealAccount, string offerHash, address paymentToken, uint256 paymentAmount, uint256 period);

    event Split(uint256 dealId);

    event Discount(uint256 dealId, uint256 dealDiscountPercent);

    event Bargain(uint256 dealId, address newObligor);

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
        address issuer;         // the issuer of a deal. Can be obligor or obligee
        address obligor;        // the obligor of the deal (who have the obligation to execute deal)
        address recipient;      // the recipient of payment 
        address obligee;        // the obligee of deal (who have obligation for making a payment)
        address beneficiary;    // the beneficiary of offer after payment
        address arbitrator;     // if disputes arised, than who is arbitor
        address dealAccount;    // the address of associated smart-contract account
        string offerHash;       // the description of object of deal
        IERC20 paymentToken;    // the address of payment token
        uint256 paymentAmount;  // the amount of payment token
        uint256 period;         // the time period in seconds
        uint256 deadline;       // the deadline of deal
        DealStatus status;      // status of deal
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

    function mint(uint256 dealId) external;

    function mint(
        string memory offerHash,
        address paymentToken,
        uint256 paymentAmount,
        uint256 period,
        address obligee, 
        address erc6551Account
    ) external returns (uint256 dealId, address dealAccount);

    function split(uint256 dealId, uint256[] memory principalAmounts, int256[] memory periodShifts) external returns (uint256 splitDealIdFrom, uint256 splitDealIdTo);

    function discount(uint256 dealId, uint256 dealDiscountPercent_) external;

    function bargain(uint256 dealId, bytes memory data) external;

    function pay(uint256 dealId, address beneficiary, bytes memory data) external;

    function getDeal(uint256 dealId) external view returns (DealData memory);

    function getDeals(uint256 dealIdFrom, uint256 dealIdTo) external view returns (DealData[] memory dealDatas);

    function calcCreateFee(uint256 paymentAmount) external view returns (uint256);

    function calcMintFee(uint256 paymentAmount) external view returns (uint256);

    function calcSplitFee(uint256 dealId) external view returns (uint256 totalAmount, uint256 paymentAmount, uint256 splitFee);

    function calcBargainAmount(uint256 dealId) external view returns (uint256 totalAmount, uint256 amountWithDiscount, uint256 fundFee);

    function calcPayAmount(uint256 dealId) external view returns (uint256 totalAmount, uint256 payAmount, uint256 payFee);

}