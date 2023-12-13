import {CollectiveFactory__factory} from "../types/typechain-types/factories/contracts/fatories/CollectiveFatory.sol/CollectiveFactory__factory"
import {Collective__factory} from "../types/typechain-types/factories/contracts/core/Collective__factory"
import {COLLECTIVE_FACTORY_ADDRESS} from "../libs/constants"
import {createPoolsParam} from "../types/types"
import { ethers } from "ethers";
import {AppConfig} from "../config"
import { Transaction } from "@biconomy/core-types"
import {buildUserOperation, sendWithBiconomy, sendWithPimlico} from "../libs/userOp"
import {generateUint192NonceKey} from "../libs/utils"

// Create the collective module of the sdk
export class Collectives {
    public static async createCollective(caller: ethers.BrowserProvider, poolParam: createPoolsParam, salt : ethers.BigNumberish) {
        try {
            const signer = await caller.getSigner();
    
            // Get collective factory
            const cFactory = await this.getCFactory(signer);
            const initiator = await signer.getAddress();
            const operator = ethers.Wallet.fromPhrase(AppConfig.OPERATOR_MNEMONIC).address;


            // Get collective & wallet create2 address
            const cAddress = await cFactory.getCollective(initiator, operator, ethers.toBigInt(salt));
            const cWallet = await cFactory.getCWallet(cAddress, operator, ethers.toBigInt(salt));
            
            // get collective && wallet init code
            const initCode =  cFactory.interface.encodeFunctionData("createCollective", [initiator, operator, ethers.toBigInt(salt)]);
            console.log("initCode >>>> ", initCode)
            // Append cFactory address to collective init code
            // Convert the address to a byte array (Buffer)
            const factoryAddressBuffer = Buffer.from(ethers.toBeArray(COLLECTIVE_FACTORY_ADDRESS));
            // Convert the call data to a byte array (Buffer)
            const initCodeBuffer = Buffer.from(ethers.toBeArray(initCode));
            // Concatenate the two buffers
            const initCodeCat = Buffer.concat([factoryAddressBuffer, initCodeBuffer]);
            // If you need the result as a hex string
            const collectiveInitCode = '0x' + initCodeCat.toString('hex');
            
            // get createPool call data
            const createPoolsCallData = await this.getCreatePoolsCallData(poolParam);
            // Create user operation Tx
            let userOpTx:Transaction[] = [
                {
                    to: cAddress,
                    data: createPoolsCallData,
                    value: 0,
                }
            ]
        
            const nonceKey =  generateUint192NonceKey();
        
        
            const userOperation = await buildUserOperation(signer, cWallet, nonceKey, collectiveInitCode, userOpTx)
            // console.log("built userOperation >>>> ", userOperation)
            // const tx = await sendWithBiconomy(userOperation!)
            // console.log("tx receipt >>>> ", tx.userOperationReceipt, " tx hash: ", tx.transactionHash, " state ?>> ", tx.state)
        
            return  {cAddress, cWallet, nonce:nonceKey};// {cAddress, cWallet, nonce:nonceKey, tx};
        } catch (error) {
            console.log("error createCollective >>>> ", error)
            throw error;
            
        }
    
    }
    private static async getCreatePoolsCallData(poolParam: createPoolsParam) {
        const createPoolCallData = Collective__factory.createInterface().encodeFunctionData("createPools", [poolParam.tokenContracts, poolParam.honeyPots]);
        return createPoolCallData;
    }
    private static async getCFactory(runner : ethers.JsonRpcSigner) {
        const cFactory = new ethers.Contract(COLLECTIVE_FACTORY_ADDRESS, CollectiveFactory__factory.createInterface(), runner)
        return cFactory;
    }
}

