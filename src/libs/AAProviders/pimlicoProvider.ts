
import { ethers } from 'ethers';
import * as ethers5 from 'ethers5';
import { AppConfig } from '../../config';
import { IUserOperation, SupportedChains, TransactionResponse, Estimation } from '../../types/types';
import {CALL_GAS_LIMIT, ADDRESSES} from "../constants"
import {rpcCall} from "../utils"
import { queryReceipt } from '../userOp';
import { BaseProvider } from './baseProvider';

export class PimlicoProvider extends BaseProvider  {
    signer: ethers5.Signer

    constructor(signer: ethers5.Signer) {
        super()
        this.signer = signer
    }

    public async estimate(userOperation: IUserOperation, signer: ethers5.Signer) {
        try {
            const entryPoint = ADDRESSES[await signer.getChainId() as SupportedChains].entryPoint
            userOperation = this.formatUserOp(userOperation)
            const estimations = await rpcCall(await this.getRPC(), "eth_estimateUserOperationGas", [userOperation, entryPoint])
            estimations.callGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from((Number(estimations.callGasLimit) + Number(CALL_GAS_LIMIT)).toString()))
            estimations.verificationGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from((Number(estimations.verificationGasLimit)+ Number(CALL_GAS_LIMIT)).toString()))
            estimations.preVerificationGas = ethers5.utils.hexlify(ethers5.BigNumber.from((Number(estimations.preVerificationGas)+ Number(CALL_GAS_LIMIT)).toString()))

            return estimations
        } catch (error) {
        console.log("PIMLICO__estimate error >>>> ", error)
        throw error
        }
    }

    public async sponsor(userOperation: IUserOperation, signer: ethers5.Signer): Promise<Estimation> {
        try {
            userOperation = this.formatUserOp(userOperation)
            const entryPoint = ADDRESSES[await signer.getChainId() as SupportedChains].entryPoint
            const estimations = await rpcCall(await this.getRPC(), "pm_sponsorUserOperation", [userOperation, entryPoint])
            return {paymasterAndData: estimations.paymasterAndData, verificationGasLimit: estimations.verificationGasLimit, callGasLimit: estimations.callGasLimit, preVerificationGas: estimations.preVerificationGas}
        } catch (error) {
            console.log("PIMLICO__sponsor error >>>> ", error)
            return {paymasterAndData: "", verificationGasLimit: BigInt(0), callGasLimit: BigInt(0), preVerificationGas: BigInt(0)}
        }
    }
    
    public async send(userOperation: IUserOperation) : Promise<TransactionResponse> {
    try {
        const pimlicoEndpoint = await this.getRPC()
        const entryPoint = ADDRESSES[await this.signer.getChainId() as SupportedChains].entryPoint
        const userOpHash = await rpcCall(pimlicoEndpoint, "eth_sendUserOperation", [userOperation, entryPoint])
        if (!userOpHash) {
            throw new Error("Transaction failed to send")
        }
        const receipt = await queryReceipt(pimlicoEndpoint, userOpHash)

        if (!receipt) {
            return {
                userOpHash, 
                status: "pending",
                txHash: ""
            }
        }
        return {
            txHash: receipt.receipt.transactionHash,
            userOpHash: receipt.userOpHash,
            status: (receipt.success)? "success" : "failed",
        }
        
    } catch (error) {
        console.log("PIMLICO__send error >>>> ", error)
        throw error
    }
    }

    public async getFeeData(): Promise<ethers5.providers.FeeData>  {
        try {
            return await AppConfig.getProvider().getFeeData()
        } catch (error) {
            console.log("PIMLICO__getFeeData error >>>> ", error)
            throw error 
        }
    }

    public async getRPC(): Promise<string> {
        const networkName = (await this.signer.provider?.getNetwork())?.name;
        return `https://api.pimlico.io/v1/${networkName === "maticmum" ? "mumbai" : networkName}/rpc?apikey=${AppConfig.PIMLICO_API_KEY}`;
    }

    private formatUserOp(userOperation: IUserOperation): IUserOperation {
        userOperation.callGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.callGasLimit))
        userOperation.verificationGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.verificationGasLimit))
        userOperation.preVerificationGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.preVerificationGas))
        userOperation.maxFeePerGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.maxFeePerGas))
        userOperation.maxPriorityFeePerGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.maxPriorityFeePerGas))
        return userOperation
    }
}