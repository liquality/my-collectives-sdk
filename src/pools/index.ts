import {Collective__factory} from "../types/typechain-types/factories/contracts/core/Collective__factory"
import {MockTokenContract__factory} from "../types/typechain-types/factories/contracts/mock/MockTokenContract__factory"
import {CMetadata, MintParam, SupportedPlatforms} from "../types/types"
import { ethers } from "ethers";
import {AppConfig} from "../config"
import { Transaction } from "@biconomy/core-types"
import {buildUserOperation} from "../libs/userOp"
import * as ethers5 from 'ethers5';
import { CWallet__factory } from "../types/typechain-types/factories/contracts/core/CWallet__factory"
import { Pool__factory } from "../types/typechain-types"
import * as zoraMint from "../libs/external/zoraMint"
import * as biconomyBundler from "../libs/bundlers/biconomy"
import * as pimlicoBundler from "../libs/bundlers/pimlico"

// Create the pool module of the sdk
export class Pool {
    // implement mint function to mint on contract
    public static async mint(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, mintParam: MintParam) {
        const signer = caller.getSigner();

        const tokenMintCallData = await this.getTokenMintCallData(caller, cMetadata, mintParam);
        const recordPoolMintCallData = this.getRecordPoolMintCallData(mintParam);

        // Create user operation Tx
        let userOpTx:Transaction[] = [
            {
                to: ethers5.utils.getAddress(mintParam.tokenContract),
                data: tokenMintCallData,
                value: mintParam.amount,
            },
            {
                to: ethers5.utils.getAddress(cMetadata.address),
                data: recordPoolMintCallData,
                value: 0,
            }
        ]

        const userOperation = await buildUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)
        console.log("built userOperation >>>> ", userOperation)

        // depositTo cwallet by signer if amount > 0
        const cWalletContract = new ethers5.Contract(cMetadata.wallet, CWallet__factory.abi, signer)
        console.log("cWallet balance >>>> ", ethers.formatEther(await cWalletContract.balance(await signer.getAddress())))
        if (mintParam.amount > 0) {
            const tx = await cWalletContract.depositTo(await signer.getAddress(), {value: mintParam.amount})
            await tx.wait()
        }
        console.log("cWallet balance >>>> ", ethers.formatEther(await cWalletContract.balance(await signer.getAddress())))
        const tx = await pimlicoBundler.send(userOperation, signer)

        return {tx};
    }

    // // distributeReward in pool contract
    // public static async distributeReward(caller: ethers5.providers.Web3Provider, pools: string[]) {
    //     try {
    //         const signer = caller.getSigner();

    //         // get distributeReward call data for pool
    //         const distributeRewardCallData = this.getPoolDistributeRewardCallData()

    //         for (const pool of pools) {
    //             // Create user operation Tx
    //             const userOpTx:Transaction[] = [
    //                 {
    //                     to: ethers5.utils.getAddress(pool),
    //                     data: distributeRewardCallData,
    //                     value: 0,
    //                 }
    //             ]
    //             const userOperation = await buildUserOperation(signer, AppConfig.getWallet(), AppConfig.getNonceKey(), "", userOpTx)
    //             console.log("built userOperation >>>> ", userOperation)
    //             // sende userOps
    //             const tx = await pimlicoBundler.send(userOperation, await signer.getChainId())
    //             console.log("tx >> ", tx)
    //         }

    //         const poolContract = Pool__factory.connect(pool, caller)
    //         const tx = await poolContract.distributeReward(reward);
    //         await tx.wait();
            
    //         return {poolContract, reward, tx}
            
    //     } catch (error) {
    //         console.log("error distributeReward >>>> ", error)
    //         throw error;
    //     }
    // }

    // getParticipation
    public static async getParticipation(caller: ethers5.providers.Web3Provider, pool: string, member: string) {
        const poolContract = Pool__factory.connect(pool, AppConfig.getProvider());
        const participation = await poolContract.participantData(member);
        return participation;
    }

    // getTokenMintCallData by platform
    private static async getTokenMintCallData(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, mintParam: MintParam) {
        // const mintCallData = MockTokenContract__factory.createInterface().encodeFunctionData("mint", [mintParam.recipient, mintParam.tokenID]);
        // return mintCallData;
        switch(mintParam.platform) {
            case SupportedPlatforms.Zora:
                return await zoraMint.callData(caller, cMetadata, mintParam);
            default:
                throw new Error("Platform not supported");
        }
    }

    // getRecordPoolMintCallData implementation
    private static getRecordPoolMintCallData(mintParam: MintParam) {
        const mintCallData = new ethers5.utils.Interface(Collective__factory.abi).encodeFunctionData("recordPoolMint", [mintParam.poolAddress, mintParam.recipient, mintParam.tokenID, mintParam.quantity, mintParam.amount]);
        return mintCallData;
    }

    private static getPoolDistributeRewardCallData() {
        const distributeRewardCallData = Pool__factory.createInterface().encodeFunctionData("distributeReward");
        return distributeRewardCallData;
    }

}   