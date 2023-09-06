import { ethers } from "hardhat";

async function main() {
  const [admin1, admimn2, admin3, admin4, admin5, spender] = await ethers.getSigners()
  const Owners = [admin1.address, admimn2.address, admin3.address, admin4.address, admin5.address]
  
  const multiSig = await ethers.deployContract("MultiSig", [Owners], {
    value: ethers.parseEther("10"),
  });

  const amount = ethers.parseEther("5")

  await multiSig.waitForDeployment();
  
  console.log(
    `MultiSig deployed to ${multiSig.target}`
  )

  

  const receipt = await multiSig.craeteTransaction(amount, spender.address)
  // @ts-ignore
  console.log(await (await receipt.wait())?.logs[0]?.args)

  await multiSig.connect(admimn2).ApproveTransaction(1)
  let balanceBefore = await ethers.provider.getBalance(spender.address)
  console.log(`balance before ${balanceBefore}`)
  await multiSig.connect(admin3).ApproveTransaction(1)

  console.log(`spender balance ${ethers.provider.getBalance(spender.address)} `)

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
