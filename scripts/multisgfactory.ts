import { ethers } from "hardhat";

async function main() {
  const [admin1, admimn2, admin3, admin4, admin5, spender, sender] = await ethers.getSigners()
  
  
  const multiSigfactory = await ethers.deployContract("MultiSigFactory");

  multiSigfactory.waitForDeployment();
  const Owners = [admin1.address, admimn2.address, admin3.address]

  const tnx = await multiSigfactory.createMultisigWallet(Owners)
  const receipt = await tnx.wait()

  const firstMultisig = await multiSigfactory.wallets(0)
  const multisig1 = await ethers.getContractAt("MultiSig", firstMultisig)

  await sender.sendTransaction({
    value: ethers.parseEther("50"),
    to: multisig1.target,
  })

  await multisig1.connect(admin3).createTransaction(ethers.parseEther("1"), spender.address)

  console.log(await ethers.provider.getBalance(multisig1.target))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
