// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./MultiSig.sol";

contract FactoryContract {
    MultiSig[] public wallets;

    function createMultisigWallet(address[] memory _admins) external returns (MultiSig newWallet) {
        // Create a new wallet and assign the address to newWallet
        newWallet = new MultiSig(_admins);
        wallets.push(newWallet);
    }
}