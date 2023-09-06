// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// a multisig wallet
// contract should accept ether
// array of signatories
// mapping address => bool for admins
// mapping uint => address => bool to track approval of eacch admin on each transaction
// transaction details

contract MultiSig {
    address[] Admins;
    uint constant MINIMUM = 3;
    uint transactionId;

    
    struct Transaction {
        address spender;
        uint amount;
        uint numberOfApproval;
        bool isActive;
    }

    mapping(address => bool) isAdmin;
    mapping(uint => Transaction) transaction;
    mapping(uint => mapping(address => bool)) hasApproved;

    error InvalidAddress(uint position);
    error InvalidAdminNumber(uint number);
    error duplicate(address _adr );

    event Create(address who, address spender, uint amount);

   
    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Not an admin");
        _;
    }

    constructor(address[] memory _admins) payable {
        if (_admins.length < MINIMUM) {
            revert InvalidAdminNumber(MINIMUM);
        }
        for (uint i = 0; i < _admins.length; i++) {
            if (_admins[i] == address(0)) {
                revert InvalidAddress(i + 1);
            }

            if (isAdmin[_admins[i]]) {
                revert duplicate(_admins[i]);
            }

            isAdmin[_admins[i]] = true;
        }
        Admins = _admins;
    }

    function craeteTransaction(uint amount, address _spender) external onlyAdmin {
        transactionId++;
        Transaction storage newTransaction = transaction[transactionId];
        newTransaction.amount = amount;
        newTransaction.spender = _spender;
        newTransaction.isActive = true;
        ApproveTransaction(transactionId);
        emit Create(msg.sender, _spender, amount);
    }

    function ApproveTransaction(uint id) public onlyAdmin{
        require(!hasApproved[id][msg.sender], "Already approved");
        Transaction storage newTransaction = transaction[id];
        require(newTransaction.isActive, "Not active");
        newTransaction.numberOfApproval += 1;
        uint count = newTransaction.numberOfApproval;
        uint minAdmin = calcMinimumApproval();
        if (count >= minAdmin) {
            processTransaction(id);
        }
    }

    function processTransaction(uint id) internal {
        Transaction storage newTransaction = transaction[id];
        payable (newTransaction.spender).transfer(newTransaction.amount);
        newTransaction.isActive = false;
    }

    function calcMinimumApproval() public view returns(uint minAdmin) {
        uint size = Admins.length;
        minAdmin = size * 70 / 100;
    }

    function getTransaction(uint id) external view returns(Transaction memory){
        return transaction[id];

    }

    receive() external payable{}
    fallback() external payable {}
      
}
