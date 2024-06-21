// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import "./ERC6551AccountLib.sol";
import "../../interfaces/ERC6551/IERC6551Account.sol";

import "./ERC6551Executor.sol";
import "./Signatory.sol";

/**
 * @title ERC-6551 Account Support
 * @dev Implements the ERC-6551 Account interface
 */
abstract contract ERC6551Account is ERC6551Executor, IERC6551Account {
    uint256 internal _state;

    receive() external payable virtual {}

    /**
     * @dev See: {IERC6551Account-isValidSigner}
     */
    function isValidSigner(address signer, bytes calldata data)
        public
        view
        virtual
        returns (bytes4 magicValue)
    {
        if (_isValidSigner(signer, data)) {
            return IERC6551Account.isValidSigner.selector;
        }

        return bytes4(0);
    }

    /**
     * @dev See: {IERC6551Account-token}
     */
    function token()
        public
        view
        virtual
        returns (uint256 chainId, address tokenContract, uint256 tokenId)
    {
        return ERC6551AccountLib.token();
    }

    /**
     * @dev See: {IERC6551Account-state}
     */
    function state() public view virtual returns (uint256) {
        return _state;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return
            interfaceId == type(IERC6551Account).interfaceId || super.supportsInterface(interfaceId);
    }

    /**
     * @dev Returns true if a given signer is authorized to use this account
     */
    function _isValidSigner(address signer, bytes memory) internal view virtual returns (bool);

    /**
     * @dev See {IERC1721-isValidSignature}
     */
    function isValidSignature(bytes32 hash, bytes calldata signature)
        external
        view
        virtual
        override
        returns (bytes4 magicValue)
    {
        if (_isValidSignature(hash, signature)) {
            return IERC1271.isValidSignature.selector;
        }

        return bytes4(0);
    }
}
