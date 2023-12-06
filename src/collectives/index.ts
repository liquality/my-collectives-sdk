import {CollectiveFactory__factory} from "../types/typechain-types/factories/contracts/fatories/CollectiveFatory.sol/CollectiveFactory__factory"
import {Collective__factory} from "../types/typechain-types/factories/contracts/core/Collective__factory"
import {COLLECTIVE_FACTORY_ADDRESS} from "../libs/constants"
import {createPoolsParam} from "../types/types"
import { ethers } from "ethers";
import {Config} from "../config"
import { Transaction } from "@biconomy/core-types"
import {buildUserOperation, sendWithPimlico} from "../libs/userOp"

// Create the collective module of the sdk
export class Collective {
    public async createCollective(caller: ethers.BrowserProvider, poolParam: createPoolsParam) {
        const signer = await caller.getSigner();
    
        // Get collective factory
        const cFactory = await this.getCFactory();
        const initiator = await signer.getAddress();
        const operator = ethers.Wallet.fromPhrase(Config.OPERATOR_MNEMONIC).address;
    
        // create collective params
        const salt = ethers.randomBytes(32);
    
        // Get collective & wallet create2 address
        const cAddress = await cFactory.getCollective(initiator, operator, ethers.toBigInt(salt));
        const cWallet = await cFactory.getCWallet(cAddress, operator, ethers.toBigInt(salt));
    
        // get collective && wallet init code
        const collectiveInitCode =  cFactory.interface.encodeFunctionData("createCollective", [initiator, operator, ethers.toBigInt(salt)]);
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
    
        // Generate a 192-bit (24-byte) random buffer to serve as nonce sequence number
        const nonceKey = ethers.toBeHex(ethers.randomBytes(24).toString());
    
        const userOperation = await buildUserOperation(signer, cWallet, nonceKey, collectiveInitCode, userOpTx)
        const tx = await sendWithPimlico(userOperation)
    
        return {collectiveAddress: cAddress, collectiveWalletAddress: cWallet, nonce:nonceKey, tx:tx, };
    
    }
    private async getCreatePoolsCallData(poolParam: createPoolsParam) {
        const createPoolCallData = Collective__factory.createInterface().encodeFunctionData("createPools", [poolParam.tokenContracts, poolParam.honeyPots]);
        return createPoolCallData;
    }
    private async getCFactory() {
        const cFactory = CollectiveFactory__factory.connect(COLLECTIVE_FACTORY_ADDRESS)
        return cFactory;
    }
}

