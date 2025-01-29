const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe;
      let deployer;
      let signer;
      let mockV3Aggregator;
      const sendValue = ethers.parseEther("1"); // 1 ether
      beforeEach(async function () {
        // Deploy FundMe contract using hardhat-deploy
        console.log("Running beforeEach hook...");
        // deployer = (await getNamedAccounts()).deployer;
        const { deployer } = await getNamedAccounts();
        console.log("Deployer address:", deployer);
        await deployments.fixture(["all"]);
        signer = await ethers.getSigner(deployer);
        fundMe = await ethers.getContractAt(
          "FundMe",
          (
            await deployments.get("FundMe")
          ).address,
          signer
        ); // most recently deployed fundme contract
        mockV3Aggregator = await ethers.getContractAt(
          "MockV3Aggregator",
          (
            await deployments.get("MockV3Aggregator")
          ).address,
          signer
        );
      });
      describe("constructor", async function () {
        it("sets the aggregator address corectly", async function () {
          const response = await fundMe.getPriceFeed();
          assert.equal(response, mockV3Aggregator.target);
        });
      });

      describe("fund", async function () {
        it("fails if you not send enough ether", async function () {
          await expect(fundMe.fund()).to.be.revertedWith(
            "You need to spend more ETH!"
          );
        });
        it("update the amount funded data structure", async function () {
          console.log("sendValue", sendValue);
          await fundMe.fund({ value: sendValue });
          const response = await fundMe.getAddressToAmountFunded(signer);
          assert.equal(response.toString(), sendValue.toString());
        });
        it("adds funder to array of getFunder", async function () {
          await fundMe.fund({ value: sendValue });
          const funder = await fundMe.getFunder(0);
          assert.equal(funder, signer.address);
        });
      });
      describe("withdraw", async function () {
        beforeEach(async function () {
          await fundMe.fund({ value: sendValue });
        });
        it("withdraw ETH from a single funder", async function () {
          // Arrange
          const startingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const startingFunderBalance = await ethers.provider.getBalance(
            signer.address
          );
          // Act
          const transactionResponse = await fundMe.withdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, gasPrice } = transactionReceipt;
          const gasCost = BigInt(gasUsed) * BigInt(gasPrice);

          const endingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const endingFunderBalance = await ethers.provider.getBalance(
            signer.address
          );
          // Assert
          assert.equal(endingFundMeBalance, 0n);
          assert.equal(
            startingFundMeBalance + startingFunderBalance,
            endingFunderBalance + gasCost
          );
        });
        it("allows us to withdraw with multiple getFunder", async function () {
          // Arrange
          const accounts = await ethers.getSigners();
          for (let i = 1; i < 6; i++) {
            const fundMeConnectedContract = await fundMe
              .connect(accounts[i])
              .fund({ value: sendValue });
          }

          const startingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const startingFunderBalance = await ethers.provider.getBalance(
            signer.address
          );

          // Act
          const transactionResponse = await fundMe.withdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, gasPrice } = transactionReceipt;
          const gasCost = BigInt(gasUsed) * BigInt(gasPrice);

          // Assert
          const endingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const endingFunderBalance = await ethers.provider.getBalance(
            signer.address
          );

          assert.equal(endingFundMeBalance, 0n);
          assert.equal(
            startingFundMeBalance + startingFunderBalance,
            endingFunderBalance + gasCost
          );
          // make sure that the getFunder are reset properly
          await expect(fundMe.getFunder(0)).to.be.reverted;
          for (let i = 1; i < 6; i++) {
            assert.equal(
              await fundMe.getAddressToAmountFunded(accounts[i]),
              0n
            );
          }
        });
        it("only allows the owner to withdraw", async function () {
          const accounts = await ethers.getSigners();
          const attacker = accounts[1];
          const attackerConnectedContract = await fundMe.connect(attacker);
          await expect(
            attackerConnectedContract.withdraw()
          ).to.be.revertedWithCustomError(
            attackerConnectedContract,
            "FundMe__NotOwner"
          );
        });

        it("cheapWithdraw ETH from a single funder", async function () {
          // Arrange
          const startingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const startingFunderBalance = await ethers.provider.getBalance(
            signer.address
          );
          // Act
          const transactionResponse = await fundMe.cheapWithdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, gasPrice } = transactionReceipt;
          const gasCost = BigInt(gasUsed) * BigInt(gasPrice);

          const endingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const endingFunderBalance = await ethers.provider.getBalance(
            signer.address
          );
          // Assert
          assert.equal(endingFundMeBalance, 0n);
          assert.equal(
            startingFundMeBalance + startingFunderBalance,
            endingFunderBalance + gasCost
          );
        });

        it("cheaperWithdraw() testing...", async function () {
          // Arrange
          const accounts = await ethers.getSigners();
          for (let i = 1; i < 6; i++) {
            const fundMeConnectedContract = await fundMe
              .connect(accounts[i])
              .fund({ value: sendValue });
          }

          const startingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const startingFunderBalance = await ethers.provider.getBalance(
            signer.address
          );

          // Act
          const transactionResponse = await fundMe.cheapWithdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, gasPrice } = transactionReceipt;
          const gasCost = BigInt(gasUsed) * BigInt(gasPrice);

          // Assert
          const endingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const endingFunderBalance = await ethers.provider.getBalance(
            signer.address
          );

          assert.equal(endingFundMeBalance, 0n);
          assert.equal(
            startingFundMeBalance + startingFunderBalance,
            endingFunderBalance + gasCost
          );
          // make sure that the s_getFunder are reset properly
          await expect(fundMe.getFunder(0)).to.be.reverted;
          for (let i = 1; i < 6; i++) {
            assert.equal(
              await fundMe.getAddressToAmountFunded(accounts[i]),
              0n
            );
          }
        });
      });
    });
