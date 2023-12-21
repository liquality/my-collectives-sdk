import {HoneyPot__factory} from "../types/typechain-types/factories/contracts/core/HoneyPot__factory"
import {HoneyPotFactory__factory} from "../types/typechain-types/factories/contracts/fatories/HoneyPotFactory__factory"
import {HONEY_POT_FACTORY_ADDRESS} from "../libs/constants"
import {CMetadata} from "../types/types"
import { ethers } from "ethers";
import {AppConfig} from "../config"
import { Transaction } from "@biconomy/core-types"
import {buildUserOperation} from "../libs/userOp"
import * as ethers5 from 'ethers5';
import * as pimlicoBundler from "../libs/bundlers/pimlico"
import * as biconomyBundler from "../libs/bundlers/biconomy"

// Create the HoneyPot module of the sdk
export class HoneyPot {

    // get honeyPot address
    public static async get(caller: ethers5.providers.Web3Provider, salt : ethers.BigNumberish, tokenContract: string) {
        try {
            const signer = caller.getSigner();
    
            // Get honeyPot factory
            const cFactory = this.getHoneyPotFactory(signer);
            const operator = ethers.Wallet.fromPhrase(AppConfig.OPERATOR_MNEMONIC).address;

            // Get honeyPot address
            const hAddress = await cFactory.getHoneyPot(tokenContract, operator, ethers.toBigInt(salt));
            
            return {honeyPot: hAddress, tokenContract, salt}
        } catch (error) {
            console.log("error get honeyPot >>>> ", error)
            throw error;
            
        }
    
    }

    // create honeyPot contract
    public static async create(caller: ethers5.providers.Web3Provider, salt : ethers.BigNumberish, tokenContract: string) {
        try {
            const signer = caller.getSigner();
    
            // Get honeyPot factory
            const cFactory = this.getHoneyPotFactory(signer);
            const operator = ethers.Wallet.fromPhrase(AppConfig.OPERATOR_MNEMONIC).address;

            // Get honeyPot address
            const hAddress = await cFactory.getHoneyPot(tokenContract, operator, ethers.toBigInt(salt));
            // create honeyPot
            const tx = await cFactory.createHoneyPot(tokenContract, operator, ethers.toBigInt(salt));
            await tx.wait();
            
            return {honeyPot: hAddress, tokenContract, salt, tx}
            
        } catch (error) {
            console.log("error create honeyPot >>>> ", error)
            throw error;
        }
    }

    // setTopContributor in honeyPot contract
    public static async setTopContributor(caller: ethers5.providers.Web3Provider, honeyPotAddress: string, topContributor: string) {
        try {
            const signer = caller.getSigner();
    
            // Get honeyPot contract
            const honeyPot = new ethers5.Contract(honeyPotAddress, HoneyPot__factory.abi, caller)
            const tx = await honeyPot.setTopContributor(topContributor);
            await tx.wait();
            
            return {honeyPot, topContributor, tx}
            
        } catch (error) {
            console.log("error setTopContributor >>>> ", error)
            throw error;
        }
    }

    // sendReward in honeyPot contract
    public static async sendReward(caller: ethers5.providers.Web3Provider, cMetadata:CMetadata, honeyPotAddresses: string[]) {
        try {
            let userOpTx:Transaction[] = []
            const signer = caller.getSigner();

            const sendRewardCallData = this.getSendRewardCallData();

            for (const honeyPotAddress of honeyPotAddresses) {
                // get sendReward call data

                // Create user operation Tx
                userOpTx.push({
                        to: ethers5.utils.getAddress(honeyPotAddress),
                        data: sendRewardCallData,
                        value: 0,
                })
            }

            const userOperation = await buildUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)
            // send uerOps using pimlico
            const tx = await pimlicoBundler.send(userOperation, signer)
            
            return {tx}
            
        } catch (error) {
            console.log("error sendReward >>>> ", error)
            throw error;
        }
    }

    // getSendRewardCallData
    private static getSendRewardCallData() {
        const sendRewardCallData = HoneyPot__factory.createInterface().encodeFunctionData("sendReward");
        return sendRewardCallData
    }

    private static getHoneyPotFactory(caller : ethers5.ethers.providers.JsonRpcSigner) {
        const hFactory = new ethers5.Contract(HONEY_POT_FACTORY_ADDRESS, HoneyPotFactory__factory.abi, caller)
        return hFactory;
    }
}

