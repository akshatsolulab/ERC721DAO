const hre = require('hardhat');

async function main() {
  [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
    await ethers.getSigners();

  const myNFT = await hre.ethers.getContractFactory('NFT');
  const NFT = await myNFT.deploy();

  await NFT.deployed();

  console.log('NFT deployed to:', NFT.address);

  const TimeLock = await hre.ethers.getContractFactory('TimeLock');
  const timeLock = await TimeLock.deploy(
    1,
    [],
    ['0x0000000000000000000000000000000000000000']
  );

  await timeLock.deployed();

  console.log('TimeLock deployed to:', timeLock.address);

  const Governance = await hre.ethers.getContractFactory('Governance');
  const governance = await Governance.deploy(
    NFT.address,
    timeLock.address
  );

  await governance.deployed();

  console.log('Governance deployed to:', governance.address);

  const Treasury = await hre.ethers.getContractFactory('treasury');
  const treasur = await Treasury.deploy();

  await treasur.deployed();

  console.log('Treasury deployed to:', treasur.address);

  await treasur.transferOwnership(timeLock.address);

  await NFT.safeMint(vote1.address);
  await NFT.safeMint(vote2.address);
  await NFT.safeMint(vote3.address);
  await NFT.safeMint(vote4.address);

  await NFT.connect(vote1).delegate(vote1.address);
  await NFT.connect(vote2).delegate(vote2.address);
  await NFT.connect(vote3).delegate(vote3.address);
  await NFT.connect(vote4).delegate(vote4.address);

  await timeLock.grantRole(await timeLock.PROPOSER_ROLE(), governance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
