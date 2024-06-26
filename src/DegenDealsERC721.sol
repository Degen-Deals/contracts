// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IDegenDealsERC20.sol";
import "./interfaces/IDegenDealsERC721.sol";
import "./interfaces/IDegenDealsERC6551Account.sol";
import "./interfaces/IDegenDealsERC6551Registry.sol";

/**
 * @notice Tokenization of obligation and rights with associated smart-contract accounts
 * @author 1NFT.agency (aleks@1nft.agency)
 * @author Vakhtanh Chikhladze (the.vaho1337@gmail.com)
 * @author Petro Yaremenko ()
 */
contract DegenDealsERC721 is Initializable, AccessControl, ERC721, IDegenDealsERC721 {
    using SafeERC20 for IERC20;

    /// @dev DEGEN_BOSS_ROLE
    bytes32 public constant DEGEN_BOSS_ROLE = keccak256("DEGEN_BOSS_ROLE");
    /// @dev MEMBER is obligor and obligee
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");
    /// @dev ARBITRATOR_ROLE is trusted arbitrors
    bytes32 public constant ARBITRATOR_ROLE = keccak256("ARBITRATOR_ROLE");

    /// @dev 100% == 100_000
    uint256 public constant PERCENT_DENOMINATOR = 100_000;

    /// @dev amount of total minted deals
    uint256 public totalDeals;

    /// @dev link for terms and conditions
    string public defaultURI;

    address public platformWallet;
    address public legalWallet;
    address public kycWallet;

    /// @dev the platform token
    IDegenDealsERC20 public dedeal;

    /// @dev ERC6551 registry
    IDegenDealsERC6551Registry public dedealsERC6551Registry;

    /// @dev list fee percent
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
    uint256 public royaltyPercent;

    /// @dev legal share of fee
    uint256 public legalFeeShare;

    /// @dev platform share of fee
    uint256 public platformFeeShare;

    /// @dev the sum of all fees
    uint256 public totalFeeShare;

    /// @dev amount of dedeal token per successful deal
    uint256 public dedealRate;

    /// @dev address of payment token => is payment token
    mapping (address => bool) public isPaymentToken;

    /// @dev dealId => DealData
    mapping (uint256 => DealData) public deals;

    /// @dev split deal id => deal id
    ///      if parentDealId[dealId] == dealId than it is root deal
    mapping (uint256 => uint256) public parentDealId;

    /// @dev dealId => discount of deal id
    mapping (uint256 => uint256) public dealDiscountPercent;

    /// @dev dealId => link to legal documents
    mapping (uint256 => string) public dealURI;

    /// @dev dealId => current obligor => new obligor => is eligible
    mapping (uint256 => mapping (address => mapping(address => bool))) public obligorTransfer;

    /// @dev dealId => obligee => obligee receiver
    mapping (uint256 => mapping (address => mapping(address => bool))) public obligeeTransfer;

    constructor(
        address _dedeal,
        address _dedealsERC6551Registry,
        address _platformWallet,
        address _legalWallet,
        address _kycWallet
    ) ERC721("Degen Deals Collection", "DeDEALS") { 
        address _admin = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEGEN_BOSS_ROLE, _admin);
        _grantRole(DEGEN_BOSS_ROLE, _platformWallet);
        _grantRole(DEGEN_BOSS_ROLE, _legalWallet);

        totalDeals = 0;
        defaultURI = "";
        dedeal = IDegenDealsERC20(_dedeal);
        dedealsERC6551Registry = IDegenDealsERC6551Registry(_dedealsERC6551Registry);

        platformWallet = _platformWallet;
        legalWallet = _legalWallet;
        kycWallet = _kycWallet;

        mintFeePercent = 500;   // 0.5%
        splitFeePercent = 500;  // 0.5%
        payFeePercent = 500;    // 0.5% 
        transferFeePercent = 100; // 0.1%
        royaltyPercent = 5000;  // 5%

        platformFeeShare = 500;
        legalFeeShare = 500;
        // 500 + 500 = 1000
        totalFeeShare = platformFeeShare + legalFeeShare;
    }

    /// @dev can be set only by DEGEN_BOSS
    function setDefaultURI(string memory _defaultURI) public onlyRole(DEGEN_BOSS_ROLE) {
        defaultURI = _defaultURI;
    }

    /// @notice set platform wallet
    /// @param platformWallet_ address of new platform wallet
    function setPlatformWallet(address platformWallet_) public onlyRole(DEGEN_BOSS_ROLE) {
        /// some code
        platformWallet = platformWallet_;
    }

    /// @notice set legal wallet
    /// @param legalWallet_ address of new legal wallet
    function setLegalWallet(address legalWallet_) public onlyRole(DEGEN_BOSS_ROLE) {
        /// some DAO logic...
        legalWallet = legalWallet_;
    }

    /// @notice set new KYC wallet for verification of KYC/KYB
    /// @param kycWallet_ address of kyc wallet 
    function setKYCWallet(address kycWallet_) public onlyRole(DEGEN_BOSS_ROLE) {
        /// some DAO logic... 
        kycWallet = kycWallet_;
    }

    /// @notice modify token as payment
    /// @param token address of payment token
    /// @param _isPaymentToken if true, than make eligible. if false, than not eligible
    function modifyPaymentToken(address token, bool _isPaymentToken) public onlyRole(DEGEN_BOSS_ROLE) {
        isPaymentToken[token] = _isPaymentToken;
    }

    /// @notice adjusting the shares
    function adjustShares(uint256 _legalFeeShare, uint256 _platformFeeShare) public onlyRole(DEGEN_BOSS_ROLE) {
        uint256 _totalFeeShare = _legalFeeShare + _platformFeeShare;
        totalFeeShare = _totalFeeShare;
        legalFeeShare = _legalFeeShare;
        platformFeeShare = _platformFeeShare;
    }

    /// @notice grant the member
    function grantMember(address member, bytes memory signature) public {
        signature;
        _grantRole(MEMBER_ROLE, member);
    }

    /// @notice become member by 
    function becomeMember(bytes memory signature) public {
        signature;
        _grantRole(MEMBER_ROLE, msg.sender);
    }

    function quitFromMember() public onlyRole(MEMBER_ROLE) {
        _revokeRole(MEMBER_ROLE, msg.sender);
    }

    /// @notice mints the deal and deploy associated ERC6551 account
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
    ) public override onlyRole(MEMBER_ROLE) returns (uint256 dealId, address dealAccount) {
        require(hasRole(MEMBER_ROLE, obligee) || obligee == address(0), "DegenDealsERC721: obligee not member");
        if (!isPaymentToken[paymentToken]) revert NotPaymentToken(paymentToken);
        _chargeAndDistributeMintFee(IERC20(paymentToken), paymentAmount);
        dealId = totalDeals;
        ++totalDeals;

        dealAccount = dedealsERC6551Registry.createDealAccount(dealId, erc6551Account);
        uint256 deadline = obligee != address(0) ? block.timestamp + period: 0;
        address obligor = msg.sender;
        _mint(msg.sender, dealId);
        deals[dealId] = DealData({
            minter: msg.sender,
            obligor: obligor,
            offerHash: offerHash,
            paymentToken: IERC20(paymentToken),
            paymentAmount: paymentAmount,
            period: period,
            dealAccount: dealAccount,
            deadline: deadline,
            obligee: obligee,
            obligorDeal: false,
            obligeeDeal: false,
            arbitrator: address(0),
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
            _distributeFee(paymentToken, mintFee);
        }
    }

    /// @dev burn the dealId and mints new dealId`s
    /// @param dealId id of the deal
    /// @param paymentAmounts the array of split amounts for each deal
    function split(uint256 dealId, uint256[] memory paymentAmounts) public override onlyRole(MEMBER_ROLE) returns (uint256 splitDealIdFrom, uint256 splitDealIdTo) {
        DealData storage dealData = deals[dealId];
        require(dealData.obligor == msg.sender, "DegenDealsERC721: split can only obligor");
        require(dealData.status == DealStatus.MINTED, "DegenDealsERC721: deal status != MINTED");
        uint256 len = paymentAmounts.length;
        require(len > 0, "DegenDealsERC721: len == 0");
        uint256 sumPaymentAmounts = 0;
        for (uint256 i = 0; i < len;) {
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
                minter: dealData.minter,
                obligor: obligor,
                offerHash: dealData.offerHash,
                paymentToken: IERC20(dealData.paymentToken),
                paymentAmount: paymentAmounts[i],
                period: dealData.period,
                dealAccount: dealData.dealAccount,
                deadline: dealData.deadline,
                obligee: dealData.obligee,
                obligorDeal: dealData.obligorDeal,
                obligeeDeal: dealData.obligeeDeal,
                arbitrator: dealData.arbitrator,
                status: DealStatus.MINTED
            });
            parentDealId[splitDealId] = dealId;
            emit Split(dealId);
            unchecked {++i;}
        }
        _burn(dealId);
        splitDealIdTo = totalDeals - 1;
    }
    
    /// @notice designate the deal with discount.
    /// @param dealId id of the deal
    /// @param dealDiscountPercent_ the percent of discount. Value is from 1 to PERCENT_DENOMINATOR - 1;
    function designate(uint256 dealId, uint256 dealDiscountPercent_) public override {
        require(0 < dealDiscountPercent_ && dealDiscountPercent_ < PERCENT_DENOMINATOR, "DegenDealsERC721: discount > 100% or 0%");
        DealData storage dealData = deals[dealId];
        require(ownerOf(dealId) == msg.sender, "DegenDealsERC721: not obligor");
        require(dealData.status == DealStatus.MINTED, "DegenDealsERC721: already paid");
        dealDiscountPercent[dealId] = dealDiscountPercent_;
        emit Designate(dealId, dealDiscountPercent_);
    }

    /// @notice fund the deal with discount. The right of receiving payment goes to `msg.sender`
    /// @param dealId id of the deal
    /// @param data extra data that forwards to associated smart-contract account
    function fund(uint256 dealId, bytes memory data) public override {
        DealData storage dealData = deals[dealId];
        require(dealDiscountPercent[dealId] > 0, "DegenDealsERC721: No discount");
        IERC20 token = dealData.paymentToken; 
        (uint256 totalAmount, uint256 amountWithDiscount, uint256 fundFee) = calcFundAmount(dealId);
        token.safeTransferFrom(msg.sender, address(this), totalAmount);

        _distributeFee(token, fundFee);
        
        IDegenDealsERC6551Account dealAccount = IDegenDealsERC6551Account(payable(dealData.dealAccount));
        token.forceApprove(address(dealAccount), amountWithDiscount);
        try dealAccount.fund(data) {
            delete dealDiscountPercent[dealId];
        } catch {
            revert DealAccountFundFailed();
        }
        _transfer(dealData.obligor, msg.sender, dealId);
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
        else if (dealData.status == DealStatus.ARBITRAGE_BY_OBLIGOR || dealData.status == DealStatus.ARBITRAGE_BY_OBLIGEE) {
            revert DealUnderArbitrage();
        }
        else {
            uint256 transferFee = dealData.paymentAmount * transferFeePercent / PERCENT_DENOMINATOR;
            dealData.paymentToken.safeTransferFrom(from, address(this), transferFee);
            _distributeFee(dealData.paymentToken, transferFee);
            ERC721.transferFrom(from, to, dealId);
        }
    }

    /// @notice transfer the obligor obligation
    /// @param dealId id of the deal
    /// @param data extra data that forwards to associated smart-contract account
    function tranferObligor(uint256 dealId, bytes memory data) public {
        DealData storage dealData = deals[dealId];
        address obligor = dealData.obligor;
        address newObligor = msg.sender;
        if (dealData.obligor == msg.sender) {
            obligorTransfer[dealId][obligor][newObligor] = true;
        }
        else if (obligorTransfer[dealId][obligor][newObligor]) {
            IDegenDealsERC6551Account dealAccount = IDegenDealsERC6551Account(payable(dealData.dealAccount));
            try dealAccount.transferObligor(data) {
                
            } catch {
                revert DealAccountTransferObligorFailed(dealId, address(dealData.dealAccount));
            }
            dealData.obligor = msg.sender;
            delete obligorTransfer[dealId][obligor][newObligor];
        }
        else {
            revert NotObligorOfDeal(dealId);
        }
    }

    /// @notice transfer the obligee obligation of deal
    /// @param dealId id of the deal
    /// @param data extra data that forwards to associated smart-contract account
    function tranferObligee(uint256 dealId, bytes memory data) public {
        DealData storage dealData = deals[dealId];
        address obligee = dealData.obligee;
        address newObligee = msg.sender;
        if (dealData.obligee == msg.sender) {
            obligeeTransfer[dealId][obligee][newObligee] = true;
        }
        else if (obligeeTransfer[dealId][obligee][newObligee]) {
            IDegenDealsERC6551Account dealAccount = IDegenDealsERC6551Account(payable(dealData.dealAccount));
            try dealAccount.transferObligee(data) {

            } catch {
                revert DealAccountTransferObligeeFailed(dealId, address(dealData.dealAccount));
            }
            dealData.obligee = msg.sender;
            delete obligeeTransfer[dealId][obligee][newObligee];
        }
        else {
            revert NotObligeeOfDeal(dealId);
        }
    }

    /// @notice oblegee pay the offer
    /// @param dealId id of the deal
    /// @param data extra data that forwards to associated smart-contract account
    function pay(uint256 dealId, bytes memory data) public onlyRole(MEMBER_ROLE) {
        DealData storage dealData = deals[dealId];
        require(dealData.status == DealStatus.MINTED, "DegenDealsERC721: only MINTED ");
        IERC20 paymentToken = dealData.paymentToken;
        (uint256 totalAmount, uint256 payAmount, uint256 payFee) = calcPayAmount(dealId);
        paymentToken.safeTransferFrom(msg.sender, address(this), totalAmount);
        
        _distributeFee(paymentToken, payFee);
        
        address obligee;
        if (dealData.obligee == address(0)) { // public offer debt n0te
            obligee = msg.sender;
            dealData.obligee = obligee;
            dealData.deadline = block.timestamp + dealData.period;
        }
        else if (dealData.obligee == msg.sender) { // defined obligee offer debt n0te
            obligee = dealData.obligee;
        }
        else {
            revert NotDealSubjectOnPay(dealId, msg.sender);
        }
        IDegenDealsERC6551Account dealAccount = IDegenDealsERC6551Account(payable(dealData.dealAccount));
        paymentToken.forceApprove(address(dealAccount), payAmount);
        try dealAccount.pay(data) {
            dealData.status = DealStatus.PAID;
        }
        catch {
            revert DealAccountPaymentFailed(); 
        }
        _transfer(dealData.obligor, obligee, dealId);

        emit Pay(dealId, obligee, address(paymentToken), payAmount);
    }

    /// @notice the obligor or obligee is satisfied and confirm obligation
    /// @param dealId id of the deal
    /// @param data extra data that forwards to associated smart-contract account
    function deal(uint256 dealId, bytes memory data) public onlyRole(MEMBER_ROLE) {
        DealData storage dealData = deals[dealId];
        
        require(dealData.status != DealStatus.ARBITRAGE_BY_OBLIGOR || dealData.status != DealStatus.ARBITRAGE_BY_OBLIGEE, "DegenDealsERC721: cant deal, when arbitrage is open");
        IDegenDealsERC6551Account dealAccount = IDegenDealsERC6551Account(payable(dealData.dealAccount));
        try dealAccount.deal(data) {
            if (msg.sender == dealData.obligor) {
                dealData.obligorDeal = true;
                dealData.status = DealStatus.OBLIGOR_SIGNED;
            }
            else if (msg.sender == dealData.obligee) {
                dealData.obligeeDeal = true;
                dealData.status = DealStatus.OBLIGEE_SIGNED;
            }
            else {
                revert NotDealSubjectOnDeal(dealId, msg.sender);
            }

            if (dealData.obligorDeal && dealData.obligeeDeal) {
                dealData.status = DealStatus.DEAL;
                emit Deal(dealId);
            }
        } catch {
            revert DealAccountDealFailed();
        }
    }

    /// @notice if deal is out of agreement by one of the side of obligor or obligee
    /// @param dealId id of the deal
    function arbitrage(uint256 dealId) public onlyRole(MEMBER_ROLE) {
        DealData storage dealData = deals[dealId];
        require(msg.sender == dealData.obligor || msg.sender == dealData.obligee, "DegenDealsERC721: not eligible");

        if (msg.sender == dealData.obligor) {
            dealData.status = DealStatus.ARBITRAGE_BY_OBLIGOR;
        } else if (msg.sender == dealData.obligee) {
            dealData.status = DealStatus.ARBITRAGE_BY_OBLIGEE;
        }
        emit Arbitrage(dealId, msg.sender);
    }

    /// @notice resolve the arbitrage by arbitrator
    /// @param dealId id of the deal
    function resolve(uint256 dealId, uint8 decision) public onlyRole(ARBITRATOR_ROLE) {
        DealData storage dealData = deals[dealId];

        require(dealData.status == DealStatus.ARBITRAGE_BY_OBLIGOR || dealData.status == DealStatus.ARBITRAGE_BY_OBLIGEE, "DegenDealsERC721: should be arbitrage status");

        if (decision == 1) {
            // Resolve in favor of obligor
        } else if (decision == 2) {
            // Resolve in favor of obligee
        }

        dealData.arbitrator = msg.sender;
        dealData.status = DealStatus.RESOLVED;
    
        emit Resolve(dealId);
    }

    function _distributeFee(IERC20 token, uint256 fee) internal {
        uint256 legalFee = fee * legalFeeShare / totalFeeShare;
        uint256 platformFee = fee * platformFeeShare / totalFeeShare;
        if (legalFee > 0) {
            token.safeTransfer(legalWallet, legalFee);
        }
        if (platformFee > 0) {
            token.safeTransfer(platformWallet, platformFee);
        }
    }

    /// @param dealId id of the deal
    /// @param dealURI_ the URI of deal
    function setDealURI(uint256 dealId, string memory dealURI_) public {
        DealData storage dealData = deals[dealId];
        require(dealData.status == DealStatus.DEAL || dealData.status == DealStatus.RESOLVED, "DegenDealsERC721: only DEAL or RESOLVED");
        dealURI[dealId] = dealURI_;
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
    function calcFundAmount(uint256 dealId) public view returns (uint256 totalAmount, uint256 amountWithDiscount, uint256 fundFee) {
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
        string memory uri = dealURI[dealId];
        if (bytes(uri).length == 0){
            return defaultURI;
        } else {
            return uri;
        }
    }

    /// @notice returns true is wallet is member
    /// @param wallet address of wallet
    function isMember(address wallet) public view returns (bool) {
        return hasRole(MEMBER_ROLE, wallet);
    }

    /// @notice return deals data in pagination
    /// @param dealIdFrom id of the deal start
    /// @param dealIdTo id of the deal end
    function getDeals(uint256 dealIdFrom, uint256 dealIdTo) public view returns (DealData[] memory dealDatas) {
        require(dealIdFrom <= dealIdTo, "Invalid range");
        if (totalDeals == 0) {
            dealDatas = new DealData[](0);
        } else {
            uint256 len = dealIdTo - dealIdFrom + 1;
            dealDatas = new DealData[](len);
        }
        if (dealIdTo >= totalDeals) {
            dealIdTo = totalDeals - 1;
        }
        for (uint256 i = dealIdFrom; i <= dealIdTo; ++i) {
            dealDatas[i - dealIdFrom] = deals[i];
        }
    }

    /// @notice implementation of ERC2981 royalty standart
    /// @param dealId id of the deal
    /// @param salePrice the amount of salePrice
    function royaltyInfo(uint256 dealId, uint256 salePrice) public view returns (address receiver, uint256 royaltyAmount) {
        dealId;
        receiver = platformWallet;
        royaltyAmount = salePrice * royaltyPercent / PERCENT_DENOMINATOR;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl, IERC165) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }

}