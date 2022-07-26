# DAO

## Contract: NFT.sol

- Contract deployed on [rinkeby test network](https://rinkeby.etherscan.io/address/0xB1939a05948BC187FEA0534977950eE90109A0d8) at:

```script
0xB1939a05948BC187FEA0534977950eE90109A0d8
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
- Contract deployed on [rinkeby test network] https://rinkeby.etherscan.io/address/0x045406BA1e57fD0d30B75bF311d23e2A9bcEfE59) at:

```script
0x045406BA1e57fD0d30B75bF311d23e2A9bcEfE59
```

- This contract will hold ether and ERC721 tokens and will be used to send ether or ERC721 tokens as donation to charities.

- The members of the DAO can create a proposal where they can specify the receiving address and the amount of ether/ ERC721 token to send as donation.

- If the DAO members pass in favor of the proposal, then the said amount will be sent to the charity address.

- The TimeLock contract is given the ownership of this contract, so that the only way of moving funds out is by creating a proposal and passing it.

---

## Contract: TimeLock.sol

- Contract deployed on [rinkeby test network](https://rinkeby.etherscan.io/address/0x891a3B9fBbD3D6f926f71C38b03F112A9358dF43) at:

```script
0x891a3B9fBbD3D6f926f71C38b03F112A9358dF43
```

- This contract is set as the **owner of the Treasury contract**.

- It sets a minimum delay time(number of blocks), that a passed proposal has to wait before getting executed.

- The DAO contract is set as the only PROPOSER, which means that only the DAO contract can suggest this contract to do a transaction through the Treasury contract.

- The Null Address is set as the EXECUTOR, which gives each and every address the right to execute a passed proposal, given that it has waited out the proposed delay time.

---

## Contract: Governance.sol

- Contract deployed on [rinkeby test network](https://rinkeby.etherscan.io/address/0x4C6048651dE6d71af045FBA709709C3437a223d9) at:

```script
0x4C6048651dE6d71af045FBA709709C3437a223d9
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

<img width="1440" alt="Screenshot 2022-07-25 at 3 36 34 PM" src="https://user-images.githubusercontent.com/86094155/180752497-f1890326-8494-4d8d-97fd-d9d06b667252.png">

- Calling The Grant role to TimeLock Contract
<img width="1440" alt="Screenshot 2022-07-25 at 3 36 34 PM" src="https://user-images.githubusercontent.com/86094155/180752775-061ff104-dc9a-4a1d-b8f2-a363a05bbbac.png">

- Creating a Proposal in The Governacne Contract
<img width="1440" alt="Screenshot 2022-07-25 at 3 39 55 PM" src="https://user-images.githubusercontent.com/86094155/180753067-960cd252-3e92-4531-9770-3d1b691fe73f.png">

- Casting The Vote For The Proposal
<img width="1440" alt="Screenshot 2022-07-25 at 3 41 15 PM" src="https://user-images.githubusercontent.com/86094155/180753304-52841573-423b-4d10-8af9-0a7d6c2e9da5.png">

- Queueing The Proposal
<img width="1440" alt="Screenshot 2022-07-25 at 3 42 44 PM" src="https://user-images.githubusercontent.com/86094155/180753595-805c9415-a4fe-4b68-91ce-0863063802b9.png">

- Executing The Proposal
<img width="1440" alt="Screenshot 2022-07-25 at 3 43 48 PM" src="https://user-images.githubusercontent.com/86094155/180753711-54d86174-99a7-4d9e-900f-1e30f804860e.png">


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