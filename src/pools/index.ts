import {Collective__factory} from "../types/typechain-types/factories/contracts/core/Collective__factory"
import {MockTokenContract__factory} from "../types/typechain-types/factories/contracts/mock/MockTokenContract__factory"
import {CMetadata, MintParam, SupportedPlatforms} from "../types/types"
import { ethers } from "ethers";
import {AppConfig} from "../config"
import { Transaction } from "@biconomy/core-types"
import {buildAndSendUserOperation, buildUserOperation} from "../libs/userOp"
import * as ethers5 from 'ethers5';
import { CWallet__factory } from "../types/typechain-types/factories/contracts/core/CWallet__factory"
import { Pool__factory } from "../types/typechain-types"
import * as zoraMint from "../libs/external/zoraMint"
import * as biconomyBundler from "../libs/AAProviders/biconomyProvider"
import * as pimlicoBundler from "../libs/AAProviders/pimlicoProvider"
import { requireSupportedChain } from "../libs/utils";
import { AAProviderFactory } from "../libs/AAProviders/providerFactory";

// Create the pool module of the sdk
export class Pool {
    // implement mint function to mint on contract
    public static async mint(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, mintParam: MintParam) {
       try {
            requireSupportedChain((await caller.getNetwork()).chainId);
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

            // depositTo cwallet by signer if amount > 0
            const cWalletContract = new ethers5.Contract(cMetadata.wallet, CWallet__factory.abi, signer)
            if (mintParam.amount > 0) {
                const tx = await cWalletContract.depositTo(await signer.getAddress(), {value: mintParam.amount})
                await tx.wait()
            }
            const userOpsProvider = AAProviderFactory.get(signer)
            const tx = await userOpsProvider.send(userOperation, signer)

            return tx;
       } catch (error) {
            console.log("POOL__mint error >>>> ", error)
            throw error;
       }
    }

    // distributeReward across pools in a collective contract
    public static async distributeRewards(privateKey: string, cMetadata: CMetadata, pools: string[]) {
        try {
            const signer = new ethers5.Wallet(privateKey);
            requireSupportedChain((await signer.provider.getNetwork()).chainId);

            // get distributeReward call data for pool
            const distributeRewardCallData = this.getPoolDistributeRewardCallData()
            const userOpTxs : Transaction[] = []

            for (const pool of pools) {
                // Create user operation Tx
                userOpTxs.push({
                    to: ethers5.utils.getAddress(pool),
                    data: distributeRewardCallData,
                    value: 0,
                })
            }
            const tx = await buildAndSendUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTxs)

            return tx
            
        } catch (error) {
            console.log("POOL__distributeReward error >>>> ", error)
            throw error;
        }
    }

    // withdraw reward across pools in a collective contract
    public static async withdrawRewards(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, pools: string[], participant: string) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
            const signer = caller.getSigner();

            // get withdrawReward call data for pool
            const withdrawRewardCallData = this.getPoolWithdrawRewardCallData(participant)
            const userOpTxs : Transaction[] = []

            for (const pool of pools) {
                // Create user operation Tx
                userOpTxs.push({
                    to: ethers5.utils.getAddress(pool),
                    data: withdrawRewardCallData,
                    value: 0,
                })
            }
            const tx = await buildAndSendUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTxs)
            return tx
            
        } catch (error) {
            console.log("POOL__withdrawReward error >>>> ", error)
            throw error;
        }
    }

    //getPoolReward from pool contract
    public static async getPoolReward(pool: string) {
        const poolContract = new ethers5.Contract(pool, Pool__factory.abi, AppConfig.PROVIDER);
        const reward = ethers5.utils.formatEther(await poolContract.poolReward());
        return reward;
    }

    // getTotalContributions from pool contract
    public static async getTotalContributions(pool: string) {
        const poolContract = new ethers5.Contract(pool, Pool__factory.abi, AppConfig.PROVIDER);
        const totalContributions = Number(await poolContract.totalContributions());
        return totalContributions;
    }

    // getParticipantsCount from pool contract
    public static async getParticipantsCount(pool: string) {
        const poolContract = new ethers5.Contract(pool, Pool__factory.abi, AppConfig.PROVIDER);
        const participantsCount = await poolContract.getParticipantsCount();
        return participantsCount;
    }

    // getPoolInfo from pool contract
    public static async getPoolInfo(pool: string) {
        const poolContract = new ethers5.Contract(pool, Pool__factory.abi, AppConfig.PROVIDER);
        const poolInfo = await poolContract.getPoolInfo();
        return {tokenContract: poolInfo[0], poolReward: poolInfo[1], rewardDistributed: poolInfo[2], totalContributions: poolInfo[3], isRewardReceived: poolInfo[4], isDistributed: poolInfo[5]};
    }

    // Check if pool isActive from pool contract
    public static async isActive(pool: string) {
        const poolContract = new ethers5.Contract(pool, Pool__factory.abi, AppConfig.PROVIDER);
        const isActive = await poolContract.isPoolActive();
        return isActive;
    }

    // check if pool reward isDistributed from pool contract
    public static async isRewardDistributed(pool: string) {
        const poolContract = new ethers5.Contract(pool, Pool__factory.abi, AppConfig.PROVIDER);
        const isRewardDistributed = await poolContract.isDistributed();
        return isRewardDistributed;
    }

    // check if pool reward has been received
    public static async isRewardReceived(pool: string) {
        const poolContract = new ethers5.Contract(pool, Pool__factory.abi, AppConfig.PROVIDER);
        const isRewardReceived = await poolContract.isRewardReceived();
        return isRewardReceived;
    }

    // getPoolParticipants from pool contract, and fetch the participantData for each participant
    public static async getPoolParticipants(caller: ethers5.providers.Web3Provider, pool: string) {
        const poolContract = new ethers5.Contract(pool, Pool__factory.abi, AppConfig.PROVIDER);
        const participants = await poolContract.getParticipants();
        const participantData = []
        for (const participant of participants) {
            const participation = await this.getParticipation(pool, participant);
            participantData.push({participant, participation});
        }
        return participantData;
    }


    // getParticipation
    public static async getParticipation(pool: string, member: string) {
        const poolContract = new ethers5.Contract(pool, Pool__factory.abi, AppConfig.PROVIDER);
        const participation = await poolContract.participantData(member);
        return {participant:participation[0], contribution: participation[1], reward: participation[2], rewardAvailable: participation[3]};
    }

    // getTokenMintCallData by platform
    private static async getTokenMintCallData(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, mintParam: MintParam) {
        switch(mintParam.platform) {
            case SupportedPlatforms.ZORA:
                return await zoraMint.callData(caller, cMetadata, mintParam);
            case SupportedPlatforms.LOCAL:
                return MockTokenContract__factory.createInterface().encodeFunctionData("mint", 
                [mintParam.recipient]);
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

    // getPoolWithdrawRewardCallData
    private static getPoolWithdrawRewardCallData(participant: string) {
        const withdrawRewardCallData = new ethers.Interface(Pool__factory.abi).encodeFunctionData("withdrawReward",[participant]);
        return withdrawRewardCallData;
    }

}   