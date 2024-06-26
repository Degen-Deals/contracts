import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, use } from "chai";
import hre from "hardhat";
import { ZeroAddress } from "ethers";


describe("DegenDeals", function () {
   
    async function deployDegenDeals() {
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
  
        return { 
            degenDealsERC20, degenDealsERC721, degenDealsERC6551Account, degenDealsERC6551Registry,
            deployer, platformWallet, legalWallet, kycWallet, user1, user2
        };
    }
  
    describe("Mint", function () {
        
        let degenDealsERC20: any, degenDealsERC721: any
        let degenDealsERC6551Registry: any, degenDealsERC6551Account: any
        let deployer: any, platformWallet: any, legalWallet: any, kycWallet: any, user1: any, user2: any

        before(async () => {
            ({  degenDealsERC20, degenDealsERC721, degenDealsERC6551Account, degenDealsERC6551Registry,
                deployer, platformWallet, legalWallet, kycWallet, user1, user2
             } = await loadFixture(deployDegenDeals))
            let decimals = BigInt(await degenDealsERC20.decimals())
            console.log("Decimals: ", decimals)
            await degenDealsERC20.mint(user1.address, 5n * 10n ** decimals)
            await degenDealsERC20.mint(user2.address, 5n * 10n ** decimals)
        });

        it("user1 become member", async () => {
            await degenDealsERC721.connect(user1).becomeMember("0x");
            await degenDealsERC721.connect(user2).becomeMember("0x")
        })
  
        it("user1 mint dealId = 0", async function () {
            let offerData = {
                "name": "Degen Deals 0",
                "description": "deal 0",
                "image": "ipfs://QmYBrWr1MCMCxNB78RF96EzJHypZ658nUGtAQYq8VnWfqj"
            }

            let offerHash = JSON.stringify(offerData).toString()
            console.log(offerHash);
            let paymentToken = degenDealsERC20.target
            let paymentAmount = 1n * 10n ** 18n
            let period = 10_000
            let obligee = ZeroAddress
            let erc6551Account = ZeroAddress
        
            let mintFee = await degenDealsERC721.connect(user1).calcMintFee(paymentAmount)
            console.log("mintFee: ", mintFee)

            let txApprove = await degenDealsERC20.connect(user1).approve(degenDealsERC721.target, mintFee)
            await txApprove.wait()

            await degenDealsERC721.connect(user1).mint(offerHash, paymentToken, paymentAmount, period, obligee, erc6551Account)
        });

        it("user1 mint dealId = 1", async function () {
            let offerData = {
                "name": "Degen Deals 1",
                "description": "deal 1",
                "image": "ipfs://QmYBrWr1MCMCxNB78RF96EzJHypZ658nUGtAQYq8VnWfqj"
            }

            let offerHash = JSON.stringify(offerData).toString()
            console.log(offerHash);
            let paymentToken = degenDealsERC20.target
            let paymentAmount = 2n * 10n ** 18n
            let period = 15_000
            let obligee = ZeroAddress
            let erc6551Account = ZeroAddress
        
            let mintFee = await degenDealsERC721.connect(user1).calcMintFee(paymentAmount)
            console.log("mintFee: ", mintFee)

            let txApprove = await degenDealsERC20.connect(user1).approve(degenDealsERC721.target, mintFee)
            await txApprove.wait()

            await degenDealsERC721.connect(user1).mint(offerHash, paymentToken, paymentAmount, period, obligee, erc6551Account)
        });

        it("get nft", async () => {
            let totalDeals = await degenDealsERC721.totalDeals()
            console.log("Total deals: ", totalDeals)
            let lastDealData = await degenDealsERC721.getDeal(totalDeals - 1n);
            console.log(lastDealData)
            let prelastDealData = await degenDealsERC721.getDeal(totalDeals - 2n);
            console.log(prelastDealData)
        })

        it("user2 pay for last deal", async () => {
            let totalDeals = await degenDealsERC721.totalDeals()
            let dealId = totalDeals - 1n
            let data = "0x"
            let paymentAmount = await degenDealsERC721.calcPayAmount(dealId)
            let totalAmount = paymentAmount[0]
            
            await degenDealsERC20.connect(user2).approve(degenDealsERC721.target, totalAmount)
            await degenDealsERC721.connect(user2).pay(dealId, data)

        })

       
    });
  
    describe("Mint, designate and fund", () => {
        let degenDealsERC20: any, degenDealsERC721: any
        let degenDealsERC6551Registry: any, degenDealsERC6551Account: any
        let deployer: any, platformWallet: any, legalWallet: any, kycWallet: any, user1: any, user2: any

        before(async () => {
            ({  degenDealsERC20, degenDealsERC721, degenDealsERC6551Account, degenDealsERC6551Registry,
                deployer, platformWallet, legalWallet, kycWallet, user1, user2
             } = await loadFixture(deployDegenDeals))
            let decimals = BigInt(await degenDealsERC20.decimals())
            console.log("Decimals: ", decimals)
            await degenDealsERC20.mint(user1.address, 5n * 10n ** decimals)
            await degenDealsERC20.mint(user2.address, 5n * 10n ** decimals)
        });

        it("user1 become member", async () => {
            await degenDealsERC721.connect(user1).becomeMember("0x");
            await degenDealsERC721.connect(user2).becomeMember("0x")
        })

        it("user1 mint dealId = 0", async function () {
            let offerData = {
                "name": "Degen Deals 0",
                "description": "deal 0",
                "image": "ipfs://QmYBrWr1MCMCxNB78RF96EzJHypZ658nUGtAQYq8VnWfqj"
            }

            let offerHash = JSON.stringify(offerData).toString()
            console.log(offerHash);
            let paymentToken = degenDealsERC20.target
            let paymentAmount = 1n * 10n ** 18n
            let period = 10_000
            let obligee = ZeroAddress
            let erc6551Account = ZeroAddress
        
            let mintFee = await degenDealsERC721.connect(user1).calcMintFee(paymentAmount)
            console.log("mintFee: ", mintFee)

            let txApprove = await degenDealsERC20.connect(user1).approve(degenDealsERC721.target, mintFee)
            await txApprove.wait()

            await degenDealsERC721.connect(user1).mint(offerHash, paymentToken, paymentAmount, period, obligee, erc6551Account)
        });

        it('user1 designate the discount 5%, user2 fund it', async () => {

            let dealId = 0
            let dealDiscountPercent_ = 5000
            await degenDealsERC721.connect(user1).designate(dealId, dealDiscountPercent_)

            let fundAmount = await degenDealsERC721.calcFundAmount(dealId)
            let totalAmount = fundAmount[0]

            await degenDealsERC20.connect(user2).approve(degenDealsERC721.target, totalAmount)

            let owner = await degenDealsERC721.ownerOf(dealId)
            let fundData = "0x"
            await degenDealsERC721.connect(user2).fund(dealId, fundData)

            let newOwner = await degenDealsERC721.ownerOf(dealId)
            console.log(owner)
            console.log(newOwner)
        })

    })
     
});
  