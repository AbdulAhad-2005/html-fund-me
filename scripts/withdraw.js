const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer, signer } = await getNamedAccounts();
  const fundMe = await ethers.getContractAt(
    "FundMe",
    (
      await deployments.get("FundMe")
    ).address,
    signer
  );
  console.log("Withdrawing from contract...");
  const transactionResponse = await fundMe.withdraw();
  await transactionResponse.wait(1);
  console.log("Got it back!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
