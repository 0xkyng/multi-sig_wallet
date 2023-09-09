import { ethers, network } from 'hardhat'

async function main() {
  const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  
  const DAITokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

  const ethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  const DaiHolder = "0x9cDF5ce3c9Ea71ECC8fb7C3A17ed7B6c74F9C5F0"
  const path2 = [ethAddress, DAITokenAddress]
  const ethHolder = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  
  
  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const deadline = currentTimestampInSeconds + 86400

  const value = ethers.parseEther("5")

  const uniswap = await ethers.getContractAt('IUniswap', uniswapAddr)

// connect to uniswap token uing t to dai token using the interface and addressthe interface & address
    const uniContract = await ethers.getContractAt('IERC20', ethAddress)
 
  // connect to dai token using the interface and address
  const DAIContract = await ethers.getContractAt('IERC20', DAITokenAddress)

  const ethSigner = await ethers.getImpersonatedSigner(ethHolder)

  await DAIContract.connect(ethSigner).approve(ethAddress, value)


  const amountOutMin = ethers.parseEther("0")

  await uniswap.connect(ethSigner).swapExactETHForTokens(amountOutMin,path2,DaiHolder,deadline,{value: "30"})
  console.log(await DAIContract.balanceOf(DaiHolder))


  }


main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})