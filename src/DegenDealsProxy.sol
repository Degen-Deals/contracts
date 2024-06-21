// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract DegenDealsProxy is TransparentUpgradeableProxy {

    
    constructor (address implementation) TransparentUpgradeableProxy(implementation, msg.sender, "") {}


}