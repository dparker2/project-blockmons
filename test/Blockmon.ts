import { expect } from "chai";
import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { beforeEach } from "mocha";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

chai.use(solidity);

describe("Blockmon", () => {
    let blockmonContract: Contract;
    let owner: SignerWithAddress;
    let address1: SignerWithAddress;

    beforeEach(async () => {
        const blockmonFactory = await ethers.getContractFactory(
            "Blockmon"
        );
        [owner, address1] = await ethers.getSigners();
        blockmonContract = await blockmonFactory.deploy();
    });

    it("Should initialize the Bored Ape contract", async () => {
        expect(await blockmonContract.MAX_APES()).to.equal(10000);
    });

    it("Should set the right owner", async () => {
        expect(await blockmonContract.owner()).to.equal(await owner.address);
    });

    it("Should mint an ape", async () => {
        await blockmonContract.flipSaleState();
        const apePrice = await blockmonContract.apePrice();
        const tokenId = await blockmonContract.totalSupply();
        expect(
            await blockmonContract.mintApe(1, {
                value: apePrice,
            })
        )
            .to.emit(blockmonContract, "Transfer")
            .withArgs(ethers.constants.AddressZero, owner.address, tokenId);
    });
});