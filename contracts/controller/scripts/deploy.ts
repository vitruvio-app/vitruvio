import hre, { ethers, network, run } from 'hardhat'
import '@nomiclabs/hardhat-ethers'
import signale from 'signale'

async function main() {
  const ControllerFactory = await ethers.getContractFactory('Controller')
  const controller = await ControllerFactory.deploy()
  const deployTransaction = await controller.deploymentTransaction()
  const ControllerAddress = await controller.getAddress()
  signale.success(
    `Treasure contract was deployed to:${ControllerAddress} 🚀🚀 `
  )
  signale.pending('Waiting for transaction to be mined ...')
  await deployTransaction?.wait(10)
  signale.success('Transaction mined')
  signale.pending('Verifying contract on Scanner')
  await verify(ControllerAddress, [])
}
async function verify(contractAddress: string, args: any[]) {
  try {
    await run('verify:verify', {
      address: contractAddress,
    })
  } catch (error: any) {
    console.log(error)
    if (error.message.toLowerCase().includes('already verified')) {
      signale.complete('Contract already verified')
    }
  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})