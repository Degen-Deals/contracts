// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./interfaces/ERC4337/IEntryPoint.sol";
import "./interfaces/IDeDealsBoss.sol";
import "./interfaces/IDeDealsERC721.sol";
import "./interfaces/IDeDealsERC6551Account.sol";
import "./interfaces/IDeDealsERC6551Registry.sol";

contract DegenDealsERC6551Registry is Initializable, IDeDealsERC6551Registry {

    /// @dev address of DeDeals Boss
    IDeDealsBoss public deDealsBoss;

    /// @dev address to degen deals NFT collection
    IDeDealsERC721 public deDeals;

    /// @dev default account for NFT
    IDeDealsERC6551Account public degenDealsERC6551Account;

    IEntryPoint public entryPoint;

    address public owner;

    /// @dev deal id => address of deployed account
    mapping(uint256 dealId => address) public dealAccounts;

    /// @dev deal id => 
    mapping(uint256 dealId => address) public dealAccountImplementations;

    function initialize(
        address deDeals_, 
        address degenDealsERC6551Account_,
        address entryPoint_
    ) public initializer() {
        owner = msg.sender;
        deDeals = IDeDealsERC721(deDeals_);
        degenDealsERC6551Account = IDeDealsERC6551Account(payable(degenDealsERC6551Account_));
        entryPoint = IEntryPoint(entryPoint_);
    }

    function setEntryPoint(address entryPoint_) public {
        require(msg.sender == owner, "DegenDealsERC6551Registry: not owner");
        entryPoint = IEntryPoint(entryPoint_);
    }

    function setDegenDealsERC6551Account(address degenDealsERC6551Account_) public {
        require(msg.sender == owner, "DeDealsERC6551Registry: not owner");
        degenDealsERC6551Account = IDeDealsERC6551Account(payable(degenDealsERC6551Account_));
    }

    function createAccount(
        address implementation,
        bytes32 salt,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId
    ) public virtual returns (address) {
        if (address(deDeals) != msg.sender) { revert CallerNotDegenDeals(msg.sender, address(deDeals)); }
        return _createAccount(
            implementation,
            salt,
            chainId,
            tokenContract,
            tokenId
        );
    }

    function _createAccount(
        address implementation,
        bytes32 salt,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId
    ) internal virtual returns (address) {
        assembly {
            // Memory Layout:
            // ----
            // 0x00   0xff                           (1 byte)
            // 0x01   registry (address)             (20 bytes)
            // 0x15   salt (bytes32)                 (32 bytes)
            // 0x35   Bytecode Hash (bytes32)        (32 bytes)
            // ----
            // 0x55   ERC-1167 Constructor + Header  (20 bytes)
            // 0x69   implementation (address)       (20 bytes)
            // 0x5D   ERC-1167 Footer                (15 bytes)
            // 0x8C   salt (uint256)                 (32 bytes)
            // 0xAC   chainId (uint256)              (32 bytes)
            // 0xCC   tokenContract (address)        (32 bytes)
            // 0xEC   tokenId (uint256)              (32 bytes)

            // Silence unused variable warnings
            pop(chainId)

            // Copy bytecode + constant data to memory
            calldatacopy(0x8c, 0x24, 0x80) // salt, chainId, tokenContract, tokenId
            mstore(0x6c, 0x5af43d82803e903d91602b57fd5bf3) // ERC-1167 footer
            mstore(0x5d, implementation) // implementation
            mstore(0x49, 0x3d60ad80600a3d3981f3363d3d373d3d3d363d73) // ERC-1167 constructor + header

            // Copy create2 computation data to memory
            mstore(0x35, keccak256(0x55, 0xb7)) // keccak256(bytecode)
            mstore(0x15, salt) // salt
            mstore(0x01, shl(96, address())) // registry address
            mstore8(0x00, 0xff) // 0xFF

            // Compute account address
            let computed := keccak256(0x00, 0x55)

            // If the account has not yet been deployed
            if iszero(extcodesize(computed)) {
                // Deploy account contract
                let deployed := create2(0, 0x55, 0xb7, salt)

                // Revert if the deployment fails
                if iszero(deployed) {
                    mstore(0x00, 0x20188a59) // `AccountCreationFailed()`
                    revert(0x1c, 0x04)
                }

                // Store account address in memory before salt and chainId
                mstore(0x6c, deployed)

                // Emit the ERC6551AccountCreated event
                log4(
                    0x6c,
                    0x60,
                    // `ERC6551AccountCreated(address,address,bytes32,uint256,address,uint256)`
                    0x79f19b3655ee38b1ce526556b7731a20c8f218fbda4a3990b6cc4172fdf88722,
                    implementation,
                    tokenContract,
                    tokenId
                )

                // Return the account address
                return(0x6c, 0x20)
            }

            // Otherwise, return the computed account address
            mstore(0x00, shr(96, shl(96, computed)))
            return(0x00, 0x20)
        }
    }

    function account(
        address implementation,
        bytes32 salt,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId
    ) public virtual view returns (address) {
        assembly {
            // Silence unused variable warnings
            pop(chainId)
            pop(tokenContract)
            pop(tokenId)

            // Copy bytecode + constant data to memory
            calldatacopy(0x8c, 0x24, 0x80) // salt, chainId, tokenContract, tokenId
            mstore(0x6c, 0x5af43d82803e903d91602b57fd5bf3) // ERC-1167 footer
            mstore(0x5d, implementation) // implementation
            mstore(0x49, 0x3d60ad80600a3d3981f3363d3d373d3d3d363d73) // ERC-1167 constructor + header

            // Copy create2 computation data to memory
            mstore(0x35, keccak256(0x55, 0xb7)) // keccak256(bytecode)
            mstore(0x15, salt) // salt
            mstore(0x01, shl(96, address())) // registry address
            mstore8(0x00, 0xff) // 0xFF

            // Store computed account address in memory
            mstore(0x00, shr(96, shl(96, keccak256(0x00, 0x55))))

            // Return computed account address
            return(0x00, 0x20)
        }
    }

    function createDealAccount(uint256 dealId, address implementation) public returns (address dealAccount) {
        if (address(deDeals) != msg.sender) { revert CallerNotDegenDeals(msg.sender, address(deDeals)); }
        if (implementation == address(0)) { implementation = address(degenDealsERC6551Account); }
        bytes memory data = abi.encodeWithSignature(
            "initialize(address,address,uint256)",
            address(entryPoint),
            address(this),
            dealId
        );
        dealAccount = address(new ERC1967Proxy(implementation, data));
        dealAccountImplementations[dealId] = implementation;
        dealAccounts[dealId] = dealAccount;
    }

    function deriveCreateDealAccount(uint256 dealId, uint256 splitDealId) external returns (address dealAccount) {
        if (address(deDeals) != msg.sender) { revert CallerNotDegenDeals(msg.sender, address(deDeals)); }
        address implementation = dealAccountImplementations[dealId];
        bytes memory data = abi.encodeWithSignature(
            "initialize(address,address,uint256)",
            address(entryPoint),
            address(this),
            dealId
        );
        dealAccount = address(new ERC1967Proxy(implementation, data));
        dealAccountImplementations[splitDealId] = implementation;
        dealAccounts[splitDealId] = dealAccount;
    }

}