# MultiSig Wallet Smart Contract

This Ethereum smart contract, written in Solidity, implements a simple multisignature wallet with the ability to manage and approve transactions using a minimum number of required approvals. Below is a concise README explaining the key features and usage of this contract.

## Features

- **Multisignature Wallet**: This contract allows multiple designated administrators to collectively manage and control a wallet.

- **Ether Acceptance**: The contract is capable of receiving and holding Ether.

- **Minimum Approvals**: To execute a transaction, a minimum number of administrator approvals are required.

- **Transaction Approval Tracking**: The contract keeps track of approvals by each administrator for each transaction.

## Contract Structure

### Storage Variables

- `Admins`: An array of administrator addresses.
- `MINIMUM`: Minimum number of approvals required to execute a transaction (set to 3 in this example).
- `transactionId`: A counter to keep track of transaction IDs.
- `Transaction`: A struct representing a transaction, containing information such as spender, amount, approval count, and status.
- `isAdmin`: A mapping to check if an address is an administrator.
- `transaction`: A mapping to store transaction details.
- `hasApproved`: A mapping to track approval status for each transaction by each administrator.

### Functions

- `createTransaction(uint amount, address _spender)`: Allows an administrator to create a new transaction request with a specified amount and recipient address.

- `ApproveTransaction(uint id)`: Allows an administrator to approve a transaction by providing its ID. When the required number of approvals is reached, the transaction is executed.

- `executeTransaction(uint id)`: Executes a transaction by transferring Ether to the specified recipient.

- `calcMinimumApproval()`: Calculates the minimum number of approvals required based on the total number of administrators.

- `getTransaction(uint id)`: Retrieves the details of a specific transaction.

### Modifiers

- `onlyAdmin`: A modifier to restrict access to functions to only administrators.

### Events

- `Create(address who, address spender, uint amount)`: An event triggered when a new transaction is created.

## Usage

1. Deploy the smart contract to the Ethereum network, passing an array of administrator addresses to the constructor.

2. Administrators can create transactions using the `createTransaction` function, specifying the amount and recipient.

3. Other administrators can approve transactions using the `ApproveTransaction` function.

4. Once the required number of approvals is reached, the transaction can be executed using the `executeTransaction` function.

