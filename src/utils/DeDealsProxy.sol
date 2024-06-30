// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract DeDealsProxy is TransparentUpgradeableProxy {

    
    constructor (address implementation) TransparentUpgradeableProxy(implementation, msg.sender, "") {}


}