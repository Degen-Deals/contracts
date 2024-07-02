// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IDeDealERC20.sol";
import "./interfaces/IDeDealsBoss.sol";
import "./interfaces/IDeDealsERC721.sol";
import "./interfaces/IDeDealsERC6551Account.sol";
import "./interfaces/IDeDealsERC6551Registry.sol";
import "./interfaces/IDeDealsAffilatesERC721.sol";
import "./interfaces/IDeDealsSoulBoundTokenERC721.sol";

/**
 * @title Non Fungible Token of Deals
 * @notice Tokenization of obligation and rights with associated smart-contract accounts
 * @author Alex Chusov - CEO (1NFT.agency - aleks@1nft.agency)
 * @author Vakhtanh Chikhladze - CTO (the.vaho1337@gmail.com)
 * @author Petro Yaremenko - Lead Dev (p.yaremenko@ukr.net)
 */
contract DeDealsERC721 is Initializable, AccessControl, ERC721, IDeDealsERC721 {
    using SafeERC20 for IERC20;

    /// @dev ARBITRATOR_ROLE is trusted arbitrors
    bytes32 public constant ARBITRATOR_ROLE = keccak256("ARBITRATOR_ROLE");

    /// @dev 100% == 100_000
    uint256 public constant PERCENT_DENOMINATOR = 100_000;

    /// @dev amount of total minted deals
    uint256 public totalDeals;

    /// @dev link for terms and conditions
    string public defaultURI;

    /// @dev address of DeDeals boss
    IDeDealsBoss public dedealsBoss;

    /// @dev the platform token
    IDeDealERC20 public dedeal;

    /// @dev ERC6551 registry
    IDeDealsERC6551Registry public dedealsERC6551Registry;

    /// @dev address of degen deals soul bound token 
    IDeDealsSoulBoundTokenERC721 public dedealsSBT;

    /// @dev Degen Deals affilates 
    IDeDealsAffilatesERC721 public dedealsAffilates;

    /// FEES PERCENTS

    /// @dev create fee percent
    uint256 public createFeePercent;

    /// @dev mint fee percent
    uint256 public mintFeePercent;
    
    /// @dev buy fee percent
    uint256 public payFeePercent;

    /// @dev split fee percent
    uint256 public splitFeePercent;

    /// @dev fund fee percent when fund is executed
    uint256 public fundFeePercent;

    /// @dev tranfer fee percent
    uint256 public transferFeePercent;

    /// @dev royalty percent
    uint256 public defaultRoyaltyFeePercent;

    /// FEE SHARES

    /// @dev platform share of fee
    uint256 public platformFeeShare;

    /// @dev legal share of fee
    uint256 public legalFeeShare;

    /// @dev affilate share of fee
    uint256 public affilateFeeShare;

    /// @dev the sum of all fees
    uint256 public totalFeeShare;

    /// @dev amount of dedeal token per successful deal
    uint256 public dedealRate;

    /// @dev address of payment token => is payment token
    mapping(address => bool) public isPaymentToken;

    /// @dev dealId => DealData
    mapping(uint256 => DealData) public deals;

    /// @dev dealId => address of deal issuer
    mapping(uint256 => address) public dealIssuer;

    /// @dev split deal id => deal id
    ///      if parentDealId[dealId] == dealId than it is root deal
    mapping(uint256 => uint256) public parentDealId;

    /// @dev dealId => discount of deal id
    mapping(uint256 => uint256) public dealDiscountPercent;

    /// @dev dealId => address of obligator or obligee =>link to legal documents
    mapping(uint256 => mapping (address obligatedSubject => string)) public dealURI;

    /// @dev deal id => address of obligator or obligee => royalty fee percent
    mapping (uint256 dealId => mapping (address obligatedSubject => uint256)) public royaltyFeePercent;

    /// @dev dealId => current obligor => new obligor => is eligible
    mapping(uint256 => mapping (address => mapping(address => bool))) public obligorTransfer;

    /// @dev dealId => obligee => obligee receiver
    mapping(uint256 => mapping (address => mapping(address => bool))) public obligeeTransfer;

    modifier onlyDeDealsBoss() {
        if (address(dedealsBoss) != msg.sender) { revert OnlyDeDealsBoss(address(dedealsBoss), msg.sender); }
        _;
    }

    constructor(
        address _dedealsBoss,
        address _dedeal,
        address _dedealsSBT,
        address _dedealsAffilates,
        address _dedealsERC6551Registry
    ) ERC721("DeDeals Collection", "DeDEALS") { 
        totalDeals = 0;
        defaultURI = "";
        dedealsBoss = IDeDealsBoss(_dedealsBoss);
        dedeal = IDeDealERC20(_dedeal);
        dedealsSBT = IDeDealsSoulBoundTokenERC721(_dedealsSBT);
        dedealsAffilates = IDeDealsAffilatesERC721(_dedealsAffilates);
        dedealsERC6551Registry = IDeDealsERC6551Registry(_dedealsERC6551Registry);

        createFeePercent = 500; // 0.5%
        mintFeePercent = 500;   // 0.5%
        splitFeePercent = 500;  // 0.5%
        payFeePercent = 500;    // 0.5% 
        transferFeePercent = 100; // 0.1%
        defaultRoyaltyFeePercent = 5000;  // 5%

        platformFeeShare = 500;
        legalFeeShare = 500;
        affilateFeeShare = 500;
        // 500 + 500 + 500 = 1500
        totalFeeShare = platformFeeShare + legalFeeShare + affilateFeeShare;
    }

    /// DeDeals BOSS FUNCTIONS:

    /// @dev can be set only by DEGEN_BOSS
    function setDefaultURI(string memory _defaultURI) public onlyDeDealsBoss() {
        defaultURI = _defaultURI;
    }

    /// @notice modify token as payment
    /// @param token address of payment token
    /// @param _isPaymentToken if true, than make eligible. if false, than not eligible
    function setPaymentToken(address token, bool _isPaymentToken) public onlyDeDealsBoss() {
        isPaymentToken[token] = _isPaymentToken;
    }

    function setCreateFeePercent(uint256 newCreateFeePercent) public onlyDeDealsBoss() {
        createFeePercent = newCreateFeePercent;
    }

    function setMintFeePercent(uint256 newMintFeePercent) public onlyDeDealsBoss() {
        mintFeePercent = newMintFeePercent;
    }

    function setSplitFeePercent(uint256 newSplitFeePercent) public onlyDeDealsBoss() {
        splitFeePercent = newSplitFeePercent;
    }

    function setPayFeePercent(uint256 newPayFeePercent) public onlyDeDealsBoss() {
        payFeePercent = newPayFeePercent;
    }

    function setTransferFeePercent(uint256 newTransferFeePercent) public onlyDeDealsBoss() {
        transferFeePercent = newTransferFeePercent;
    }

    function setDefaultRoyaltyFeePercent(uint256 newDefaultRoyaltyFeePercent) public onlyDeDealsBoss() {
        defaultRoyaltyFeePercent = newDefaultRoyaltyFeePercent;
    }

    /// @notice adjusting the shares
    function setFeeShares(uint256 _platformFeeShare, uint256 _legalFeeShare, uint256 _affilateFeeShare) public onlyDeDealsBoss() {
        uint256 _totalFeeShare = _platformFeeShare + _legalFeeShare + _affilateFeeShare;
        totalFeeShare = _totalFeeShare;
        platformFeeShare = _platformFeeShare;
        legalFeeShare = _legalFeeShare;
        affilateFeeShare = _affilateFeeShare;
    }

    /// 

    /// @notice obligee creates the deal and the obligor should to accept it
    function create(
        string memory offerHash,
        address paymentToken,
        uint256 paymentAmount,
        uint256 period,
        address obligor,
        address erc6551Account
    ) public override returns (uint256 dealId, address dealAccount) {
        address obligee = msg.sender;
        if (!dedealsSBT.isSoul(obligee)) { revert OnlyObligeeWithSoul(); }
        if (!dedealsSBT.isSoul(obligor) || obligor != address(0)) { revert OnlyObligorWithSoul(); }
        if (!isPaymentToken[paymentToken]) revert NotPaymentToken(paymentToken);
        _chargeAndDistributeCreateFee(IERC20(paymentToken), paymentAmount);
        dealId = totalDeals;
        ++totalDeals;

        dealIssuer[dealId] = obligee;
        dealAccount = dedealsERC6551Registry.createDealAccount(dealId, erc6551Account);
        deals[dealId] = DealData({
            issuer: obligee,
            obligor: obligor,
            recipient: obligor,
            obligee: obligee,
            beneficiary: obligee,
            arbitrator: address(0),
            dealAccount: dealAccount,
            offerHash: offerHash,
            paymentToken: IERC20(paymentToken),
            paymentAmount: paymentAmount,
            period: period,
            deadline: 0,
            status: DealStatus.CREATED
        });
        parentDealId[dealId] = dealId;
    }
 
    /// @dev internal function for calc create fee amount, transfer from the mint amount and distribute fee
    function _chargeAndDistributeCreateFee(IERC20 paymentToken, uint256 paymentAmount) public {
        uint256 createFee = calcCreateFee(paymentAmount);
        if (createFee > 0) {
            paymentToken.safeTransferFrom(msg.sender, address(this), createFee);
            _distributeFee(paymentToken, createFee, address(0));
        }
    }

    /// @notice obligor confirm the created deal by obligee
    /// @param dealId id of the deal
    function mint(uint256 dealId) public {
        DealData storage dealData = deals[dealId];
        if (dealData.status != DealStatus.CREATED) { revert OnlyCreatedStatus(dealId); }
        if (dealData.obligor == address(0)) {
            dealData.obligor = msg.sender;    
        } 
        else if (dealData.obligor == msg.sender) {
            
        }
        else {
            revert NotObligorOfDeal(dealId, dealData.obligor, msg.sender);
        }
        _mint(dealData.obligor, dealId);
        dealData.deadline = block.timestamp + dealData.period;
        dealData.status = DealStatus.MINTED;
        emit Mint(dealId, dealData.obligor, dealData.obligee, dealData.dealAccount, dealData.offerHash, address(dealData.paymentToken), dealData.paymentAmount, dealData.period);
    }


    /// @notice obligor mints the deal and deploy associated ERC6551 account
    /// @dev can be called only by members
    /// @param offerHash the hash of the document
    /// @param paymentToken address of payment token
    /// @param paymentAmount amount of payment token. if amount=1 USDT and decimals=6, than paymentAmount=1000000
    /// @param period amount of second for delay period
    /// @param obligee - address of obligee. if address(0), public offer. else direct offer
    /// @param erc6551Account the implementation of ERC6551 account. erc6551Account=address(0), than will be default ERC6551 account associated with this deal
    function mint(
        string memory offerHash,
        address paymentToken,
        uint256 paymentAmount,
        uint256 period,
        address obligee,
        address erc6551Account
    ) public override returns (uint256 dealId, address dealAccount) {
        address obligor = msg.sender;
        if (!dedealsSBT.isSoul(obligor)) { revert OnlyObligorWithSoul(); }
        if (!dedealsSBT.isSoul(obligee) || obligee != address(0)) { revert OnlyObligeeWithSoul(); }
        if (!isPaymentToken[paymentToken]) revert NotPaymentToken(paymentToken);
        _chargeAndDistributeMintFee(IERC20(paymentToken), paymentAmount);
        dealId = totalDeals;
        ++totalDeals;

        dealAccount = dedealsERC6551Registry.createDealAccount(dealId, erc6551Account);
        _mint(obligor, dealId);
        dealIssuer[dealId] = obligor;
        deals[dealId] = DealData({
            issuer: obligor,
            obligor: obligor,
            recipient: ownerOf(dealId),
            obligee: obligee,
            beneficiary: obligee,
            arbitrator: address(0),
            dealAccount: dealAccount,
            offerHash: offerHash,
            paymentToken: IERC20(paymentToken),
            paymentAmount: paymentAmount,
            period: period,
            deadline: obligee != address(0) ? block.timestamp + period: 0,
            status: DealStatus.MINTED
        });
        parentDealId[dealId] = dealId;
        emit Mint(dealId, obligor, obligee, dealAccount, offerHash, address(paymentToken), paymentAmount, period);
    }

    /// @dev internal function for calc mint amount, transfer from the mint amount and distribute fee
    function _chargeAndDistributeMintFee(IERC20 paymentToken, uint256 paymentAmount) public {
        uint256 mintFee = calcMintFee(paymentAmount);
        if (mintFee > 0) {
            paymentToken.safeTransferFrom(msg.sender, address(this), mintFee);
            _distributeFee(paymentToken, mintFee, address(0));
        }
    }

    /// @dev burn the dealId and mints new dealId`s
    /// @param dealId id of the deal
    /// @param paymentAmounts the array of split amounts for each deal
    function split(uint256 dealId, uint256[] memory paymentAmounts, int256[] memory periodShifts) public override returns (uint256 splitDealIdFrom, uint256 splitDealIdTo) {
        DealData storage dealData = deals[dealId];
        if (dealData.status != DealStatus.MINTED) { revert OnlyMintedStatus(dealId); }
        if (dealData.obligor != msg.sender) { revert NotObligorOfDeal(dealId, dealData.obligor, msg.sender); }
        uint256 len = paymentAmounts.length;
        require(len > 0, "len == 0");
        require(paymentAmounts.length == periodShifts.length, "DegenDealsERC721: not equal");
        uint256 sumPaymentAmounts = 0;
        for (uint256 i = 0; i < len;) {
            if (int256(dealData.period) + periodShifts[i] <= 0) {
                revert InvalidPeriodShift(i, dealData.period, periodShifts[i]);
            }
            sumPaymentAmounts += paymentAmounts[i];
            unchecked { ++i; }
        }
        require(dealData.paymentAmount == sumPaymentAmounts, "DegenDealsERC721: invalid principalAmount for splitting");
        address obligor = msg.sender;
        address dealAccount;
        splitDealIdFrom = totalDeals;
        for (uint256 i = 0; i < len; ) {
            uint256 splitDealId = totalDeals;
            ++totalDeals;
            dealAccount = dedealsERC6551Registry.deriveCreateDealAccount(dealId, splitDealId);
            _mint(obligor, splitDealId);
            deals[splitDealId] = DealData({
                issuer: dealData.issuer,
                obligor: obligor,
                recipient: ownerOf(splitDealId),
                obligee: dealData.obligee,
                beneficiary: dealData.beneficiary,
                arbitrator: dealData.arbitrator,
                dealAccount: dealData.dealAccount,
                offerHash: dealData.offerHash,
                paymentToken: IERC20(dealData.paymentToken),
                paymentAmount: paymentAmounts[i],
                period: uint256(int256(dealData.period) + periodShifts[i]),
                deadline: dealData.deadline,
                status: DealStatus.MINTED
            });
            parentDealId[splitDealId] = dealId;
            emit Split(dealId);
            unchecked {++i;}
        }
        _burn(dealId);
        splitDealIdTo = totalDeals - 1;
    }
    
    /// @notice discounts the deal with `discountPercent`
    /// @param dealId id of the deal
    /// @param dealDiscountPercent_ the percent of discount. Value is from 1 to PERCENT_DENOMINATOR - 1;
    function discount(uint256 dealId, uint256 dealDiscountPercent_) public override {
        if (0 == dealDiscountPercent_ || dealDiscountPercent_ >= PERCENT_DENOMINATOR) { revert InvalidPercent(dealId, dealDiscountPercent_); }
        DealData storage dealData = deals[dealId];
        if (dealData.status != DealStatus.MINTED) {revert OnlyMintedStatus(dealId);}
        if (dealData.recipient != msg.sender) { revert OnlyRecipient(dealId, dealData.recipient, msg.sender); }
        dealDiscountPercent[dealId] = dealDiscountPercent_;

        emit Discount(dealId, dealDiscountPercent_);
    }

    /// @notice bargain the deal with discount. The right of receiving payment goes to `msg.sender`
    /// @param dealId id of the deal
    /// @param data extra data that forwards to associated smart-contract account
    function bargain(uint256 dealId, bytes memory data) public override {
        DealData storage dealData = deals[dealId];
        if (dealDiscountPercent[dealId] == 0) { revert NoDiscount(); }
        IERC20 token = dealData.paymentToken;
        (uint256 totalAmount, uint256 amountWithDiscount, uint256 fundFee) = calcBargainAmount(dealId);
        token.safeTransferFrom(msg.sender, address(this), totalAmount);

        _distributeFee(token, fundFee, dealData.obligor);
        
        IDeDealsERC6551Account dealAccount = IDeDealsERC6551Account(payable(dealData.dealAccount));
        token.forceApprove(address(dealAccount), amountWithDiscount);
        try dealAccount.bargain(data) {
            _transfer(ownerOf(dealId), msg.sender, dealId);
            dealData.recipient = ownerOf(dealId); // new owner
            delete dealDiscountPercent[dealId];
            emit Bargain(dealId, msg.sender);
        } catch {
            revert DealAccountFundFailed();
        }
    }

    /// @notice the modification of transferFrom 
    /// @param from address of sender of NFT
    /// @param to address of receiver of NFT
    /// @param dealId id of the deal
    function transferFrom(address from, address to, uint256 dealId) public override(ERC721, IERC721) {
        DealData storage dealData = deals[dealId];
        if (dealData.status == DealStatus.DEAL || dealData.status == DealStatus.RESOLVED) {
            ERC721.transferFrom(from, to, dealId);
        } 
        else if (dealData.status == DealStatus.ARBITRAGE_BY_OBLIGOR || dealData.status == DealStatus.ARBITRAGE_BY_BENEFICIARY) {
            revert DealUnderArbitrage(dealId);
        }
        else if (dealData.status == DealStatus.PAID) {
            revert BeneficiaryMustDealOrArbitrage(dealId);
        }
        else {
            uint256 transferFee = dealData.paymentAmount * transferFeePercent / PERCENT_DENOMINATOR;
            dealData.paymentToken.safeTransferFrom(from, address(this), transferFee);
            _distributeFee(dealData.paymentToken, transferFee, from);
            ERC721.transferFrom(from, to, dealId);
            dealData.recipient = ownerOf(dealId);
        }
    }

    /// @notice transfer the obligor obligation to `newObligor`
    /// @dev the transferability of obligor works in 2 steps:
    ///      1) newObligor calls `transferObligor` as appovance, that newObligor accept the deal obligation of obligor
    ///      2) obligor calls `transferObligor` to confirm that he send the right to 
    /// @param dealId id of the deal
    /// @param data extra data that forwards to associated smart-contract account
    function tranferObligor(uint256 dealId, address newObligor, bytes memory data) public {
        DealData storage dealData = deals[dealId];
        address obligor = dealData.obligor;
        if (newObligor == msg.sender) {
            obligorTransfer[dealId][obligor][newObligor] = true;
        }
        else if (obligor == msg.sender) {
            if (obligorTransfer[dealId][obligor][newObligor]) {
                IDeDealsERC6551Account dealAccount = IDeDealsERC6551Account(payable(dealData.dealAccount));
                try dealAccount.transferObligor(data) {
                    dealData.obligor = newObligor;
                    delete obligorTransfer[dealId][obligor][newObligor];
                    emit TransferObligor(dealId, obligor, newObligor);
                } catch {
                    revert DealAccountTransferObligorFailed(dealId, address(dealData.dealAccount));
                }
            } else {
                revert FailTransferObligor(dealId, obligor, newObligor, msg.sender);
            }
        }
        else {
            revert NotTransferSubject(dealId, obligor, newObligor, msg.sender);
        }
    }

    /// @notice transfer the obligee obligation to `newObligee`
    /// @dev the transferability of obligee works in 2 steps:
    ///      1) newObligee calls `transferObligor` as appovance, that newObligor accept the deal obligation of obligor
    ///      2) obligor calls `transferObligor` to confirm that he send the right to 
    /// @param dealId id of the deal
    /// @param data extra data that forwards to associated smart-contract account
    function tranferObligee(uint256 dealId, address newObligee, bytes memory data) public {
        DealData storage dealData = deals[dealId];
        address obligee = dealData.obligee;
        if (newObligee == msg.sender) {
            obligeeTransfer[dealId][obligee][newObligee] = true;
        }
        else if (obligee == msg.sender) {
            if (obligeeTransfer[dealId][obligee][newObligee]) {
                IDeDealsERC6551Account dealAccount = IDeDealsERC6551Account(payable(dealData.dealAccount));
                try dealAccount.transferObligor(data) {
                    dealData.obligee = newObligee;
                    delete obligeeTransfer[dealId][obligee][newObligee];
                    emit TransferObligee(dealId, obligee, newObligee);
                } catch {
                    revert DealAccountTransferObligorFailed(dealId, address(dealData.dealAccount));
                }
               
            } else {
                revert FailTransferObligee(dealId, obligee, newObligee, msg.sender);
            }
        }
        else {
            revert NotTransferSubject(dealId, obligee, newObligee, msg.sender);
        }
    }

    /// @notice oblegee pay the offer
    /// @param dealId id of the deal
    /// @param beneficiary the receiver of right for receiving the offer. If beneficiary == address(0), than beneficiary becomes payer
    /// @param data extra data that forwards to associated smart-contract account
    function pay(uint256 dealId, address beneficiary, bytes memory data) public {
        DealData storage dealData = deals[dealId];
        if (dealData.status != DealStatus.MINTED) { revert OnlyMintedStatus(dealId); }
        if (beneficiary == address(0)) { beneficiary = msg.sender; }
        
        IERC20 paymentToken = dealData.paymentToken;
        address obligee;
        if (dealData.obligee == address(0)) { // public offer of deal
            obligee = msg.sender;
            dealData.obligee = obligee;
            dealData.deadline = block.timestamp + dealData.period;
        }
        else if (dealData.obligee == msg.sender) { // defined obligee of deal
            obligee = dealData.obligee;
        }
        else {
            revert NotObligeeOfDeal(dealId, obligee, msg.sender);
        }
        (uint256 totalAmount, uint256 payAmount, uint256 payFee) = calcPayAmount(dealId);
        paymentToken.safeTransferFrom(msg.sender, address(this), totalAmount);
        _distributeFee(paymentToken, payFee, obligee);

        IDeDealsERC6551Account dealAccount = IDeDealsERC6551Account(payable(dealData.dealAccount));
        paymentToken.forceApprove(address(dealAccount), payAmount);
        try dealAccount.pay(data) {
            dealData.status = DealStatus.PAID;
            _transfer(ownerOf(dealId), beneficiary, dealId);
        } catch {
            revert DealAccountPaymentFailed(); 
        }
        emit Pay(dealId, obligee, address(paymentToken), payAmount, beneficiary);
    }

    /// @notice the obligor or obligee is satisfied and confirm obligation
    /// @param dealId id of the deal
    /// @param data extra data that forwards to associated smart-contract account
    function deal(uint256 dealId, bytes memory data) public {
        DealData storage dealData = deals[dealId];
        if (dealData.status == DealStatus.ARBITRAGE_BY_OBLIGOR || dealData.status == DealStatus.ARBITRAGE_BY_BENEFICIARY) {revert DealUnderArbitrage(dealId);}
        IDeDealsERC6551Account dealAccount = IDeDealsERC6551Account(payable(dealData.dealAccount));
        if (msg.sender != dealData.obligor || msg.sender != ownerOf(dealId)) { revert NotDealSubject(dealId, msg.sender); }
        try dealAccount.deal(data) returns (bool obligorDeal, bool beneficiaryDeal) {
            if (obligorDeal) {
                dealData.status = DealStatus.OBLIGOR_SIGNED;
            }
            if (beneficiaryDeal) {
                dealData.status = DealStatus.BENEFICIARY_SIGNED;
            }
            if (obligorDeal && beneficiaryDeal) {
                dealData.status = DealStatus.DEAL;
                emit Deal(dealId);
            }
        } catch {
            revert DealAccountDealFailed();
        }
    }

    /// @notice if deal is out of agreement by one of the side of obligor or obligee
    /// @param dealId id of the deal
    function arbitrage(uint256 dealId, bytes memory data) public {
        DealData storage dealData = deals[dealId];
        if (dealData.status != DealStatus.PAID) { revert OnlyPaidStatus(dealId); }
        if (dealData.obligor != msg.sender || ownerOf(dealId) != msg.sender ) {revert NotDealSubject(dealId, msg.sender); }
        IDeDealsERC6551Account dealAccount = IDeDealsERC6551Account(payable(dealData.dealAccount));
        try dealAccount.arbitrage(data) {
            if (dealData.obligor == msg.sender) {
                dealData.status = DealStatus.ARBITRAGE_BY_OBLIGOR;
            } else if (ownerOf(dealId) == msg.sender) {
                dealData.status = DealStatus.ARBITRAGE_BY_BENEFICIARY;
            }
        } catch {
            revert DealAccountArbitrageFailed();
        }
        emit Arbitrage(dealId, msg.sender);
    }

    /// @notice resolve the arbitrage by arbitrator
    /// @param dealId id of the deal
    function resolve(uint256 dealId, bytes memory data) public {
        DealData storage dealData = deals[dealId];
        if (dealData.status != DealStatus.ARBITRAGE_BY_OBLIGOR || dealData.status != DealStatus.ARBITRAGE_BY_BENEFICIARY) { revert OnlyArbitrageStatus(dealId); }

        IDeDealsERC6551Account dealAccount = IDeDealsERC6551Account(payable(dealData.dealAccount));
        try dealAccount.resolve(data) {
            dealData.arbitrator = msg.sender;
            dealData.status = DealStatus.RESOLVED;
        } catch {
            revert DealAccountResolveFailed();
        }

        emit Resolve(dealId);
    }

    function _distributeFee(IERC20 paymentToken, uint256 fee, address affilate) internal {   
        uint256 legalFee = fee * legalFeeShare / totalFeeShare;
        uint256 platformFee = fee * platformFeeShare / totalFeeShare;
        uint256 affilateFee = fee * affilateFeeShare / totalFeeShare;
        address platformWallet = dedealsBoss.platformWallet();
        address legalWallet = dedealsBoss.legalWallet();
        if (legalFee > 0) {
            paymentToken.safeTransfer(legalWallet, legalFee);
        }
        if (affilate == address(0)) {
            uint256 comboFee = platformFee + affilateFee;
            if (comboFee > 0) {
                paymentToken.safeTransfer(platformWallet, comboFee);
            }
        } else {
            if (platformFee > 0) {
                paymentToken.safeTransfer(platformWallet, platformFee);
            }
            if (affilateFee > 0) {
                paymentToken.forceApprove(address(dedealsAffilates), affilateFee);
                dedealsAffilates.distributeAffilatesFees(paymentToken, affilate, affilateFee);
            }
        }
    }

    /// @notice obligor and obligee can set the dealURI
    /// @param dealId id of the deal
    /// @param dealURI_ the URI of deal
    function setDealURI(uint256 dealId, string memory dealURI_) public {
        DealData storage dealData = deals[dealId];
        if (dealData.status != DealStatus.DEAL || dealData.status != DealStatus.RESOLVED) { revert OnlyDealOrResolved(dealId); }
        if (dealData.obligor == msg.sender) {
            dealURI[dealId][dealData.obligor] = dealURI_;
        } else if (dealData.obligee == msg.sender) {
            dealURI[dealId][dealData.obligee] = dealURI_;
        } else {
            revert NotDealSubject(dealId, msg.sender); 
        }
    }

    function setRoyaltyFeePercent(uint256 dealId, uint256 royaltyFeePercent_) public {
        DealData storage dealData = deals[dealId];
        if (dealData.obligor == msg.sender) {
            royaltyFeePercent[dealId][dealData.obligor] = royaltyFeePercent_;
        } else if (dealData.obligee == msg.sender) {
            royaltyFeePercent[dealId][dealData.obligee] = royaltyFeePercent_;
        } else {
            revert NotDealSubject(dealId, msg.sender);
        }
    }

    function calcCreateFee(uint256 paymentAmount) public view returns (uint256) {
        return paymentAmount * createFeePercent / PERCENT_DENOMINATOR;
    }

    /// @param paymentAmount of payment token
    function calcMintFee(uint256 paymentAmount) public view returns (uint256) {
        return paymentAmount * mintFeePercent / PERCENT_DENOMINATOR;
    }

    /// @param dealId id of the deal
    function calcSplitFee(uint256 dealId) public view returns (uint256 totalAmount, uint256 paymentAmount, uint256 splitFee) {
        paymentAmount = deals[dealId].paymentAmount;
        splitFee = paymentAmount * splitFeePercent / PERCENT_DENOMINATOR;
        totalAmount = paymentAmount + splitFee;
    }

    /// @param dealId id of the deal
    function calcBargainAmount(uint256 dealId) public view returns (uint256 totalAmount, uint256 amountWithDiscount, uint256 fundFee) {
        amountWithDiscount = deals[dealId].paymentAmount * dealDiscountPercent[dealId] / PERCENT_DENOMINATOR;
        fundFee = amountWithDiscount * fundFeePercent / PERCENT_DENOMINATOR;
        totalAmount = amountWithDiscount + fundFee;
    }

    /// @param dealId id of the deal
    function calcPayAmount(uint256 dealId) public view returns (uint256 totalAmount, uint256 payAmount, uint256 payFee) {
        DealData memory dealData = deals[dealId];
        payAmount = dealData.paymentAmount;
        payFee = payAmount * payFeePercent / PERCENT_DENOMINATOR;
        totalAmount = payAmount + payFee;
    }

    /// @dev returns the dealData by `dealId`
    function getDeal(uint256 dealId) public view override returns (DealData memory) {
        return deals[dealId];
    }

    /// @notice return the root deal
    /// @dev the linked list traversal. parentDealId represent the link to parent deal id
    /// @param dealId id of the deal
    function getRootDealId(uint256 dealId) public view returns (uint256 rootDealId) {
        rootDealId = dealId;
        for (; parentDealId[dealId] != rootDealId; rootDealId = parentDealId[dealId]) {}
    }

    /// @param dealId id of the deal
    function tokenURI(uint256 dealId) public view override returns (string memory) {
        _requireOwned(dealId);
        DealData storage dealData = deals[dealId];
        if (keccak256(abi.encodePacked(dealURI[dealId][dealData.obligor])) == keccak256(abi.encodePacked(dealURI[dealId][dealData.obligee]))) {
            return dealURI[dealId][dealData.obligor];
        } else {
            return defaultURI;
        }
    }

    /// @notice return deals data in pagination
    /// @param dealIdFrom id of the deal start
    /// @param dealIdTo id of the deal end
    function getDeals(uint256 dealIdFrom, uint256 dealIdTo) public view returns (DealData[] memory dealDatas) {
        require(dealIdFrom <= dealIdTo, "Invalid range");
        if (totalDeals == 0) {
            dealDatas = new DealData[](0);
            return dealDatas;
        }
        uint256 len = dealIdTo - dealIdFrom + 1;
        dealDatas = new DealData[](len);
        if (dealIdTo >= totalDeals) {
            dealIdTo = totalDeals - 1;
        }
        uint256 dealId = dealIdFrom;
        for (;dealId <= dealIdTo; ) {
            dealDatas[dealId - dealIdFrom] = deals[dealId];
            unchecked {++dealId;}
        }
    }

    /// @notice implementation of ERC2981 royalty standart
    /// @param dealId id of the deal
    /// @param salePrice the amount of salePrice
    function royaltyInfo(uint256 dealId, uint256 salePrice) public view returns (address receiver, uint256 royaltyAmount) {
        DealData memory dealData = deals[dealId];
        receiver = dealData.issuer;
        if (royaltyFeePercent[dealId][dealData.obligor] == royaltyFeePercent[dealId][dealData.obligee]) {
            royaltyAmount = salePrice * royaltyFeePercent[dealId][dealData.obligor] / PERCENT_DENOMINATOR;
        } else {
            royaltyAmount = salePrice * defaultRoyaltyFeePercent / PERCENT_DENOMINATOR;
        }
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl, IERC165) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }

}