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

    function getMultisigWallet() external view returns(MultiSig[] memory) {
        return wallets;
    }

    function getWalletByIndex(uint index) external view returns(MultiSig) {
        require(index < wallets.length, "Invalid index");
        return wallets[index];
    }
}