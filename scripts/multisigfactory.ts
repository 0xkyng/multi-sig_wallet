import { ethers } from "hardhat";

async function main() {
  const [admin1, admimn2, admin3, admin4, admin5, spender, sender] = await ethers.getSigners()
  const Owners = [admin1.address, admimn2.address, admin3.address]

  let amount = ethers.parseEther("2")

  
  const multiSigfactory = await ethers.deployContract("MultiSigFactory", []);

  await multiSigfactory.waitForDeployment();

  let receipt = await multiSigfactory.createMultisigWallet(Owners, {value: ethers.parseEther("50")})
  
  
  //@ts-ignore
  let newMultisig = (await receipt.wait())?.logs[0]?.args[0]
  let  multisigContract = await ethers.getContractAt("IMultisig", newMultisig)

  await multisigContract.createTransaction(amount, sender.address)
  console.log(await multisigContract.getTransaction(1))

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
