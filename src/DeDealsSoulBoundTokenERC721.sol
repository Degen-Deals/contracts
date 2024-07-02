// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./interfaces/IDeDealsBoss.sol";
import "./interfaces/IDeDealsERC721.sol";
import "./interfaces/IDeDealsSoulBoundTokenERC721.sol";

/**
 * @title Degen Deals Soul Bound Token ERC721
 * @notice this is onchain interface for verifying that wallet has KYC/KYB
 * @dev Degen Deals Soul Bound Tokens for DegenDeals
 */
contract DeDealsSoulBoundTokenERC721 is ERC721, EIP712, IDeDealsSoulBoundTokenERC721 {
    using ECDSA for bytes;

    IDeDealsBoss public deDealsBoss;

    IDeDealsERC721 public deDeals;

    /// @dev address of verifying wallet
    address public KYCWallet;

    /// @dev total amount of soul bound tokens
    uint256 public totalSBT;

    /// @dev address of soul => soul bound token id
    mapping(address soul => uint256) public sbtId;

    mapping(uint256 sbtId => SBTData) public sbtDatas;

    constructor (
        address deDealsBoss_,
        address deDeals_,
        address KYCWallet_
    )
        ERC721("DeDeals SoulBoundToken", "DeDEALS-SBT") 
        EIP712("DeDEALS-SBT", "0") 
    {
        deDealsBoss = IDeDealsBoss(deDealsBoss_);
        deDeals = IDeDealsERC721(deDeals_);
        require(KYCWallet_ != address(0), "invalid KYC wallet");
        KYCWallet = KYCWallet_;
        
        totalSBT = 0;
        _mint(KYCWallet, totalSBT);
        ++totalSBT;
    }

    function setKYCWallet(address KYCWallet_) public {
        if (address(deDealsBoss) != msg.sender) { revert OnlyDeDealsBoss(msg.sender); }
        KYCWallet = KYCWallet_;
    }

    /// @notice mints new SBT token
    function mint(address account, bytes memory kycSignature) public {
        if (!verify(account, kycSignature)) {
            revert FailedVerification(account);
        }
        if (balanceOf(account) > 0) {
            revert SoulBoundTokenExist(account, sbtId[account]);
        }
        uint256 sbtId_ = totalSBT;
        _mint(account, sbtId_);
        sbtId[account] = sbtId_;
        ++totalSBT;
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override (ERC721,IERC721) {
        from; to; tokenId;
        revert SoubBoundTokenNotTransferable();
    }

    /// @dev returns true if `account` has SBT, false otherwise
    /// @param sbtId_ id of soul bound token
    function isSoul(uint256 sbtId_) public view returns (bool) {
        return _ownerOf(sbtId_) == address(0) ? false : true;
    }

    /// @dev returns true if `account` has SBT, false otherwise
    /// @param account address of user
    function isSoul(address account) public view returns (bool) {
        return balanceOf(account) > 0;
    }

    /// @notice check that signature is signed by KYCWallet
    function verify(address account, bytes memory signature) public view returns (bool) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256("MintData(address account)"),
                    account
                )
            )
        );
        address recoveredAddress = ECDSA.recover(digest, signature);
        return recoveredAddress == KYCWallet;
    }
    
    function getDigest(address account) public view returns (bytes32) {
        return _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256("MintData(address account)"),
                    account
                )
            )
        );
    }

    /// @notice returns chain id of blockchain
    function chainId() public view returns (uint256) {
        return block.chainid;
    }

    /// @notice return the name of soul bound token collection
    function name() public pure override returns (string memory) {
        return "SoulBoundToken on DeDeals";
    }

    /// @notice return the symbol of soul bound token collection
    function symbol() public pure override returns (string memory) {
        return "SBT-DeDEALS";
    }

}
