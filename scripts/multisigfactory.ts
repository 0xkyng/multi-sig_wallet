import { ethers } from "hardhat";

async function main() {
  const [admin1, admimn2, admin3, admin4, admin5, spender, sender] = await ethers.getSigners()
  const Owners = [admin1.address, admimn2.address, admin3.address]

  let amount = ethers.parseEther("0.0002")

  // deploy the multisig factory contract
  const multisigfactory =  await ethers.deployContract("MultiSigFactory", [])
  // wait for it to deploy
  await multisigfactory.waitForDeployment()

  console.log(`multisig deployed ${multisigfactory.target}`)

  // call the createMultisigWallet() in the multisig factory
  // to create a multisig wallet
  let tnx = await multisigfactory.createMultisigWallet(Owners, {value: ethers.parseEther("0.00003")})

  // get into the log database to get the newly created multisig address
    //@ts-ignore
    const newMultisg = (await tnx.wait())?.logs[0]?.args[0];

  // connect to the newly created multisig with the getContractAt()
  // using the interface and the contract address
  let multisig = await ethers.getContractAt("IMultisig", newMultisg)

  // call the creatTransaction() in the multisig contract
  await multisig.createTransaction(amount, spender.address)

  // // call the approve function to approve the transaction
  await multisig.ApproveTransaction(1);







}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
