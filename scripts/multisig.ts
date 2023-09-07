import { ethers } from "hardhat";

async function main() {
  const [admin1, admimn2, admin3, admin4, admin5, spender, sender] = await ethers.getSigners()
  const Owners = [admin1.address, admimn2.address, admin3.address]
  
  const multiSig = await ethers.deployContract("MultiSig", [Owners], {
    value: ethers.parseEther("10"),
  });


  await multiSig.waitForDeployment();
  
  console.log(
    `MultiSig deployed to ${multiSig.target}`
  )

  const amount = ethers.parseEther("5")
  const receipt = await multiSig.createTransaction(amount, spender.address)
  // @ts-ignore
  console.log(await (await receipt.wait())?.logs[0]?.args)

  await multiSig.connect(admimn2).ApproveTransaction(1)
  let balanceBefore = await ethers.provider.getBalance(spender.address)
  console.log(`balance before ${ethers.formatEther(balanceBefore)}`)

  await multiSig.connect(admin3).ApproveTransaction(1)

  console.log(`spender balance ${ethers.formatEther((await ethers.provider.getBalance(spender.address))- balanceBefore)} `)

  await sender.sendTransaction({
    value: ethers.parseEther("5"),
    to: multiSig.target
  })



  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
