const { ethers } = require("hardhat");
const { NFT_ADDRESS } = require("./addresses");

async function main() {
 const [owner, proposer, vote1] = await ethers.getSigners();

 const NFT = await ethers.getContractFactory("NFT");
 const nft = await GovernToken.attach(NFT_ADDRESS);

 // minting nft to the accounts
 await nft.safeMint(owner.address, "ipfs://https://ipfs.io/ipfs/Qmduj4VjKMMWRLwxcrHugxCTWD1cZ66iiKTeW2JGRZtY9u/");
 await nft.safeMint(proposer.address, "https://ipfs.io/ipfs/QmW3FgNGeD46kHEryFUw1ftEUqRw254WkKxYeKaouz7DJA");
 await nft.safeMint(vote1.address, "https://cloudflare-ipfs.com/ipfs/Qmep61aZqJhhmSkhQHUSUme5RFbi8ZfccxXC1TyjKHcEig");

 console.log(`Minting NFT to users`);

 await nft.connect(owner).delegate(owner.address);
 await nft.connect(proposer).delegate(proposer.address);
 await nft.connect(vote1).delegate(vote1.address);

 console.log(`Delegated NFT to users`);
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });