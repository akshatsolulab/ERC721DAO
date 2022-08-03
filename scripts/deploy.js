const hre = require('hardhat');

async function main() {
  [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
    await ethers.getSigners();

  const NFT = await hre.ethers.getContractFactory('NFT');
  const NFTCont = await NFT.deploy();

  await NFTCont.deployed();

  console.log('NFT deployed to:', NFTCont.address);

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
    NFTCont.address,
    timeLock.address
  );

  await governance.deployed();

  console.log('Governance deployed to:', governance.address);

  const Treasury = await hre.ethers.getContractFactory('treasury');
  const treasur = await Treasury.deploy();

  await treasur.deployed();

  console.log('Treasury Contract deployed to:', treasur.address);

  await treasur.transferOwnership(timeLock.address);

  await NFTCont.safeMint(vote1.address,"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg");
  await NFTCont.safeMint(vote2.address,"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg");
  await NFTCont.safeMint(vote3.address,"https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80");
  await NFTCont.safeMint(vote4.address,"https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHdvcmt8ZW58MHx8MHx8&w=1000&q=80");

  await NFTCont.connect(vote1).delegate(vote1.address);
  await NFTCont.connect(vote2).delegate(vote2.address);
  await NFTCont.connect(vote3).delegate(vote3.address);
  await NFTCont.connect(vote4).delegate(vote4.address);

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
