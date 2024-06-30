// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/IDeDealERC20.sol";
import "./interfaces/IDeDealsAffilatesERC721.sol";
import "./interfaces/IDeDealsERC721.sol";

/**
 * @title DeDeals affilate system
 */
contract DeDealsAffilatesERC721 is Initializable, ERC721, IDeDealsAffilatesERC721 {
    using SafeERC20 for IERC20;
    
    /// @dev 100% == 100_000
    uint256 public constant PERCENT_DENOMINATOR = 100_000;

    /// @dev address of dedeal
    IDeDealERC20 public dedeal;

    /// @dev address of Degen Deals
    IDeDealsERC721 public deDeals;

    /// @dev total affilates
    uint256 public totalAffilates;

    /// @dev example: [150, 100, 75, 50, 25, 12, 9]
    uint256[] public distribution;

    /// @dev sum of all elements of `distribution`
    uint256 public distributionSum;

    /// @dev royalty fee percent
    uint256 public royaltyFeePercent;

    /// @dev refferal id => id of refferer
    mapping (uint256 refferalId => uint256) public reffererId;
    
    /// @dev address of affilate => id of affilate
    mapping (address affilate => uint256) public affilateId;

    /// @dev affilate id => address of minter
    mapping (uint256 affilateId => address) public minter;

    constructor() ERC721("Degen Deals Affilates", "DeAFFS") {}

    function initialize(address dedeal_, address deDeals_) public initializer() {
        dedeal = IDeDealERC20(dedeal_);
        deDeals = IDeDealsERC721(deDeals_);
        distribution = new uint256[](7);
        distribution[0] = 150;
        distribution[1] = 100;
        distribution[2] = 75;
        distribution[3] = 50;
        distribution[4] = 25;
        distribution[5] = 12;
        distribution[6] = 9;
        royaltyFeePercent = 5_000; // 5%
        
        // _mint(platformWallet, 0);
    }

    function mint(uint256 reffererId_) public {
        _requireOwned(reffererId_);
        address to = msg.sender;
        uint256 affilateId_ = totalAffilates;
        ++totalAffilates;
        _mint(to, affilateId_);
        reffererId[affilateId_] = reffererId_;

    }

    function burn() public {

    }

    function aaa(uint256 childAffilateId, uint256 parentAffilateId) public {
        
    }

    function distributeAffilatesFees(IERC20 paymentToken, address affilate, uint256 totalAffilateFee) public override {
        paymentToken.safeTransferFrom(msg.sender, address(this), totalAffilateFee);
        uint256 refferalId = reffererId[affilateId[affilate]];
        uint256 len = distribution.length;
        uint256 affilateFee;
        for (uint256 i; i < len && refferalId != 0;) {
            affilateFee = totalAffilateFee * distribution[i] / distributionSum;
            paymentToken.safeTransfer(ownerOf(refferalId), affilateFee);
            refferalId = reffererId[refferalId];
            unchecked {++i;}
        }
    }

    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) public view override returns (address receiver, uint256 royaltyAmount) {
        receiver = minter[tokenId];
        royaltyAmount = salePrice * royaltyFeePercent / PERCENT_DENOMINATOR;
    }

}