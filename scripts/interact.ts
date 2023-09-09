import { ethers } from "hardhat";

// interacting with a smart contract
// that has been deployed using the interface(ABI)
// and the contract address

async function main() {
    const amount = ethers.parseEther("0.004");
    let [admin1, admin2, admin3, admin4, spender] = await ethers.getSigners();
    
    const admins = [admin1.address, admin2.address, admin3.address, admin4.address]
    // get the address of the contract
    const contractAddress = "0x3c68027368aC1938926f1716AfFAC8A95dDa6267";
    // connect to the deployed contract with getContractAt()
    // using the interface and address of the contract
    const multisigFactory = await ethers.getContractAt("IMultisigFactory", contractAddress);
    // call the createMultisigWallet in the contract to create the multisig
    const create = await multisigFactory.createMultisigWallet(admins, {value: amount})
    // get into the log database to get the newly created multisig address
    //@ts-ignore
    let newMultisig = (await create.wait())?.logs[0]?.args[0];
    

    // connect to the newly created multisig with the getContractAt()
    // using the interface and the contract address
    const multisig = await ethers.getContractAt("IMultisig", newMultisig);
    // call the creatTransaction() in the multisig contract
    await multisig.createTransaction(amount, spender.address)
    // call the approve function to approve the transaction
    await multisig.connect(admin2).ApproveTransaction(1) 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
