// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IMultisig {
    struct Transaction {
        address spender;
        uint amount;
        uint numberOfApproval;
        bool isActive;
    }
    
    function createTransaction(uint amount, address _spender) external;
    function ApproveTransaction(uint id) external;
    function calcMinimumApproval() external view returns(uint minAdmin);
    function getTransaction(uint id) external view returns(Transaction memory);
}