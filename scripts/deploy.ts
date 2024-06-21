import { ethers } from "hardhat";

async function main() {

  const [ platformWallet, legalWallet, kycWallet ] = await ethers.getSigners();

  let degenDealsERC20Address;
  let degenDealsERC6551RegistryAddress
  let degenDealsERC6551AccountAddress;
  let platformWalletAddress = platformWallet.address
  let legalWalletAddress = legalWallet.address
  let kycWalletAddress = kycWallet.address

  const DegenDealsERC20 = await ethers.getContractFactory("DegenDealsERC20")
  const DegenDealsERC721 = await ethers.getContractFactory("DegenDealsERC721")
  const DegenDealsERC6551Account = await ethers.getContractFactory("DegenDealsERC6551Account")
  const DegenDealsERC6551Registry = await ethers.getContractFactory("DegenDealsERC6551Registry")
  const DegenDealsProxy = await ethers.getContractFactory("DegenDealsProxy")

  let degenDealsERC20;
  let degenDealsERC6551Account
  let degenDealsERC721
  let degenDealsERC6551Registry
  
  degenDealsERC20 = await DegenDealsERC20.deploy()
  await degenDealsERC20.waitForDeployment()
  degenDealsERC20Address = degenDealsERC20.target
  console.log("DegenDealsERC20 deployed to: ", degenDealsERC20Address)

  degenDealsERC6551Account = await DegenDealsERC6551Account.deploy();
  await degenDealsERC6551Account.waitForDeployment();
  degenDealsERC6551AccountAddress = degenDealsERC6551Account.target
  console.log("DegenDealsERC6551Account deployed to:", degenDealsERC6551Account.target);
  
  degenDealsERC6551Registry = await DegenDealsERC6551Registry.deploy();
  await degenDealsERC6551Registry.waitForDeployment();
  console.log("DegenDealsERC6551Registry deployed to:", degenDealsERC6551Registry.target);
  
  const degenDealsERC6551RegistryProxy = await DegenDealsProxy.deploy(degenDealsERC6551Registry.target);
  await degenDealsERC6551RegistryProxy.waitForDeployment();
  degenDealsERC6551RegistryAddress = degenDealsERC6551RegistryProxy.target
  console.log("DegenDealsProxy deployed to:", degenDealsERC6551RegistryAddress);
  
  degenDealsERC6551Registry = DegenDealsERC6551Registry.attach(degenDealsERC6551RegistryAddress)

  const initRegistryTx = await degenDealsERC6551Registry.initialize(
    degenDealsERC6551RegistryAddress, 
    degenDealsERC6551Account.target
  )
  await initRegistryTx.wait()

 degenDealsERC721 = await DegenDealsERC721.deploy(
    degenDealsERC20Address,
    degenDealsERC6551Registry,
    platformWallet,
    legalWallet,
    kycWallet
  );
  await degenDealsERC721.waitForDeployment();
  console.log("DegenDealsERC721 deployed to:", degenDealsERC721.target);
  



}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });