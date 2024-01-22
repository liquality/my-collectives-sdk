import { Estimation, IUserOperation, PaymasterEstimation, TransactionResponse } from "../../types/types"
import * as ethers5 from "ethers5"
import { IAAProvider } from "./IAAProvider"


export abstract class BaseProvider implements IAAProvider { 

    public abstract sponsor(userOperation: IUserOperation): Promise<PaymasterEstimation>;
      
    public abstract send(userOperation: IUserOperation) : Promise<TransactionResponse>;
    
    public abstract getFeeData(): Promise<ethers5.providers.FeeData>;
    
    public static formatUserOp(userOperation: IUserOperation): IUserOperation {
        userOperation.callGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.callGasLimit))
        userOperation.verificationGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.verificationGasLimit))
        userOperation.preVerificationGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.preVerificationGas))
        userOperation.maxFeePerGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.maxFeePerGas))
        userOperation.maxPriorityFeePerGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.maxPriorityFeePerGas))
        return userOperation
    }

    public getRPC(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve("getRPC not implemented on provider")
        })
    }

}