# DAO

## Contract: NFT.sol

- Contract deployed on [rinkeby test network](https://rinkeby.etherscan.io/address/0x7FCAf057B328e06602D6D5161f8Dc3AaAde48CEb#code) at:

```script
0x7FCAf057B328e06602D6D5161f8Dc3AaAde48CEb
```

This contract deploys an **ERC20 token with voting rights**.

- Name: "NFMyNftTokenT"
- Symbol: "MTK"

- This ERC721 token will be used to vote on proposals created in the DAO contract.

- There is no initial supply, but the contract owner can call the **mint()** function to mint tokens to an address.
It takes the address and the amount of tokens to mint as arguments.

- Users would need to call **delegate()** function and pass their own address as argument in order to create a snapshot of their voting power, as only holding the tokens does not give an address the equivalent voting power.

---

## Contract: Treasury.sol
- Contract deployed on [rinkeby test network]https://rinkeby.etherscan.io/address/0xbad6540C58B56a49A169C802d114151CFc377DA8) at:

```script
0xbad6540C58B56a49A169C802d114151CFc377DA8
```

- This contract will hold ether and ERC721 tokens and will be used to send ether or ERC721 tokens as donation to charities.

- The members of the DAO can create a proposal where they can specify the receiving address and the amount of ether/ ERC721 token to send as donation.

- If the DAO members pass in favor of the proposal, then the said amount will be sent to the charity address.

- The TimeLock contract is given the ownership of this contract, so that the only way of moving funds out is by creating a proposal and passing it.

---

## Contract: TimeLock.sol

- Contract deployed on [rinkeby test network](https://rinkeby.etherscan.io/address/0xd918976B11C80cce43Fc8C45AF779ee178E6d723) at:

```script
0xd918976B11C80cce43Fc8C45AF779ee178E6d723
```

- This contract is set as the **owner of the Treasury contract**.

- It sets a minimum delay time(number of blocks), that a passed proposal has to wait before getting executed.

- The DAO contract is set as the only PROPOSER, which means that only the DAO contract can suggest this contract to do a transaction through the Treasury contract.

- The Null Address is set as the EXECUTOR, which gives each and every address the right to execute a passed proposal, given that it has waited out the proposed delay time.

---

## Contract: Governance.sol

- Contract deployed on [rinkeby test network](https://rinkeby.etherscan.io/address/0xCb4E78d7193470A15D06eee7D51eEa44C723c0A0#code) at:

```script
0xCb4E78d7193470A15D06eee7D51eEa44C723c0A0
```

- This contract creates the DAO ecosystem in which an user can create a proposal and vote on it using the ERC20 BlazeToken.

- Users can create a proposal, cancel it, vote on it, queue it and execute it.

- The proposal stages are as follows:

```script
    Number          Stage

    0               Pending
    1               Active
    2               Canceled
    3               Defeated
    4               Succeeded
    5               Queued
    6               Expired
    7               Executed
```

---

- An user can interact with the **proposal()** function to create a new proposal, which returns the proposal id of the newly created proposal.

- Users can interact with the **castVote()** function to cast their vote on a proposal. It takes 2 arguments, the proposal id and user's choice.

- User has 3 choices when voting:

```script
    Choice      Meaning

    0           Against the proposal
    1           For/ In favor of the proposal
    2           Abstain
```

- If the proposal passes, then any user can interact with the **queue()** function to queue the proposal for execution.

- After that, when the delay period has passed, any user can interact with the **execute()** function which will execute the proposal and the funds will be sent to the charity.

---
---

### Screenshots

- NFT Contract Deploying and delegating the authority.

<img width="1440" alt="Screenshot 2022-08-04 at 12 20 23 AM" src="https://user-images.githubusercontent.com/86094155/182686904-d6430f0e-9e12-47a7-978a-ceca9098a5a8.png">


- Calling The Grant role to TimeLock Contract
<img width="1440" alt="Screenshot 2022-08-04 at 12 25 04 AM" src="https://user-images.githubusercontent.com/86094155/182687321-d58f6464-0112-4b14-8af1-5963100ac983.png">


- Creating a Proposal in The Governacne Contract
<img width="1440" alt="Screenshot 2022-08-04 at 12 25 55 AM" src="https://user-images.githubusercontent.com/86094155/182687448-7173bb15-45ea-4f8c-b3fb-265283115112.png">


- Casting The Vote For The Proposal
<img width="1440" alt="Screenshot 2022-08-04 at 12 27 11 AM" src="https://user-images.githubusercontent.com/86094155/182687646-322b2c8e-ac7c-4fb3-a942-60065717c66b.png">


- Queueing The Proposal
<img width="1440" alt="Screenshot 2022-08-04 at 12 28 25 AM" src="https://user-images.githubusercontent.com/86094155/182687862-456bd177-cd44-4c6d-89b0-d2f790b0546e.png">


- Executing The Proposal
<img width="1440" alt="Screenshot 2022-08-04 at 12 29 12 AM" src="https://user-images.githubusercontent.com/86094155/182688002-fecd0d08-dd66-4e49-973c-9110117d2f80.png">



### Example Proposal

- Created a proposal to buy an estate.
- Voting was done and the proposal passed.
- Then it was queued for execution.
- After that, the proposal was executed and Actions were taken with the voting medium being an NFT.

---

### Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case.

```shell
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```