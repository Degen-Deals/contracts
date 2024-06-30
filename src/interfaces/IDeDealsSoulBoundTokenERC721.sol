// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IDeDealsSoulBoundTokenERC721 is IERC721 {

    error FailedVerification(address account);

    error SoulBoundTokenExist(address account, uint256 sbtId);

    error SoubBoundTokenNotTransferable();

    struct SBTData {
        uint256 totalDeals;
        uint256 successfulDeals;
        uint256 deDealMinted;
    }

    function totalSBT() external view returns (uint256);

    function sbtId(address soul) external view returns (uint256);

    function isSoul(address account) external view returns (bool);

}