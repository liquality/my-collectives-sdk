
import {  PaymasterMode } from "@biconomy/paymaster";
import { IUserOperation, SupportedChains, TransactionResponse, Estimation, PaymasterEstimation } from '../../types/types';
import {ADDRESSES, CALL_GAS_LIMIT} from "../../libs/constants"
import * as ethers5 from 'ethers5';
import { IBundler, Bundler } from "@biconomy/bundler";
import { AppConfig } from "../../config";
import { rpcCall } from "../../libs/utils"; 
import { queryReceipt } from "../../libs/userOp";
import { BaseProvider } from "./baseProvider";


export class BiconomyProvider extends BaseProvider {

    signer: ethers5.Signer

    constructor(signer: ethers5.Signer) {
        super()
        this.signer = signer
    }

    public async estimate(userOperation: IUserOperation): Promise<Estimation> {
        try {
            const chainId = await this.signer.getChainId()
            const bundler =  this.getBundler(chainId)
    
            let estimations = await bundler.estimateUserOpGas(userOperation)
            estimations.callGasLimit = (Number(estimations.callGasLimit) + Number(CALL_GAS_LIMIT)).toString()
            estimations.verificationGasLimit = (Number(estimations.verificationGasLimit)+ Number(CALL_GAS_LIMIT)).toString()
            estimations.preVerificationGas = (Number(estimations.preVerificationGas)+ Number(CALL_GAS_LIMIT)).toString()
            
    
            return {verificationGasLimit: estimations.verificationGasLimit, callGasLimit: estimations.callGasLimit, preVerificationGas: estimations.preVerificationGas}
        } catch (error) {
          console.log("BICONOMY__send error >>>> ", error)
          throw error
        }
    }
      
    public async sponsor(userOperation: IUserOperation): Promise<PaymasterEstimation> {
        try {
          // Sponsorship params
          const partialUserOperation = {
            sender: userOperation.sender,
            nonce: userOperation.nonce,
            initCode: userOperation.initCode,
            callData: userOperation.callData,
            callGasLimit: userOperation.callGasLimit,
            verificationGasLimit: userOperation.verificationGasLimit,
            preVerificationGas: userOperation.preVerificationGas,
            maxFeePerGas: userOperation.maxFeePerGas,
            maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
          }
          const paymasterServiceData = {
            mode: PaymasterMode.SPONSORED,
            calculateGasLimits: false,
            expiryDuration: 300, //5mins
            sponsorshipInfo: {
                webhookData: {},
                smartAccountInfo: {
                    name: "BICONOMY",
                    version: "1.0.0"
                }
            }
          }
    
          const estimationResult = await rpcCall(AppConfig.BICONOMY_PAYMASTER, "pm_sponsorUserOperation", 
            [partialUserOperation, paymasterServiceData])
            
            let estimation: PaymasterEstimation = {
                paymasterAndData: estimationResult.paymasterAndData, 
                verificationGasLimit: ethers5.utils.hexlify(estimationResult.verificationGasLimit), 
                callGasLimit: ethers5.utils.hexlify(estimationResult.callGasLimit), 
                preVerificationGas: ethers5.utils.hexlify(estimationResult.preVerificationGas)
            }

            return estimation
    
        } catch (error) {
          console.log("BICONOMY__sponsor error >>>> ", error)
          throw error
        }
    }
      
    public async send(userOperation: IUserOperation) : Promise<TransactionResponse> {
    try {
        const entryPoint = ADDRESSES[await this.signer.getChainId() as SupportedChains].entryPoint
        const result = await rpcCall(await this.getRPC(), "eth_sendUserOperation", [
            userOperation,
            entryPoint,
            {
                "simulation_type": "validation"
            }
        ]) 
        if (!result) {
            throw new Error("Transaction failed to send")
        }
        const receipt = await queryReceipt(await this.getRPC(), result.userOpHash)
    
        if (receipt === null) {
            return {
                userOpHash: result.userOpHash, 
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
        console.log("BICONOMY__send error >>>> ", error)
        throw error
    }
    }
    
    public async getFeeData(): Promise<ethers5.providers.FeeData>  {
        try {
            const bundler =  this.getBundler(await this.signer.getChainId())
            const fee = await bundler.getGasFeeValues()
            return {
                maxFeePerGas: ethers5.BigNumber.from(fee.maxFeePerGas),
                maxPriorityFeePerGas: ethers5.BigNumber.from(fee.maxPriorityFeePerGas),
                gasPrice: null,
                lastBaseFeePerGas: null
            }
        } catch (error) {
            console.log("BICONOMY__getFeeData error >>>> ", error)
            throw error 
        }
    }
    
    public async getRPC(): Promise<string> {
        return `https://bundler.biconomy.io/api/v2/${await this.signer.getChainId()}/${AppConfig.BICONOMY_BUNDLER_API_KEY}`
    }
    
    private getBundler(chainId: number):  IBundler {
        const bundler: IBundler = new Bundler({
            bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId}/${AppConfig.BICONOMY_BUNDLER_API_KEY}`,     
            chainId,
            entryPointAddress: ADDRESSES[chainId as SupportedChains].entryPoint,
        })
        return bundler
    }
    
}