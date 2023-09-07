// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./MultiSig.sol";

contract MultiSigFactory {
    MultiSig[] public wallets;
    event Create(MultiSig _addr);

    function createMultisigWallet(address[] memory _admins) external payable returns (MultiSig newWallet) {
        newWallet = new MultiSig{value: msg.value}(_admins);
        wallets.push(newWallet);
        emit Create(newWallet );
    }

    function getMultisigWallet() external view returns(MultiSig[] memory) {
        return wallets;
    }

    function getWalletByIndex(uint index) external view returns(MultiSig) {
        require(index < wallets.length, "Invalid index");
        return wallets[index];
    }
}