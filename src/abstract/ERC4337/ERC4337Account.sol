// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

import "../../interfaces/ERC4337/IEntryPoint.sol";
import "../../interfaces/ERC4337/UserOperation.sol";
import "../Errors.sol";
import "./BaseAccount.sol";

/**
 * @title ERC-4337 Support
 * @dev Implements ERC-4337 account support
 */
abstract contract ERC4337Account is BaseAccount {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    IEntryPoint internal _entryPoint;

    function __ERC4337_init(address entryPoint_) internal {
        if (entryPoint_ == address(0)) revert InvalidEntryPoint();
        _entryPoint = IEntryPoint(entryPoint_);
    } 

    /**
     * @dev See {BaseERC4337Account-entryPoint}
     */
    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    /**
     * @dev See {BaseERC4337Account-_validateSignature}
     */
    function _validateSignature(UserOperation calldata userOp, bytes32 userOpHash)
        internal
        view
        virtual
        returns (uint256)
    {
        if (_isValidSignature(_getUserOpSignatureHash(userOp, userOpHash), userOp.signature)) {
            return 0;
        }
        return 1;
    }

    /// @dev Returns the user operation hash that should be signed by the account owner 
    function getUserOpSignatureHash(UserOperation calldata userOp, bytes32 userOpHash) public view virtual returns (bytes32) {
        return _getUserOpSignatureHash(userOp, userOpHash);
    }

    /**
     * @dev Returns the user operation hash that should be signed by the account owner
     */
    function _getUserOpSignatureHash(UserOperation calldata userOp, bytes32 userOpHash)
        internal
        view
        virtual
        returns (bytes32)
    {   
        userOp;
        return userOpHash.toEthSignedMessageHash();
    }

    function _isValidSignature(bytes32 hash, bytes calldata signature)
        internal
        view
        virtual
        returns (bool);
}
