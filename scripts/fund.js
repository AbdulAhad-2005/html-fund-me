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
  console.log("Funding contract...");
  const transactionResponse = await fundMe.fund({
    value: ethers.parseEther("0.1"),
  });
  await transactionResponse.wait(1);
  console.log("funded...");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
