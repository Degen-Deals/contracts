import { ethers } from "hardhat";


async function main() {
  const [ deployer, platformWallet, legalWallet, kycWallet, user1, user2 ] = await ethers.getSigners();
  

  let degenDealsERC20Address;
  let degenDealsERC721Address;
  let degenDealsERC6551RegistryImplementationAddress;
  let degenDealsERC6551RegistryAddress
  let degenDealsERC6551AccountAddress;
  let deployerAddress = deployer.address
  let platformWalletAddress = platformWallet.address
  let legalWalletAddress = legalWallet.address
  let kycWalletAddress = kycWallet.address
  console.log("deployer: ", deployerAddress)
  console.log("platformWallet: ", platformWalletAddress)
  console.log("legalWallet: ", legalWalletAddress)
  console.log("kycWallet: ", kycWalletAddress)

  const DegenDealsERC20 = await ethers.getContractFactory("DegenDealsERC20")
  const DegenDealsERC721 = await ethers.getContractFactory("DegenDealsERC721")
  const DegenDealsERC6551Account = await ethers.getContractFactory("DegenDealsERC6551Account")
  const DegenDealsERC6551Registry = await ethers.getContractFactory("DegenDealsERC6551Registry")
  const DegenDealsProxy = await ethers.getContractFactory("DegenDealsProxy")
  
  let degenDealsERC20;
  let degenDealsERC721
  let degenDealsERC6551Account
  let degenDealsERC6551Registry
  
  degenDealsERC20 = await DegenDealsERC20.connect(deployer).deploy()
  await degenDealsERC20.waitForDeployment()
  degenDealsERC20Address = degenDealsERC20.target
  console.log("DegenDealsERC20 deployed to: ", degenDealsERC20Address)

  degenDealsERC6551Account = await DegenDealsERC6551Account.connect(deployer).deploy();
  await degenDealsERC6551Account.waitForDeployment();
  degenDealsERC6551AccountAddress = degenDealsERC6551Account.target
  console.log("DegenDealsERC6551Account deployed to:", degenDealsERC6551Account.target);
  
  degenDealsERC6551Registry = await DegenDealsERC6551Registry.connect(deployer).deploy();
  await degenDealsERC6551Registry.waitForDeployment();
  degenDealsERC6551RegistryImplementationAddress = degenDealsERC6551Registry.target
  console.log("DegenDealsERC6551Registry deployed to:", degenDealsERC6551RegistryImplementationAddress);
  
  const degenDealsERC6551RegistryProxy = await DegenDealsProxy.connect(deployer).deploy(degenDealsERC6551Registry.target);
  await degenDealsERC6551RegistryProxy.waitForDeployment();
  degenDealsERC6551RegistryAddress = degenDealsERC6551RegistryProxy.target
  console.log("DegenDealsERC6551Registry Proxy deployed to:", degenDealsERC6551RegistryAddress);
  
  degenDealsERC6551Registry = DegenDealsERC6551Registry.connect(deployer).attach(degenDealsERC6551RegistryAddress)

  degenDealsERC721 = await DegenDealsERC721.connect(deployer).deploy(
      degenDealsERC20Address,
      degenDealsERC6551Registry,
      platformWallet,
      legalWallet,
      kycWallet
  );
  await degenDealsERC721.waitForDeployment()
  degenDealsERC721Address = degenDealsERC721.target
  console.log("DegenDealsERC721 address: ", degenDealsERC721Address)

  const initRegistryTx = await degenDealsERC6551Registry.connect(deployer).initialize(
      degenDealsERC721.target,
      degenDealsERC6551Account.target,
      platformWallet.address
  )
  await initRegistryTx.wait()

  await degenDealsERC721.connect(deployer).modifyPaymentToken(degenDealsERC20.target, true)


}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });