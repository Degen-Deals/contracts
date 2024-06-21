// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import "../../interfaces/ERC6551/IERC6551Executable.sol";

import "../Errors.sol";
import "./LibExecutor.sol";
import "./Signatory.sol";

/**
 * @title ERC-6551 Executor
 * @dev Basic executor which implements the IERC6551Executable execution interface
 */
abstract contract ERC6551Executor is IERC6551Executable, ERC165, Signatory {
    
    function _beforeExecute() internal virtual {}

    function _afterExecute() internal virtual {}

    function isValidExecutor(address executor) external view virtual returns (bytes4);
    
    function _isValidExecutor(address executor) internal view virtual returns (bool);

    /**
     * Executes a low-level operation from this account if the caller is a valid executor
     *
     * @param to Account to operate on
     * @param value Value to send with operation
     * @param data Encoded calldata of operation
     * @param operation Operation type (0=CALL, 1=DELEGATECALL, 2=CREATE, 3=CREATE2)
     */
    function execute(address to, uint256 value, bytes calldata data, uint8 operation)
        external
        payable
        virtual
        returns (bytes memory result)
    {}

    function _msgSender() internal view virtual returns (address sender) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return super.supportsInterface(interfaceId) ||
            interfaceId == type(IERC6551Executable).interfaceId;
    }
}
