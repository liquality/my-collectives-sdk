import {IUserOperation, PaymasterEstimation, TransactionResponse } from "../../types/types";
import * as ethers5 from "ethers5";



// interface for all AA providers
export interface IAAProvider {

    sponsor(userOperation: IUserOperation): Promise<PaymasterEstimation>;

    send(userOperation: IUserOperation): Promise<TransactionResponse>;

    getFeeData(signer: ethers5.Signer): Promise<ethers5.providers.FeeData>;

    getRPC(): Promise<string>;
}