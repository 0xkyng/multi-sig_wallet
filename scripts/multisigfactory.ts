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

  




}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
