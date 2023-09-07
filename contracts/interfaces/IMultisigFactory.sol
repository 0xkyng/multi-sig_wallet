// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./IMultisig.sol";

interface IMultisigFactory {
    function createMultisigWallet(address[] memory _admins) external payable returns (IMultisig newWallet);
}