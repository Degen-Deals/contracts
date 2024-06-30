// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./interfaces/ERC4337/IEntryPoint.sol";
import "./interfaces/ERC4337/PackedUserOperation.sol";
import "./interfaces/IDeDealsERC721.sol";
import "./interfaces/IDeDealsERC6551Account.sol";
import "./interfaces/IDeDealsERC6551Registry.sol";
import "./abstract/ERC4337/ERC4337Account.sol";
import "./abstract/ERC4337/UserOperationLib.sol";
import "./abstract/ERC6551/ERC6551Account.sol";
import "./abstract/ERC6551/ERC6551Executor.sol";

contract DegenDealsERC6551Account is 
    Initializable,
    ERC721Holder,
    ERC1155Holder,
    ERC4337Account,
    ERC6551Account,
    IDeDealsERC6551Account
{
    using UserOperationLib for PackedUserOperation;
    using SafeERC20 for IERC20;

    /// @dev address of ERC6551 registry
    IDeDealsERC6551Registry public erc6551Registry;

    /// @dev address of DegenDeals collection
    IDeDealsERC721 public degenDeals;

    /// @dev which dealId is associated with this account
    uint256 public dealId;

    function initialize(
        address entryPoint_, 
        address erc6551Registry_,
        uint256 dealId_
    ) public virtual initializer() {
        __ERC4337_init(entryPoint_);
        erc6551Registry = IDeDealsERC6551Registry(erc6551Registry_);
        degenDeals = erc6551Registry.degenDeals();
        dealId = dealId_;
    }

    function entryPoint() public view virtual override returns (IEntryPoint) {
        return super.entryPoint();
    }

    function token() public view virtual override (ERC6551Account, IERC6551Account) returns (uint256 chainId, address tokenContract, uint256 tokenId) {
        chainId = block.chainid;
        tokenContract = address(degenDeals);
        tokenId = dealId;
    }

    function state() public view virtual override (ERC6551Account, IERC6551Account) returns (uint256) {
        return ERC6551Account.state();
    }

    function isValidSigner(address signer, bytes calldata data) public view virtual override (ERC6551Account, IERC6551Account) returns (bytes4 magicValue){
        if (_isValidSigner(signer, data)) {
            return IERC6551Account.isValidSigner.selector;
        }
        return bytes4(0);
    }

    function _isValidSigner(address signer, bytes memory context) internal view virtual override (ERC6551Account) returns (bool) {
        signer; context;
        return true;
    }

    function isValidSignature(bytes32 hash, bytes calldata signature) public view virtual override (ERC6551Account) returns (bytes4 magicValue) {
        if (_isValidSignature(hash, signature)) {
            return IERC1271.isValidSignature.selector;
        }
        return bytes4(0);
    }

    function _isValidSignature(bytes32 hash, bytes calldata signature) internal view virtual override (ERC4337Account, Signatory) returns (bool) {
        hash; signature;
        // ecrecover(hash, v, r, s)
        address signer = address(0); //
        address owner = degenDeals.ownerOf(dealId);
        if (signer == owner) {
            return true;
        }
        return true;
    }

    function isValidExecutor(address executor) public view virtual override (ERC6551Executor) returns (bytes4 magicValue) {
        if (_isValidExecutor(executor)) {
            return ERC6551Executor.isValidExecutor.selector;
        }
        return bytes4(0);
    }

    function _isValidExecutor(address executor) internal view virtual override returns (bool) {
        if (degenDeals.ownerOf(dealId) == executor) {
            return true;
        }
        if (address(entryPoint()) == executor) {
            return true;
        }
        
        return false;
    }

    function _beforeExecute() internal virtual override {}

    function execute(address to, uint256 value, bytes calldata data, uint8 operation) external payable virtual override (ERC6551Executor) returns (bytes memory result) {
        if (!_isValidExecutor(_msgSender())) revert NotAuthorized();
        _beforeExecute();
        result = LibExecutor._execute(to, value, data, operation);
        _afterExecute();        
    }

    function _afterExecute() internal virtual override {}

    function _validateSignature(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash
    ) internal virtual override returns (uint256 validationData) {
        userOp; userOpHash;
        return 0;
    }
    
    function transferObligor(bytes memory data) external virtual override {
        data;
        if (msg.sender != address(degenDeals)) revert NotGegenDeals(address(degenDeals), msg.sender);
    }

    function transferObligee(bytes memory data) external virtual override {
        data;
        if (msg.sender != address(degenDeals)) revert NotGegenDeals(address(degenDeals), msg.sender);
    }

    function fund(bytes memory data) public virtual override {
        data;
        if (msg.sender != address(degenDeals)) revert NotGegenDeals(address(degenDeals), msg.sender);

        IDeDealsERC721.DealData memory dealData = degenDeals.getDeal(dealId);
        IERC20 paymentToken = dealData.paymentToken;
        (,uint256 fundAmount,) = degenDeals.calcFundAmount(dealId);
        paymentToken.safeTransferFrom(msg.sender, address(this), fundAmount);
        
        address obligor = dealData.obligor;
        paymentToken.safeTransfer(obligor, fundAmount);
    }

    /// @notice called by degen deals for storing the payment
    function pay(bytes memory data) public virtual override {
        data;
        if (msg.sender != address(degenDeals)) revert NotGegenDeals(address(degenDeals), msg.sender);
        IDeDealsERC721.DealData memory dealData = degenDeals.getDeal(dealId);
        IERC20 paymentToken = dealData.paymentToken;
        uint256 paymentAmount = dealData.paymentAmount;
        paymentToken.safeTransferFrom(dealData.obligee, address(this), paymentAmount);

        /// any code / aml checks / defi integration/ .... / data parsing

        // for example we make instant transfer to owner of NFT
        address ownerOf = degenDeals.ownerOf(dealId);
        paymentToken.safeTransfer(ownerOf, paymentAmount);
    }

    function deal(bytes memory data) public virtual override returns (bool obligorDeal, bool beneficiaryDeal) {
        data;
        if (msg.sender != address(degenDeals)) revert NotGegenDeals(address(degenDeals), msg.sender);
        obligorDeal = true;
        beneficiaryDeal = true;
    }

    function arbitrage(bytes memory data) public virtual override {
        data;
        if (msg.sender != address(degenDeals)) revert NotGegenDeals(address(degenDeals), msg.sender);

    }

    function resolve(bytes memory data) public virtual override {
       data;
       if (msg.sender != address(degenDeals)) revert NotGegenDeals(address(degenDeals), msg.sender);

    }



    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
    ) public virtual override returns (bytes4) {
        operator; from; tokenId; data;
        return this.onERC721Received.selector;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public virtual override returns (bytes4) {
        operator; from; id; value; data;
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public virtual override returns (bytes4) {
        operator; from; ids; values; data;
        return this.onERC1155BatchReceived.selector;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155Holder, ERC6551Account) returns (bool) {
        return ERC1155Holder.supportsInterface(interfaceId) ||
                ERC6551Account.supportsInterface(interfaceId);
    }

    receive() external payable override (ERC6551Account, IERC6551Account) {}

}