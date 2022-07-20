const { ethers } = require('hardhat');
const hre = require('hardhat');

const {
  GOVERNANCE_ADDRESS,
  PROPOSAL_ID,
  LOCKER_ADDRESS,
} = require('./addresses.js');

// const GOVERNANCE_ADDRESS = '0x909E998d915407E4ab5672E1334aB4f73cDf9488';
// const LOCKER_ADDRESS = '0x256882400658CD84a6B4A2B1DEB808388C27dfA9';

// const PROPOSAL_ID =
// '56113563753341013731983306774901785774420486508700703586225127738144427976804';

async function main() {
  [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
    await ethers.getSigners();

  const Governance = await hre.ethers.getContractFactory('Governance');
  const governance = await Governance.attach(GOVERNANCE_ADDRESS);

  const Locker = await hre.ethers.getContractFactory('Locker');
  const locker = await Locker.attach(LOCKER_ADDRESS);

  await governance.connect(vote1).castVote(PROPOSAL_ID, 1);
  await governance.connect(vote2).castVote(PROPOSAL_ID, 1);
  await governance.connect(vote3).castVote(PROPOSAL_ID, 1);
  await governance.connect(vote4).castVote(PROPOSAL_ID, 1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
