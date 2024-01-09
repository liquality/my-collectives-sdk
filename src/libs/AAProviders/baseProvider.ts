import { Estimation, IUserOperation, TransactionResponse } from "../../types/types"
import * as ethers5 from "ethers5"
import { IAAProvider } from "./IAAProvider"


export abstract class BaseProvider implements IAAProvider{ 

    public abstract estimate(userOperation: IUserOperation, signer: ethers5.Signer): Promise<Estimation>;
    
    public abstract sponsor(userOperation: IUserOperation, signer: ethers5.Signer): Promise<Estimation>;
      
    public abstract send(userOperation: IUserOperation, signer: ethers5.Signer) : Promise<TransactionResponse>;
    
    public abstract getFeeData(signer: ethers5.Signer): Promise<ethers5.providers.FeeData>;
    
    public static formatUserOp(userOperation: IUserOperation): IUserOperation {
        userOperation.callGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.callGasLimit))
        userOperation.verificationGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.verificationGasLimit))
        userOperation.preVerificationGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.preVerificationGas))
        userOperation.maxFeePerGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.maxFeePerGas))
        userOperation.maxPriorityFeePerGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.maxPriorityFeePerGas))
        return userOperation
    }

    public getRPC(signer: ethers5.Signer): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve("getRPC not implemented on provider")
        })
    }


}