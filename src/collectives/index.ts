import {CollectiveFactory__factory} from "../types/typechain-types/factories/contracts/fatories/CollectiveFatory.sol/CollectiveFactory__factory"
import {Collective__factory} from "../types/typechain-types/factories/contracts/core/Collective__factory"
import {COLLECTIVE_FACTORY_ADDRESS} from "../libs/constants"
import {createPoolsParam, CMetadata, JoinCollectiveParam} from "../types/types"
import { ethers } from "ethers";
import {AppConfig} from "../config"
import { Transaction } from "@biconomy/core-types"
import {buildUserOperation} from "../libs/userOp"
import {generateUint192NonceKey} from "../libs/utils"
import * as ethers5 from 'ethers5';
import * as biconomyBundler from "../libs/bundlers/biconomy"
import * as pimlicoBundler from "../libs/bundlers/pimlico"
import { sign } from "crypto";

// Create the collective module of the sdk
export class Collective {
    public static async create(caller: ethers5.providers.Web3Provider, poolParam: createPoolsParam, salt : ethers.BigNumberish) {
        try {
            const signer = caller.getSigner();
    
            // Get collective factory
            const cFactory = await this.getCFactory(signer);
            const initiator = await signer.getAddress();
            const operator = ethers.Wallet.fromPhrase(AppConfig.OPERATOR_MNEMONIC).address;

            // Get collective & wallet create2 address
            const cAddress = await cFactory.getCollective(initiator, operator, ethers.toBigInt(salt));
            const cWallet = await cFactory.getCWallet(cAddress, operator, ethers.toBigInt(salt));
            console.log("cAddress >>>> ", cAddress, " cWallet >>>> ", cWallet)

            // Check if collective has already beeen deployed
            const code = await caller.getCode(cAddress);
            if (code !== "0x") {
                return {cAddress, cWallet, nonce:null, tx: null};
            }

            
            // get collective && wallet init code
            const initCode =  cFactory.interface.encodeFunctionData("createCollective", [initiator, operator, ethers.toBigInt(salt)]);

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
            const createPoolsCallData = await this.getCreatePoolsCallData(cAddress, poolParam);
            // Create user operation Tx
            let userOpTx:Transaction[] = [
                {
                    to: ethers5.utils.getAddress(cAddress),
                    data: createPoolsCallData,
                    value: 0,
                }
            ]
        
            const nonceKey =  generateUint192NonceKey();
        
        
            const userOperation = await buildUserOperation(signer, cWallet, nonceKey, collectiveInitCode, userOpTx)
            console.log("built userOperation >>>> ", userOperation)
            const tx = await pimlicoBundler.send(userOperation, signer)

            return {cAddress, cWallet, nonce:nonceKey, tx}; 
        } catch (error) {
            console.log("error createCollective >>>> ", error)
            throw error;
            
        }
    
    }

    // Check if member of collective
    public static async isMember(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, member: string) {
        try {
            const signer = caller.getSigner();
            const collective = Collective__factory.connect(cMetadata.address, AppConfig.getProvider());
            const isMember = await collective.members(member);
            console.log("isMember >>>> ", isMember)
            return {isMember}; 
        } catch (error) {
            console.log("error isMember >>>> ", error)
            throw error;
            
        }
    }

    // leave a collective
    public static async leave(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata) {
        try {
            const signer = caller.getSigner();
            const leaveCollectiveCallData = await this.getLeaveCollectiveCallData();
            console.log("leaveCollectiveCallData >>>> ", leaveCollectiveCallData)
            // Create user operation Tx
            let userOpTx:Transaction[] = [
                {
                    to: ethers5.utils.getAddress(cMetadata.address),
                    data: leaveCollectiveCallData,
                    value: 0,
                }
            ]
        
            const userOperation = await buildUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)
            console.log("built userOperation >>>> ", userOperation)
            const tx = await pimlicoBundler.send(userOperation, signer)
            console.log("tx >>>> ", tx)
            // console.log("tx receipt >>>> ", tx.userOperationReceipt, " tx hash: ", tx.transactionHash, " state ?>> ", tx.state)
            

            // const entryContract = new ethers5.Contract(ENTRYPOINT_ADDRESS, ENTRYPOINT_ABI, signer)
            // const tx = await entryContract.handleOps([userOperation], cMetadata.wallet)
            // console.log(" !! tx >>>> ", tx)

            return {tx}; 
        } catch (error) {
            console.log("error leaveCollectives >>>> ", error)
            throw error;
            
        }
    }

    // join a collective
    public static async join(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, JoinParam:JoinCollectiveParam) {
        try {
            const signer = caller.getSigner();
            const joinCollectivesCallData = await this.getJoinCollectiveCallData(cMetadata.address, JoinParam);
            console.log("joinCollectivesCallData >>>> ", joinCollectivesCallData)
            // Create user operation Tx
            let userOpTx:Transaction[] = [
                {
                    to: ethers5.utils.getAddress(cMetadata.address),
                    data: joinCollectivesCallData,
                    value: 0,
                }
            ]
        
            const userOperation = await buildUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)
            console.log("built userOperation >>>> ", userOperation)

            // Local interact with entrypoint
            // const entryContract = new ethers5.Contract(ENTRYPOINT_ADDRESS, ENTRYPOINT_ABI, signer)
            // const tx = await entryContract.handleOps([userOperation], cMetadata.wallet)
            // console.log(" !! tx >>>> ", tx)

            const tx = await pimlicoBundler.send(userOperation, signer)
            console.log("tx >>>> ", tx)
            
            // console.log("tx receipt >>>> ", tx.userOperationReceipt, " tx hash: ", tx.transactionHash, " state ?>> ", tx.state)
        
            return {tx}; 
        } catch (error) {
            console.log("error joinCollectives >>>> ", error)
            throw error;
            
        }
    }

    // create a pool
    public static async createPools(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, poolParam: createPoolsParam) {
        try {
            const signer = caller.getSigner();
            const createPoolsCallData = await this.getCreatePoolsCallData(cMetadata.address, poolParam);
            console.log("createPoolsCallData >>>> ", createPoolsCallData)
            // Create user operation Tx
            let userOpTx:Transaction[] = [
                {
                    to: ethers5.utils.getAddress(cMetadata.address),
                    data: createPoolsCallData,
                    value: 0,
                }
            ]
        
            const userOperation = await buildUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)
            console.log("built userOperation >>>> ", userOperation)

          const tx = await pimlicoBundler.send(userOperation, signer)
            // console.log("tx receipt >>>> ", tx.userOperationReceipt, " tx hash: ", tx.transactionHash, " state ?>> ", tx.state)
            console.log("tx >>>> ", tx)
            return {tx}; 
        } catch (error) {
            console.log("error createPools >>>> ", error)
            throw error;
            
        }
    }

    // Get pool
    public static async getPoolByHoneyPot(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, honeyPot: string) {
        try {
            const signer = caller.getSigner();
            const collective = Collective__factory.connect(cMetadata.address, AppConfig.getProvider());
            const pools = await collective.pools(honeyPot);
            console.log("pools >>>> ", pools)
            return {pools}; 
        } catch (error) {
            console.log("error getPools >>>> ", error)
            throw error;
            
        }
    }
    
    private static async getCreatePoolsCallData(cAddress: string, poolParam: createPoolsParam) {
        let createPoolsABI =  [
            {
              "inputs": [
                {
                  "internalType": "address[]",
                  "name": "_tokenContracts",
                  "type": "address[]"
                },
                {
                  "internalType": "address[]",
                  "name": "_honeyPots",
                  "type": "address[]"
                }
              ],
              "name": "createPools",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }]
    let CollectiveFactory = new ethers.Contract(cAddress, createPoolsABI, AppConfig.getProvider())
    let createPoolCallData = CollectiveFactory.interface.encodeFunctionData("createPools", [poolParam.tokenContracts, poolParam.honeyPots])

  
        // const createPoolCallData = Collective__factory.createInterface().encodeFunctionData("createPools", [poolParam.tokenContracts, poolParam.honeyPots]);
        return createPoolCallData;
    }
    private static async getJoinCollectiveCallData(cAddress: string, joinParam: JoinCollectiveParam) {
        const JoinCollectiveCallData = Collective__factory.createInterface().encodeFunctionData("joinCollective", [joinParam.inviteSignature, joinParam.inviteCode]);
        return JoinCollectiveCallData;
    }
    private static async getLeaveCollectiveCallData() {
        const leaveCollectiveCallData = Collective__factory.createInterface().encodeFunctionData("leaveCollective");
        return leaveCollectiveCallData;
    }
    private static async getCFactory(runner : ethers5.ethers.providers.JsonRpcSigner) {
        const cFactory = new ethers5.Contract(COLLECTIVE_FACTORY_ADDRESS, CollectiveFactory__factory.abi, runner)
        return cFactory;
    }
}

