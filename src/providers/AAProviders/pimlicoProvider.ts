
import { ethers } from 'ethers';
import * as ethers5 from 'ethers5';
import { AppConfig } from '../../config';
import { IUserOperation, SupportedChains, TransactionResponse, Estimation, PaymasterEstimation } from '../../types/types';
import {CALL_GAS_LIMIT, ADDRESSES} from "../../libs/constants"
import {rpcCall} from "../../libs/utils"
import { queryReceipt } from '../../libs/userOp';
import { BaseProvider } from './baseProvider';

export class PimlicoProvider extends BaseProvider  {
    signer: ethers5.Signer

    constructor(signer: ethers5.Signer) {
        super()
        this.signer = signer
    }

    public async estimate(userOperation: IUserOperation) : Promise<Estimation> {
        try {
            
            const entryPoint = ADDRESSES[await this.signer.getChainId() as SupportedChains].entryPoint
            userOperation = this.formatUserOp(userOperation)
            const estimationResult = await rpcCall(await this.getRPC(), "eth_estimateUserOperationGas", [userOperation, entryPoint])

            let estimation: Estimation = {
                callGasLimit: ethers5.utils.hexlify(ethers5.BigNumber.from((Number(estimationResult.callGasLimit) + Number(CALL_GAS_LIMIT)).toString())),
                verificationGasLimit: ethers5.utils.hexlify(ethers5.BigNumber.from((Number(estimationResult.verificationGasLimit)+ Number(CALL_GAS_LIMIT)).toString())),
                preVerificationGas: ethers5.utils.hexlify(ethers5.BigNumber.from((Number(estimationResult.preVerificationGas)+ Number(CALL_GAS_LIMIT)).toString()))
            }

            return estimation
        } catch (error) {
            console.log("PIMLICO__estimate error >>>> ", error)
            throw error
        }
    }

    public async sponsor(userOperation: IUserOperation): Promise<PaymasterEstimation> {
        try {
            userOperation = this.formatUserOp(userOperation)
            const entryPoint = ADDRESSES[await this.signer.getChainId() as SupportedChains].entryPoint
            const estimationResult = await rpcCall(await this.getRPC(), "pm_sponsorUserOperation", [userOperation, entryPoint]) 
            
            let estimation: PaymasterEstimation = {
                paymasterAndData: estimationResult.paymasterAndData, 
                verificationGasLimit: ethers5.utils.hexlify(userOperation.verificationGasLimit), 
                callGasLimit: ethers5.utils.hexlify(userOperation.callGasLimit), 
                preVerificationGas: ethers5.utils.hexlify(userOperation.preVerificationGas)
            }

            return estimation
        } catch (error) {
            console.log("PIMLICO__sponsor error >>>> ", error)
            throw error
        }
    }
    
    public async send(userOperation: IUserOperation) : Promise<TransactionResponse> {
    try {
        const pimlicoEndpoint = await this.getRPC()
        const entryPoint = ADDRESSES[await this.signer.getChainId() as SupportedChains].entryPoint
        const userOpHash: string = await rpcCall(pimlicoEndpoint, "eth_sendUserOperation", [userOperation, entryPoint])
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