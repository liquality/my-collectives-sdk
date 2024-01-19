import {CollectiveFactory__factory} from "../types/typechain-types/factories/contracts/fatories/CollectiveFatory.sol/CollectiveFactory__factory"
import {Collective__factory} from "../types/typechain-types/factories/contracts/core/Collective__factory"
import {ADDRESSES, OPERATOR} from "../libs/constants"
import {createPoolsParam, CMetadata, JoinCollectiveParam, SupportedChains} from "../types/types"
import { ethers } from "ethers";
import {AppConfig} from "../config"
import { Transaction } from "@biconomy/core-types"
import {buildAndSendUserOperation} from "../libs/userOp"
import {generateUint192NonceKey, requireSupportedChain} from "../libs/utils"
import * as ethers5 from 'ethers5';
import { CWallet__factory } from "../types/typechain-types";

// Create the collective module of the sdk
export class Collective {
    public static async create(caller: ethers5.providers.Web3Provider, poolParam: createPoolsParam, salt : ethers.BigNumberish) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);

            const signer = caller.getSigner();
    
            // Get collective factory
            const cFactory = await this.getCFactory(signer);
            const initiator = await signer.getAddress();

            // Get collective & wallet create2 address
            const cAddress = await cFactory.getCollective(initiator, OPERATOR, ethers.toBigInt(salt));
            const cWallet = await cFactory.getCWallet(cAddress, OPERATOR, ethers.toBigInt(salt));
            console.log("cAddress >>>> ", cAddress, " cWallet >>>> ", cWallet)

           console.log("network >> ",  await caller.getNetwork())

            // Check if collective has already beeen deployed
            const code = await caller.getCode(cAddress);
            if (code !== "0x") {
                return {cAddress, cWallet, nonce:null, tx: null};
            }

            
            // get collective && wallet init code
            const initCode =  cFactory.interface.encodeFunctionData("createWallet", [initiator, OPERATOR,  ethers.toBigInt(salt)]);

            // Append cFactory address to collective init code
            // Convert the address to a byte array (Buffer)
            const factoryAddressBuffer = Buffer.from(ethers.toBeArray(cFactory.address));
            // Convert the call data to a byte array (Buffer)
            const initCodeBuffer = Buffer.from(ethers.toBeArray(initCode));
            // Concatenate the two buffers
            const initCodeCat = Buffer.concat([factoryAddressBuffer, initCodeBuffer]);
            // If you need the result as a hex string
            const collectiveInitCode = '0x' + initCodeCat.toString('hex');
        
            const nonceKey =  generateUint192NonceKey();
        
        
            const tx = await buildAndSendUserOperation(signer, cWallet, nonceKey, collectiveInitCode, [])
            console.log("Collective Wallet Created >>>> ", tx)
            var tx2

            if (tx.status == "success") {
                console.log("Deploying collective >>>> ")
                tx2 = await this.createColletive(signer, cFactory, nonceKey, cAddress, cWallet, poolParam, salt);
            }

            return {cAddress, cWallet, nonce:nonceKey, tx2}; 
        } catch (error) {
            console.log("error createWallet >>>> ", error)
            throw error;
            
        }
    
    }

    // Check if member of collective
    public static async isMember(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, member: string) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
            const signer = caller.getSigner();
            const collective = new ethers5.Contract(cMetadata.address, Collective__factory.abi, AppConfig.getProvider());
            const isMember = await collective.members(member);
            console.log("isMember >>>> ", isMember)
            return {isMember}; 
        } catch (error) {
            console.log("error isMember >>>> ", error)
            throw error;
            
        }
    }

    // Refund Deposit
    public static async refund(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, recipient: string) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
            const signer = caller.getSigner();
            const refundCallData = await this.getRefundCallData(recipient);
            // Create user operation Tx
            let userOpTx:Transaction[] = [
                {
                    to: ethers5.utils.getAddress(cMetadata.wallet),
                    data: refundCallData,
                    value: 0,
                }
            ]
        
            const tx = await buildAndSendUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)

            return tx; 
        } catch (error) {
            console.log("error refund >>>> ", error)
            throw error;
            
        }
    }

    // join a collective
    public static async join(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, JoinParam:JoinCollectiveParam) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
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
        
            const tx = await buildAndSendUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)

            return tx; 
        } catch (error) {
            console.log("error joinCollectives >>>> ", error)
            throw error;
            
        }
    }

    // leave a collective
    public static async leave(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
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
        
            const tx = await buildAndSendUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)

            return tx; 
        } catch (error) {
            console.log("error leaveCollectives >>>> ", error)
            throw error;
            
        }
    }

    // removeMember from collective
    public static async removeMember(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, member: string) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
            const signer = caller.getSigner();
            const removeMemberCallData = this.getRemoveMemberCallData();
            // Create user operation Tx
            let userOpTx:Transaction[] = [
                {
                    to: ethers5.utils.getAddress(cMetadata.address),
                    data: removeMemberCallData,
                    value: 0,
                }
            ]
        
            const tx = await buildAndSendUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)

            return tx; 
        } catch (error) {
            console.log("error removeMember >>>> ", error)
            throw error;
            
        }
    }

    // create a pool
    public static async createPools(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, poolParam: createPoolsParam) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
            const signer = caller.getSigner();
            const createPoolsCallData = await this.getCreatePoolsCallData(cMetadata.address, poolParam);
            // Create user operation Tx
            let userOpTx:Transaction[] = [
                {
                    to: ethers5.utils.getAddress(cMetadata.address),
                    data: createPoolsCallData,
                    value: 0,
                }
            ]
        
            const tx = await buildAndSendUserOperation(signer, cMetadata.wallet, cMetadata.nonceKey, "", userOpTx)
            return tx; 

        } catch (error) {
            console.log("error createPools >>>> ", error)
            throw error;
            
        }
    }

    // Get pool
    public static async getPoolByHoneyPot(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, honeyPot: string) {
        try {
            requireSupportedChain((await caller.getNetwork()).chainId);
            const signer = caller.getSigner();
            const collective = new ethers5.Contract(cMetadata.address, Collective__factory.abi, AppConfig.PROVIDER);
            const pools = await collective.pools(honeyPot);
            console.log("pools >>>> ", pools)
            return pools["id"]; 
        } catch (error) {
            console.log("error getPools >>>> ", error)
            throw error;
            
        }
    }

    // getCreatCollectiveCallData
    private static async getCreateCollectiveCallData(initiator: string, operator: string, salt: ethers.BigNumberish) {
        const createCollectiveCallData = CollectiveFactory__factory.createInterface().encodeFunctionData("createCollective", [initiator, operator, ethers.toBigInt(salt)]);
        return createCollectiveCallData;
    }
    
    private static async getCreatePoolsCallData(cAddress: string, poolParam: createPoolsParam) {
        const createPoolCallData = new ethers.Interface(Collective__factory.abi).encodeFunctionData("createPools", [poolParam.tokenContracts, poolParam.honeyPots])
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

    private static async getCFactory(signer : ethers5.ethers.providers.JsonRpcSigner) {
        const collectiveFactory = ADDRESSES[(await signer.getChainId()) as SupportedChains].collectiveFactory;
        const cFactory = new ethers5.Contract(collectiveFactory, CollectiveFactory__factory.abi, signer)
        return cFactory;
    }

    private static getRemoveMemberCallData() {
        const removeMemberCallData = new ethers.Interface(Collective__factory.abi).encodeFunctionData("removeMember");
        return removeMemberCallData;
    }

    //getRefundCallData
    private static async getRefundCallData(recipient: string) {
        const refundCallData = new ethers.Interface(CWallet__factory.abi).encodeFunctionData("refundBalance", [recipient])
        return refundCallData;
    }
    
    private static async createColletive(signer: ethers5.providers.JsonRpcSigner, cFactory: ethers5.ethers.Contract, nonceKey: bigint, cAddress: string, cWallet: string, poolParam: createPoolsParam, salt : ethers.BigNumberish) {
        try {
            const initiator = await signer.getAddress();

            //get createCollective call data
            const createCollectiveCallData = await this.getCreateCollectiveCallData(initiator, OPERATOR, ethers.toBigInt(salt));
            const createPoolsCallData = await this.getCreatePoolsCallData(cAddress, poolParam);

            // Create user operation Tx
            let userOpTx:Transaction[] = [
                {
                    to: cFactory.address,
                    data: createCollectiveCallData,
                    value: 0,
                },
                {
                    to: ethers5.utils.getAddress(cAddress),
                    data: createPoolsCallData,
                    value: 0,
                }
            ]
        
            const tx = await buildAndSendUserOperation(signer, cWallet, nonceKey, "", userOpTx)

            return tx;
        } catch (error) {
            console.log("error createCollective >>>> ", error)
            throw error;
            
        }
    
    }
}

