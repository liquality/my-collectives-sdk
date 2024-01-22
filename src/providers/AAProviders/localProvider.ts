import * as ethers5 from 'ethers5'
import { ENTRYPOINT_ABI, ADDRESSES } from '../../libs/constants'
import { IUserOperation, SupportedChains, TransactionResponse } from '../../types/types'
import { BaseProvider } from './baseProvider'
import {  } from 'ethers'

export class LocalProvider extends BaseProvider {
    signer: ethers5.Signer

    constructor(signer: ethers5.Signer) {
        super()
        this.signer = signer
    }
    
    public async estimate(userOperation: IUserOperation): Promise<any> {
        try {
        const entryPoint = ADDRESSES[(await this.signer.getChainId()) as SupportedChains].entryPoint
        const entryPointContract = new ethers5.Contract(entryPoint, ENTRYPOINT_ABI, this.signer)
        const estimations = await entryPointContract.estimateGas.userOperationGasEstimation(userOperation)
        return estimations
        } catch (error) {
        console.log('LOCAL__estimate error >>>> ', error)
        throw error
        }
    }
    
    public async sponsor(userOperation: IUserOperation): Promise<any> {
        try {
        const entryPoint = ADDRESSES[(await this.signer.getChainId()) as SupportedChains].entryPoint
        const entryPointContract = new ethers5.Contract(entryPoint, ENTRYPOINT_ABI, this.signer)
        const estimations = await entryPointContract.estimateGas.sponsorUserOperation(userOperation)
        return estimations
        } catch (error) {
        console.log('LOCAL__sponsor error >>>> ', error)
        throw error
        }
    }
    
    public async send(userOperation: IUserOperation): Promise<TransactionResponse> {
        try {
        const entryPoint = ADDRESSES[(await this.signer.getChainId())as SupportedChains].entryPoint
        const entryPointContract = new ethers5.Contract(entryPoint, ENTRYPOINT_ABI, this.signer)
        const tx = await entryPointContract.handleUserOps(userOperation)
        tx.wait()
        return {
            txHash: tx.transactionHash,
            userOpHash: "",
            status: tx.confirmations > 1 ? 'success' : 'pending',
        }
        } catch (error) {
        console.log('LOCAL__send error >>>> ', error)
        throw error
        }
    }

    public async getFeeData(): Promise<any> {
        try {
        return await this.signer.getFeeData()
        } catch (error) {
        console.log('LOCAL__getFeeData error >>>> ', error)
        throw error
        }
    }

}