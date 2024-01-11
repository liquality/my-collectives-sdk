import { Estimation, IUserOperation, TransactionResponse } from "../../types";
import * as ethers5 from "ethers5";



// interface for all AA providers
export interface IAAProvider {
    estimate(userOperation: IUserOperation, signer: ethers5.Signer): Promise<Estimation>;

    sponsor(userOperation: IUserOperation, signer: ethers5.Signer): Promise<Estimation>;

    send(userOperation: IUserOperation, signer: ethers5.Signer): Promise<TransactionResponse>;

    getFeeData(signer: ethers5.Signer): Promise<ethers5.providers.FeeData>;

    getRPC(signer: ethers5.Signer): Promise<string>;
}