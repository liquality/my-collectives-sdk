import { HoneyPot__factory } from "../types/typechain-types/factories/contracts/core/HoneyPot__factory"
import { HoneyPotFactory__factory } from "../types/typechain-types/factories/contracts/fatories/HoneyPotFactory__factory"
import { ADDRESSES, OPERATOR } from "../libs/constants"
import { CMetadata, SupportedChains, TransactionResponse } from "../types/types"
import { ethers } from "ethers";
import { AppConfig } from "../config"
import { Transaction } from "@biconomy/core-types"
import { buildUserOperation } from "../libs/userOp"
import * as ethers5 from 'ethers5';
import * as pimlicoBundler from "../libs/bundlers/pimlico"
import * as biconomyBundler from "../libs/bundlers/biconomy"
import { requireSupportedChain } from "../libs/utils";

// Create the HoneyPot module of the sdk
export class HoneyPot {

    // get honeyPot address
    public static async get(caller: ethers5.providers.Web3Provider, salt: ethers.BigNumberish) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
            const signer = caller.getSigner();

            // Get honeyPot factory
            const hFactory = await this.getHoneyPotFactory(signer);

            // Get honeyPot address
            const honeyPot = await hFactory.getHoneyPot(OPERATOR, ethers.toBigInt(salt));

            return { honeyPot, salt }
        } catch (error) {
            console.log("error get honeyPot >>>> ", error)
            throw error;

        }

    }

    // create honeyPot contract
    public static async create(caller: ethers5.providers.Web3Provider, salt: ethers.BigNumberish) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
            const signer = caller.getSigner();

            // Get honeyPot factory
            const hFactory = await this.getHoneyPotFactory(signer);

            // Get honeyPot address
            const honeyPot = await hFactory.getHoneyPot(OPERATOR, ethers.toBigInt(salt));
            // create honeyPot
            const tx = await hFactory.createHoneyPot(OPERATOR, ethers.toBigInt(salt));
            await tx.wait();

            return {
                honeyPot, salt, tx:
                {
                    txHash: tx.hash,
                    status: (tx.confirmations > 1) ? "success" : "pending",
                    userOpHash: ""
                }
            }

        } catch (error) {
            console.log("error create honeyPot >>>> ", error)
            throw error;
        }
    }

    // setTopContributor in honeyPot contract
    public static async setTopContributor(privateKey: string, honeyPotAddress: string, topContributor: string): Promise<TransactionResponse> {
        try {
            // Create an ethers wallet from the private key
            const wallet = new ethers.Wallet(privateKey);
            const honeyPot = new HoneyPot__factory(wallet).attach(honeyPotAddress);
            const tx = await honeyPot.setTopContributor(topContributor).connect(wallet).wait();

            return {
                txHash: tx.hash,
                status: (tx.confirmations > 1) ? "success" : "pending",
                userOpHash: ""
            };

        } catch (error) {
            console.log("error setTopContributor >>>> ", error);
            throw error;
        }
    }

    // sendReward in honeyPot contract
    public static async sendReward(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, honeyPots: string[]) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
            let userOpTx: Transaction[] = []
            const signer = caller.getSigner();

            const sendRewardCallData = this.getSendRewardCallData();

            for (const honeyPot of honeyPots) {
                // Create user operation Tx
                userOpTx.push({
                    to: ethers5.utils.getAddress(honeyPot),
                    data: sendRewardCallData,
                    value: 0,
                })
            }

            const userOperation = await buildUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)
            const tx = await pimlicoBundler.send(userOperation, signer)

            return tx

        } catch (error) {
            console.log("error sendReward >>>> ", error)
            throw error;
        }
    }

    // getTopContributor from honeyPot contract
    public static async getTopContributor(honeyPotAddress: string) {
        try {

            // Get honeyPot contract
            const honeyPot = HoneyPot__factory.connect(honeyPotAddress, AppConfig.getProvider())
            const topContributor = await honeyPot.getTopContributor();

            return topContributor
        } catch (error) {
            console.log("error getTopContributor >>>> ", error)
            throw error;
        }
    }

    // getSendRewardCallData
    private static getSendRewardCallData() {
        const sendRewardCallData = HoneyPot__factory.createInterface().encodeFunctionData("sendReward");
        return sendRewardCallData
    }

    private static async getHoneyPotFactory(signer: ethers5.ethers.providers.JsonRpcSigner) {
        const honeyPot = ADDRESSES[await signer.getChainId() as SupportedChains].honeyPotFactory
        const hFactory = new ethers5.Contract(honeyPot, HoneyPotFactory__factory.abi, signer)
        return hFactory;
    }
}

